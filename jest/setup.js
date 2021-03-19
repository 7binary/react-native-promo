// ADD TO .eslintrc.js  =>  'env': { 'jest/globals': true },
// ADD TO package.json  =>  "jest": { "preset": "react-native", "setupFiles": ["./jest/setup.js"] }

import mockGh
  from '../node_modules/react-native-gesture-handler/src/__mocks__/RNGestureHandlerModule';
import mockAs from '../node_modules/@react-native-community/async-storage/jest/async-storage-mock';

// MOCK Async Storage
jest.mock('@react-native-community/async-storage', () => mockAs);


// MOCK Device Info
jest.mock('react-native-device-info', () => {
  return {
    getModel: jest.fn(),
    getVersion: jest.fn(),
    getManufacturer: jest.fn(),
    getSystemVersion: jest.fn(),
    getDeviceId: jest.fn(),
  };
});


// MOCK Navigation
const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useFocusEffect: jest.fn(),
  };
});
jest.mock('react-native-gesture-handler', () => mockGh);
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {
  };
  return Reanimated;
});
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');


// MOCK Firebase
// eslint-disable no-undef
jest.mock('react-native-firebase', () => ({
  messaging: jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
  })),
  notifications: jest.fn(() => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
  })),
  analytics: jest.fn(() => ({
    logEvent: jest.fn(),
  })),
}));


// MOCK Redux Persist
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
  };
});


// MOCK Screens
jest.mock('react-native-screens', () => {
  return {
    enableScreens: jest.fn(),
  };
});


// MOCK Fetch Blob
jest.mock('rn-fetch-blob', () => {
  return () => ({
    fs: jest.fn(),
    config: jest.fn(),
    DocumentDir: jest.fn(),
  });
});


// MOCK Image Picker
jest.mock('react-native-image-picker', () => {
  return {
    showImagePicker: jest.fn(),
    launchCamera: jest.fn(),
    launchImageLibrary: jest.fn(),
  };
});


// MOCK Picker
jest.mock('@react-native-community/picker', () => {
  const React = require('React');
  const RealComponent = jest.requireActual('@react-native-community/picker');

  class Picker extends React.Component {
    static Item = (props) => {
      return React.createElement('Item', props, props.children);
    };

    render() {
      return React.createElement('Picker', this.props, this.props.children);
    }
  }

  Picker.propTypes = RealComponent.propTypes;
  return {
    Picker,
  };
});
