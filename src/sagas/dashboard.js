import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';

export function* loadData({ payload }) {
  try {
    yield put({
      type: ActionTypes.LOAD_INITIAL_DATA_SUCCESS,
      payload: { data: {} },
    });

  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.LOAD_INITIAL_DATA_FAILURE,
      payload: err,
    });
  }
}


export default function* root() {
  yield all([takeLatest(ActionTypes.LOAD_INITIAL_DATA, loadData)]);
}
