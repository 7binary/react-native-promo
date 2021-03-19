import { NavigationProp } from '@react-navigation/core';

export default function withNavigator(navigation: NavigationProp<any>, data: any): Function {
  const { page, pageId, navigateRoute, navigateParams } = data;
  let goto: Function | null = null;

  if (page === 'dashboard') {
    goto = () => navigation.navigate('ProfileNav', {
      screen: 'DashboardNav',
      params: { screen: 'Dashboard' },
    });
  }
  if (page === 'balance') {
    goto = () => navigation.navigate('ProfileNav', {
      screen: 'DashboardNav',
      params: { screen: 'Balance' },
    });
  }
  if (page === 'prizes') {
    goto = () => navigation.navigate('PrizesNav', {
      screen: 'PrizesTabs',
      params: { screen: 'Prizes' },
    });
  }
  if (page === 'feedback') {
    goto = () => navigation.navigate('FeedbackNav', {
      screen: 'FeedbackTabs',
      params: { screen: 'Feedback' },
    });
  }
  if (page === 'ticket' && pageId) {
    goto = () => navigation.navigate('TicketsNav', {
      screen: 'Ticket',
      params: { ticketId: +pageId },
    });
  }
  if (page === 'tickets') {
    goto = () => navigation.navigate('TicketsNav', { screen: 'Tickets' });
  }
  if (page === 'action' && pageId) {
    goto = () => navigation.navigate('SalesNav', {
      screen: 'SalesTabs',
      params: {
        screen: 'Actions',
        params: { actionId: +pageId },
      },
    });
  }
  if (page === 'actions') {
    goto = () => navigation.navigate('SalesNav', {
      screen: 'SalesTabs',
      params: { screen: 'Actions' },
    });
  }
  if (page === 'sales' || page === 'sale') {
    goto = () => navigation.navigate('SalesNav', {
      screen: 'SalesTabs',
      params: { screen: 'Sales' },
    });
  }
  // это бэкдор: возможность с сервера задавать навигацию у пушика
  if (navigateRoute && navigateRoute.length > 0) {
    const params = navigateParams && navigateParams.length > 0
      ? JSON.parse(navigateParams)
      : undefined;
    goto = () => navigation.navigate(navigateRoute, params);
  }
  // все остальные пуши ведут на Уведомления (колокольчик)
  if (!goto) {
    goto = () => navigation.navigate('Notifications');
  }

  return goto;
}
