import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('необходимо заполнить'),
  phone_mobile_local: Yup.string().required('необходимо заполнить'),
  email: Yup.string().required('необходимо заполнить'),
  content: Yup.string().required('необходимо заполнить'),
});
