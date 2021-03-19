import * as Yup from 'yup';

export default Yup.object().shape({
  login: Yup.string().required('необходимо заполнить'),
  password: Yup.string().required('необходимо заполнить'),
});
