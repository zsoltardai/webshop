import React from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

import {Button, Card, ControlledInput, Text} from '@webshop/components';

import useAuth from '@webshop/hooks/useAuth';

import {defaultLoginParams} from '@webshop/constants/defaultValues';

import {loginSchema} from '@webshop/schemas';

import type {LoginParams} from '@webshop/models/Auth';

import styles from '@webshop/styles/Login.module.css';


const Login: React.FC = () => {

  const {login, loading, requireAuth} = useAuth();

  requireAuth(false);

  const form = useForm<LoginParams>({
    defaultValues: defaultLoginParams,
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const {control, getValues, handleSubmit} = form;

  const onSubmit: VoidFunction = async () => {
    const {email, password} = getValues();
    await login({email, password});
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
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
        />
      </Card>
    </div>
  );  
};

export default Login;
