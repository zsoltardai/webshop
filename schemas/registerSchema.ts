import * as yup from 'yup';

import {EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, CONFIRMATION} from '@webshop/constants/validation';


export default yup.object({
  firstName: FIRST_NAME,
  lastName: LAST_NAME,
  email: EMAIL,
  password: PASSWORD,
  confirmation: CONFIRMATION,
});

