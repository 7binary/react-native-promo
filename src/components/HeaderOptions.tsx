import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';

import { Settings, HeaderCenter, HeaderLeft, HeaderRight } from '@pmk-team/common';
import { useSelector, useActions } from 'store';
import { cartSelector } from 'modules/prizes/store';
import { unreadedSelector } from 'modules/mobile/store';

const HeaderOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Settings.config.header.backgroundColor,
    borderBottomWidth: Settings.config.border.width,
    borderBottomColor: Settings.config.border.color,
  },
  headerTitle: () => (
    <HeaderCenter logoImage={require('assets/images/logo-light.png')}/>
  ),
  headerLeft: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cart = useSelector(cartSelector);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const unreaded = useSelector(unreadedSelector);
    return (
      <HeaderLeft cartLength={cart.length} unreaded={unreaded}/>
    );
  },
  headerRight: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { userLogout, unsetUser } = useActions();
    const logout = () => {
      userLogout();
      unsetUser();
    };
    return (
      <HeaderRight onLogout={logout}/>
    );
  },
};

export default HeaderOptions;
