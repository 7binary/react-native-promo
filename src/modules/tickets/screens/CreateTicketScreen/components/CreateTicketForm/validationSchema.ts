import * as Yup from 'yup';

export default Yup.object().shape({
  title: Yup.string().required('необходимо заполнить'),
  comment: Yup.string().required('необходимо заполнить'),
});
