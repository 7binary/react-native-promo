import * as Yup from 'yup';

export default Yup.object().shape({
  code: Yup.string().required('необходимо заполнить'),
});
