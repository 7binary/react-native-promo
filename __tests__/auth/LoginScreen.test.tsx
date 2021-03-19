import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import { store } from 'store';
import LoginScreen from 'modules/auth/screens/LoginScreen';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <LoginScreen/>
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
