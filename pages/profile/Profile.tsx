import React from 'react';

import {ActivityIndicator, Link, Flex} from '@webshop/components';

import {useUser, useAuth} from '@webshop/hooks';

import colors from '@webshop/constants/colors';

import {IoPencil} from 'react-icons/io5';

import {Card, Text} from '@webshop/components';


const Profile: React.FC = () => {

  const {requireAuth, logout} = useAuth();

  requireAuth(true);

  const onClickEdit = (): void => {throw new Error('Not implemented onClickEdit()!')};

  const {user, loading} = useUser();

  if (loading) return <ActivityIndicator />;

  return (
    <>
      <Text uppercase marginBottom={12} marginLeft={6}>
        Profil
      </Text>

      <Card marginBottom={24}>
        <Flex justifyContent='space-between' alignItems='center'>
          <Flex flexDirection='column' gap={6}>
            <Text variant="h3">
              {user?.firstName} {user?.lastName}
            </Text>
            <Text variant='small' color={colors.primary}>
              {user?.email}
            </Text>
          </Flex>
          <IoPencil color={colors.primary} onClick={onClickEdit} />
        </Flex>
      </Card>

      <Text uppercase marginBottom={12} marginLeft={6}>
        Műveletek
      </Text>

      <Card marginBottom={24}>
        <Flex flexDirection='column' gap={12}>
          <Link title="Rendelések" href="/" />
          <Link title="Profil szerkeztése" href="/" />
          <Link title="Címek kezelése" href="/" />
          <Link title="Számlák" href="" />
        </Flex>
      </Card>

      <Text uppercase marginBottom={12} marginLeft={6}>
        Veszély szektor
      </Text>

      <Card>
        <Flex flexDirection='column' gap={12}>
          <Link title="Profile törlése" color={colors.error} href="/" />
          <Link title="Kijelentkezés" onClick={logout} />
        </Flex>
      </Card>
    </>
  );
};

export default Profile;
