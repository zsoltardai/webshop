import * as yup from 'yup';


export const EMAIL = yup
.string()
.matches(
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  'Az e-mail címnek a következő formátúmnak kell lennie: user@email.com!',
)
.required(
  'Az e-mail cím mező kitöltése kötelező!'
);


export const PASSWORD = yup
.string()
.matches(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  'A jelszónak minimum 8 karakterből kell állnia, kis és nagy betűket, illetve legalább egy számot kell tartalmaznia!',
)
.required(
  'A jelszó mező kitöltése kötelező!'
);


export const CONFIRMATION = yup
.string()
.oneOf(
  [yup.ref('password')],
  'A ket jelszónak meg kell egyeznie egymással!',
)
.required(
  'A jelszó megerősítése mező kitöltése kötelező!',
);


export const FIRST_NAME = yup
.string()
.min(
  3,
  'A keresztnévnek minimum 3 karakter hosszúságúnak kell lennie!'
)
.required(
  'A keresztnév mező kitöltése kötelező!',
);

export const LAST_NAME = yup
.string()
.min(
  3,
  'A vezetéknévnek minimum 3 karakter hosszúságúnak kell lennie!'
)
.required(
  'A vezetéknév mező kitöltése kötelező!',
);