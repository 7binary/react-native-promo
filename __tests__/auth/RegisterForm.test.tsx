import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import RegisterForm from 'modules/auth/screens/RegisterScreen/components/RegisterForm';
import { store } from 'store';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <RegisterForm
        phone={'+79299004050'}
        token={'abc'}
        onSuccess={jest.fn()}
        profileInfo={{} as any}
        cityOptions={[]}
      />
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
