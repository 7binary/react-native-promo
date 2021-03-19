import * as Yup from 'yup';

export default Yup.object().shape({
  delivery_email: Yup.string().required('необходимо заполнить').email('некорректный E-mail'),
  delivery_address: Yup.string(),
});
