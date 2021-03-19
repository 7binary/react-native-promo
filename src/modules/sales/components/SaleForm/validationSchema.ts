import * as Yup from 'yup';

export default Yup.object().shape({
  number: Yup.string(),
  sold_on_local: Yup.string().matches(/\d\d\.\d\d\.\d\d\d\d/, 'неверный формат'),
});
