import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

import {Button, Card, ControlledInput, Flex, Text, Link} from '@webshop/components';

import useAuth from '@webshop/hooks/useAuth';

import {defaultLoginParams} from '@webshop/constants/defaultValues';

import {loginSchema} from '@webshop/schemas';

import type {LoginParams} from '@webshop/models/Auth';


const Login: React.FC = () => {

  const {replace} = useRouter();

  const {login, loading} = useAuth();

  const form = useForm<LoginParams>({
    defaultValues: defaultLoginParams,
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const {control, getValues, handleSubmit} = form;

  const onSubmit: VoidFunction = async (): Promise<void> => {
    const {email, password} = getValues();

    const success = await login({email, password});

    if (!success) return;

    replace('products');
  };

  return (
    <Flex flexDirection="column" alignItems="center">

      <Head>
        <title>Webshop - Bejelentkezés</title>
      </Head>

      <Card width={400} maxWidth="90vw">
        <Text variant='h2'>Bejelentkezés</Text>
        
        <ControlledInput
          control={control}
          label='E-mail cím'
          placeholder='E-mail'
          type='email'
          name="email"
          required
        />

        <ControlledInput
          control={control}
          label='Jelszó'
          name="password"
          placeholder='Jelszó'
          type="password"
          required
        />

        <Button
          title='Bejelentkezés'
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          marginBottom={12}
        />

        <Text variant='small'>
          Nem rendelkezel még fiókkal? Regisztrálj <Link title='itt' href="/register" />.
        </Text>
      </Card>
    </Flex>
  );  
};

export default Login;
