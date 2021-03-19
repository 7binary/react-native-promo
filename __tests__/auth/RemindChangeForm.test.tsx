import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import { store } from 'store';
import RemindChangeForm
  from 'modules/auth/screens/RemindPasswordScreen/components/RemindChangeForm';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <RemindChangeForm phone={'+79299004050'} token={'abc'} onSuccess={jest.fn()}/>
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
