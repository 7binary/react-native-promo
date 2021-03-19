import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Drawer, Avatar } from 'react-native-paper';
import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TicketsNavigator from 'modules/tickets/navigation/TicketsNavigator';
import DashboardNavigator from 'modules/profile/navigation/DashboardNavigator';
import PrizesNavigator from 'modules/prizes/navigation/PrizesNavigator';
import NewsInstructionsNavigator from 'modules/news/navigation/NewsInstructionsNavigator';
import SalesNavigator from 'modules/sales/navigation/SalesNavigator';
import CoursesNavigator from 'modules/courses/navigation/CoursesNavigator';
import useFcmSubscribe from 'modules/mobile/hooks/use-fcm-subscribe';
import { useActions, useSelector } from 'store';
import { userSelector } from 'modules/profile/store';
import { cartSelector } from 'modules/prizes/store';

const Drawing = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerUsername: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    fontSize: 24,
    color: '#666',
  },
  balance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  rubIcon: {
    backgroundColor: 'gold',
    color: '#000',
    borderWidth: 0.5,
    borderColor: '#888',
  },
  item: {},
  section: {},
});

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const { userLogout, unsetUser } = useActions();
  const user = useSelector(userSelector);
  const cart = useSelector(cartSelector);

  const logout = () => {
    userLogout();
    unsetUser();
  };
  const navigateBalance = () => navigation.navigate('DashboardNav', {
    screen: 'Balance',
  });
  const navigateProfile = () => navigation.navigate('DashboardNav', {
    screen: 'Profile',
  });

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.row} onPress={navigateProfile}>
          <Avatar.Icon size={40} icon="account"/>
          <Text style={styles.headerUsername}>{user?.full_name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="ios-log-out-outline" style={styles.logoutIcon}/>
        </TouchableOpacity>
      </View>

      <View style={styles.balance}>
        <TouchableOpacity onPress={navigateBalance} style={styles.row}>
          <Text style={styles.balanceAmount}>{user?.balance}</Text>
          <Avatar.Icon size={24} icon="currency-rub" style={styles.rubIcon}/>
        </TouchableOpacity>
      </View>

      <Drawer.Section style={styles.section}>
        {/*<Drawer.Item*/}
        {/*  style={styles.item}*/}
        {/*  icon="dns"*/}
        {/*  label="Акции"*/}
        {/*  onPress={() => navigation.navigate('SalesNav', {*/}
        {/*    screen: 'SalesTabs',*/}
        {/*    params: { screen: 'Actions' },*/}
        {/*  })}*/}
        {/*/>*/}
        {/*<Drawer.Item*/}
        {/*  style={styles.item}*/}
        {/*  icon="receipt"*/}
        {/*  label="История продаж"*/}
        {/*  onPress={() => navigation.navigate('SalesNav', {*/}
        {/*    screen: 'SalesTabs',*/}
        {/*    params: { screen: 'Sales' },*/}
        {/*  })}*/}
        {/*/>*/}
        <Drawer.Item
          style={styles.item}
          icon="home"
          label="Личный кабинет"
          onPress={() => navigation.navigate('DashboardNav', {
            screen: 'Dashboard',
          })}
        />
        <Drawer.Item
          style={styles.item}
          icon="wallet"
          label="Кошелек"
          onPress={navigateBalance}
        />
        <Drawer.Item
          style={styles.item}
          icon="card-account-details"
          label="Налоговая анкета"
          onPress={() => navigation.navigate('DashboardNav', {
            screen: 'Passport',
          })}
        />
      </Drawer.Section>

      <Drawer.Section title="Витрина призов" style={styles.section}>
        <Drawer.Item
          style={styles.item}
          icon="gift"
          label="Призы"
          onPress={() => navigation.navigate('PrizesNav', {
            screen: 'PrizesTabs',
            params: { screen: 'Prizes' },
          })}
        />
        <Drawer.Item
          style={styles.item}
          icon="file-table-box-multiple"
          label="Заказы"
          onPress={() => navigation.navigate('PrizesNav', {
            screen: 'PrizesTabs',
            params: { screen: 'Orders' },
          })}
        />
        {cart.positions.length > 0 ? (
          <Drawer.Item
            style={styles.item}
            icon="cart"
            label={`Корзина (${cart.positions.length})`}
            onPress={() => navigation.navigate('PrizesNav', {
              screen: 'PrizesTabs',
              params: { screen: 'Cart' },
            })}
          />
        ) : null}
      </Drawer.Section>

      <Drawer.Section title="Полезная информация" style={styles.section}>
        <Drawer.Item
          style={styles.item}
          icon="school"
          label="Обучение"
          onPress={() => navigation.navigate('CoursesNav')}
        />
        <Drawer.Item
          style={styles.item}
          icon="newspaper"
          label="Новости"
          onPress={() => navigation.navigate('NewsInstructionsNav', {
            screen: 'NewsInstructionsTabs',
            params: { screen: 'News' },
          })}
        />
        <Drawer.Item
          style={styles.item}
          icon="information"
          label="Инструкции"
          onPress={() => navigation.navigate('NewsInstructionsNav', {
            screen: 'NewsInstructionsTabs',
            params: { screen: 'Instructions' },
          })}
        />
        <Drawer.Item
          style={styles.item}
          icon="chat"
          label="Поддержка"
          onPress={() => props.navigation.navigate('TicketsNav')}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const ProfileDrawerNavigator = () => {
  useFcmSubscribe();
  return (
    <Drawing.Navigator
      initialRouteName="DashboardNav"
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
    >
      <Drawing.Screen name="TicketsNav" component={TicketsNavigator}/>
      <Drawing.Screen name="CoursesNav" component={CoursesNavigator}/>
      <Drawing.Screen name="NewsInstructionsNav" component={NewsInstructionsNavigator}/>
      <Drawing.Screen name="PrizesNav" component={PrizesNavigator}/>
      <Drawing.Screen name="SalesNav" component={SalesNavigator}/>
      <Drawing.Screen name="DashboardNav" component={DashboardNavigator}/>
    </Drawing.Navigator>
  );
};

export default ProfileDrawerNavigator;
