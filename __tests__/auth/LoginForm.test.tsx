import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import LoginForm from 'modules/auth/screens/LoginScreen/components/LoginForm';
import { store } from 'store';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <LoginForm/>
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
