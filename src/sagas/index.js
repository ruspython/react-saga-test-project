import { all, fork } from 'redux-saga/effects';

import dashboard from './dashboard';
import websocket from './websocket';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(dashboard),
    fork(websocket),
  ]);
}
