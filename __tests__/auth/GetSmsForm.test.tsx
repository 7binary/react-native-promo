import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import GetSmsForm from 'modules/auth/components/GetSmsForm';

it('renders correctly', () => {
  const tree = renderer
    .create(<GetSmsForm onSuccess={jest.fn()} type={'sms_noprofile'}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
