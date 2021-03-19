import * as Yup from 'yup';

export default Yup.object().shape({
  phone: Yup.string().required('необходимо заполнить'),
});
