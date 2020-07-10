import { expectSaga } from 'redux-saga-test-plan';

import { loadData } from 'sagas/dashboard';
import { ActionTypes } from 'constants/index';

jest.mock('modules/client', () => ({
  request: () => ({ items: [] }),
}));

describe('dashboard', () => {
  it('should load initial data', () =>
    expectSaga(loadData, { payload: { query: 'react' } })
      .put({
        type: ActionTypes.LOAD_INITIAL_DATA_SUCCESS,
        payload: {
          data: {},
        },
      })
      .run());
});
