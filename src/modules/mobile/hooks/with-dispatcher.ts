import { Dispatch } from 'redux';
import { ticketsActions } from 'modules/tickets/store';
import { mobileActions } from 'modules/mobile/store';

export default function withDispatcher(dispatch: Dispatch<any>, data: any) {
  const { GetTickets } = data;

  if (GetTickets) {
    dispatch(ticketsActions.getTickets());
  }

  // в любом случае надо обновить уведомления ради счетчика в колокольчике
  dispatch(mobileActions.getNotifications());
}
