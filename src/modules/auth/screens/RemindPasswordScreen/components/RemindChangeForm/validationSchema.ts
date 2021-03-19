import * as Yup from 'yup';

export default Yup.object().shape({
  password: Yup.string().required('необходимо заполнить').min(3, 'слишком короткий пароль'),
  passwordConfirm: Yup.string()
    .required('необходимо заполнить')
    .oneOf([Yup.ref('password'), null], 'пароль должен совпадать'),
});
