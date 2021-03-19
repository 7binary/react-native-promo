import * as Yup from 'yup';

export default Yup.object().shape({
  first_name: Yup.string().required('необходимо заполнить'),
  last_name: Yup.string().required('необходимо заполнить'),
  middle_name: Yup.string().required('необходимо заполнить'),
  email: Yup.string().required('необходимо заполнить').email('неверный адрес'),
});
