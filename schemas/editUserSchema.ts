import * as yup from 'yup';

import type {User} from '@webshop/models';

import {EMAIL, FIRST_NAME, LAST_NAME} from '@webshop/constants/validation';


export default yup.object<User>({
  firstName: FIRST_NAME,
  lastName: LAST_NAME,
  email: EMAIL,
});
