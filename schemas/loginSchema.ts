import * as yup from 'yup';

import {EMAIL, PASSWORD} from '@webshop/constants/validation';


export default yup.object({
  email: EMAIL,
  password: PASSWORD,
});

