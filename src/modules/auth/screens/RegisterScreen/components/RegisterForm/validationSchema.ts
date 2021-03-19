import * as Yup from 'yup';

export default Yup.object().shape({
  first_name: Yup.string().required('необходимо заполнить'),
  last_name: Yup.string().required('необходимо заполнить'),
  middle_name: Yup.string().required('необходимо заполнить'),
  email: Yup.string().required('необходимо заполнить').email('неверный адрес'),
  birthday_on_local: Yup.string().required('необходимо заполнить'),
  password: Yup.string().required('необходимо заполнить').min(3, 'слишком короткий пароль'),
  passwordConfirm: Yup.string()
    .required('необходимо заполнить')
    .oneOf([Yup.ref('password'), null], 'пароль должен совпадать'),
  checkedRules: Yup.boolean().required('необходимо подтвердить').oneOf([true], 'необходимо подтвердить'),
  checkedPers: Yup.boolean().required('необходимо подтвердить').oneOf([true], 'необходимо подтвердить'),
});
