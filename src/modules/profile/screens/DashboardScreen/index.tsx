import React from 'react';
import { InteractionManager, SafeAreaView, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { StatusBarDark, ListLink, LazyView, AppCarousel, Settings } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import { Banner } from 'modules/profile/store';
import SurveyPopup from 'modules/surveys/components/SurveyPopup';
import styles from './styles';

const DashboardScreen = () => {
  const { user, banners } = useSelector(state => state.profile);
  const {
    getBanners,
    getRules,
    getPassport,
    getProfile,
    getCatalogCards,
    getPaymentSettings,
    getNotifications,
    getNews,
    getTickets,
    getApiSettings,
    registerFirebaseDevice,
    registerMobileDevice,
  } = useActions();

  useFocusEffect(React.useCallback(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      getApiSettings();
      getProfile();
      getPassport();
      getBanners();
      getNews();
      getRules();
      getPaymentSettings();
      getCatalogCards();
      getTickets();
      getNotifications();
      registerMobileDevice();
      registerFirebaseDevice();
    });
    return () => task.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));

  return (
    <LazyView>
      <SafeAreaView>
        <StatusBarDark/>
        <ScrollView keyboardShouldPersistTaps="always">
          <SurveyPopup/>
          <AppCarousel data={banners.map((b: Banner) => ({
            illustration: b.mobile_banner_url ? b.mobile_banner_url : b.banner_url,
          }))}
          />
          <ListLink
            navigate="Profile"
            iconName="ios-person-circle-outline"
            title={user ? user.full_name : null}
          />
          <ListLink
            navigate="Balance"
            iconName="md-wallet-outline"
            title="Баланс"
            context={user ? user.balance : null}
            subtitle="баллов"
          />
          {/*<ListLink*/}
          {/*  navigate="PrizesNav"*/}
          {/*  iconName="ios-gift-outline"*/}
          {/*  title="Витрина призов"*/}
          {/*/>*/}
          {/*<ListLink*/}
          {/*  navigate="Passport"*/}
          {/*  iconName="ios-card-outline"*/}
          {/*  title="Налоговая анкета"*/}
          {/*/>*/}
          {/*<ListLink*/}
          {/*  navigate="SalesNav"*/}
          {/*  navigateOptions={{*/}
          {/*    screen: 'SalesTabs',*/}
          {/*    params: { screen: 'Actions' },*/}
          {/*  }}*/}
          {/*  iconName="ios-trophy-outline"*/}
          {/*  title="Акции"*/}
          {/*  context={actions.length > 0 ? actions.length : null}*/}
          {/*  subtitle={actions.length > 0 ? 'активны' : null}*/}
          {/*/>*/}
          {/*<ListLink*/}
          {/*  navigate="SalesNav"*/}
          {/*  navigateOptions={{*/}
          {/*    screen: 'SalesTabs',*/}
          {/*    params: { screen: 'Sales' },*/}
          {/*  }}*/}
          {/*  iconName="md-receipt-outline"*/}
          {/*  title="История продаж"*/}
          {/*  context={sales.length > 0 ? sales.length : null}*/}
          {/*  subtitle={sales.length > 0 ? 'всего' : null}*/}
          {/*/>*/}
          {/*<ListLink*/}
          {/*  navigate="Rules"*/}
          {/*  iconName="ios-information-circle-outline"*/}
          {/*  title="Правила акции"*/}
          {/*/>*/}
          {/*<ListLink*/}
          {/*  navigate="NewsInstructionsNav"*/}
          {/*  iconName="ios-newspaper-outline"*/}
          {/*  title="Новости"*/}
          {/*/>*/}
          {/*<ListLink*/}
          {/*  navigate="NewsInstructionsNav"*/}
          {/*  navigateOptions={{*/}
          {/*    screen: 'NewsInstructionsTabs',*/}
          {/*    params: { screen: 'Instructions' },*/}
          {/*  }}*/}
          {/*  iconName="ios-information-circle-outline"*/}
          {/*  title="Инструкции"*/}
          {/*/>*/}
          {/*<ListLink*/}
          {/*  navigate="CoursesNav"*/}
          {/*  iconName="ios-school-outline"*/}
          {/*  title="Обучающие материалы"*/}
          {/*/>*/}
        </ScrollView>
      </SafeAreaView>
    </LazyView>
  );
};

export default DashboardScreen;
