import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';

const LoginHeader = () => (
  <View style={styles.container}>
    <FastImage
      source={require('assets/images/logo.png')}
      style={styles.logo}
      resizeMode={FastImage.resizeMode.contain}
    />
  </View>
);

export default LoginHeader;
