import React from 'react';
import {useRouter} from 'next/router';

import {Button, Card, ControlledInput, Flex, Link, Text} from '@webshop/components';

import {useAuth} from '@webshop/hooks';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import type {RegisterParams} from '@webshop/models/Auth';

import {registerSchema} from '@webshop/schemas';

import {defaultRegisterParams} from '@webshop/constants/defaultValues';


const Register: React.FC = () => {

  const {push} = useRouter();

  const {register} = useAuth();

  const form = useForm<RegisterParams>({
    resolver: yupResolver(registerSchema),
    defaultValues: defaultRegisterParams,
    mode: 'onBlur',
  });

  const {control, handleSubmit, getValues} = form;

  const onSubmit = async (): Promise<void> => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmation,
    } = getValues();
    
    const success = await register({
      firstName,
      lastName,
      email,
      password,
      confirmation,
    });

    if (!success) return;

    push('/login');
  };

  return (
    <Flex flexDirection="column" alignItems='center'>
      <Card width={400} maxWidth="90vw">
        <Text variant="h2">Regisztáció</Text>

        <ControlledInput
          label='Keresztnév'
          control={control}
          name='firstName'
          required
          placeholder='Keresztnév'
          type='name'
        />

        <ControlledInput
          label='Vezetéknév'
          control={control}
          name='lastName'
          required
          placeholder='Vezetéknév'
          type='name'
        />

        <ControlledInput
          label='E-mail cím'
          control={control}
          name='email'
          required
          placeholder='E-mail cím'
          type='email'
        />

        <ControlledInput 
          label='Jelszó'
          control={control}
          name='password'
          required
          placeholder='Jelszó'
          type='password'
        />

        <ControlledInput
          label='Jelszó megerősítése'
          control={control}
          name='confirmation'
          required
          placeholder='Jelszó megerősítése'
          type='password'
        />

        <Button
          title='Regisztráció'
          onClick={handleSubmit(onSubmit)}
          marginBottom={12}
        />


        <Text variant='small'>
          Rendelkezel már fiókkal? Jelentkezz be <Link title='itt' href="/login" />.
        </Text>
      </Card>
    </Flex>
  );
};

export default Register;
