import * as Yup from 'yup';

export const fieldValidator = Yup.string();
export const emailValidator = Yup.string().email('Неправильный формат');
export const passwordValidator = Yup.string().min(
  4,
  'Минимальная длина пароля 4 символа'
);

// Required
const requiredMessage = 'Обязательное поле';
export const fieldRequiredValidator = fieldValidator.required(requiredMessage);
export const emailRequiredValidator = emailValidator.required(requiredMessage);
export const passwordRequiredValidator =
  passwordValidator.required(requiredMessage);

export const passwordConfirmationRequiredValidator = (ref: string) =>
  fieldRequiredValidator.oneOf([Yup.ref(ref), null], 'Пароль не совпадает');
