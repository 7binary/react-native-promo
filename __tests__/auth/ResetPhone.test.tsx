import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ResetPhone from 'modules/auth/components/ResetPhone';

it('renders correctly', () => {
  const tree = renderer
    .create(<ResetPhone phone={'+79299004050'} onReset={jest.fn()}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
