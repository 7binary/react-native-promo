import * as Yup from 'yup';

export default Yup.object().shape({
  first_name: Yup.string().required('необходимо заполнить'),
  last_name: Yup.string().required('необходимо заполнить'),
  middle_name: Yup.string().required('необходимо заполнить'),
  birthday_on_local: Yup.string().required('необходимо заполнить')
    .matches(/\d\d\.\d\d\.\d\d\d\d/, 'неверный формат'),
  document_series_and_number: Yup.string().required('необходимо заполнить')
    .matches(/\d\d\d\d \d\d\d\d\d\d/, 'неверный формат'),
  address: Yup.string().required('необходимо заполнить'),
  inn: Yup.string().matches(/\d\d\d\d\d\d\d\d\d\d\d\d/, 'неверный формат'),
});
