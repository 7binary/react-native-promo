import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CheckSmsForm from 'modules/auth/components/CheckSmsForm';

it('renders correctly', () => {
  const tree = renderer
    .create(<CheckSmsForm onSuccess={jest.fn()} phone={'+79299004050'} type={'sms_noprofile'}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
