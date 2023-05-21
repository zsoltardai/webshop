import React, {useEffect} from 'react';
import {useRouter} from 'next/router';

import {Flex, Card, Text, ControlledInput, Button, ActivityIndicator} from '@webshop/components';

import {User} from '@webshop/models';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {defaultEditUser} from '@webshop/constants/defaultValues';

import {editUserSchema} from '@webshop/schemas';

import {useUser} from '@webshop/hooks';


type Props = {};

const Edit: React.FC<Props> = () => {

  const {replace} = useRouter();

  const {user, update, loading} = useUser();

  const form = useForm<User>({
    resolver: yupResolver(editUserSchema),
    defaultValues: defaultEditUser,
    mode: 'onBlur',
  });

  const {control, handleSubmit, setValue, getValues} = form;

  const onSubmit = async (): Promise<void> => {
    const {email, firstName, lastName} = getValues();

    const body: Partial<User> = {firstName, lastName};

    if (email !== user?.email) body['email'] = email;

    const success: boolean = await update(body);

    if (!success) return;

    replace('/profile');
  };

  useEffect(
    () => {
      if (!user) return;
    
      for (const key in user) {
        // @ts-ignore
        setValue(key, user[key])
      }
    },
    [
      user,
    ],
  );

  if (loading) return <ActivityIndicator />

  return (
    <Flex flexDirection='column' alignItems='center' marginTop={12}>
      <Card width={400} maxWidth="90vw">

        <Text variant="h2">
          Profil szerkesztése
        </Text>
        
        <ControlledInput
          label='Keresztnév'
          control={control}
          name="firstName"
          placeholder='Kersztnév'
        />

        <ControlledInput
          label='Vezetéknév'
          control={control}
          name="lastName"
          placeholder='Vezetéknév'
        />

        <ControlledInput
          label='E-mail cím'
          control={control}
          name="email"
          placeholder='E-mail cím'
        />

        <Button
          title="Módosít"
          onClick={handleSubmit(onSubmit)}
        />

      </Card>
    </Flex>
  );
};



export default Edit;
