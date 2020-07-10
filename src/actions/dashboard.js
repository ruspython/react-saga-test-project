// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { loadInitialData } = createActions({
  [ActionTypes.LOAD_INITIAL_DATA]: (query: string) => ({ query }),
});

export const { listenServer } = createActions({
  [ActionTypes.LISTEN_SERVER]: (query: string) => ({ query }),
});

export const { resetDashboardData } = createActions({
  [ActionTypes.RESET_DASHBOARD_DATA]: (query: string) => ({ query }),
});
