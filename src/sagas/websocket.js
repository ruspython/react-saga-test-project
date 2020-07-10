import { call, cancel, cancelled, fork, put, take, all, takeLatest, delay } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { ActionTypes } from 'constants/index';

const UPDATE_DELAY = 3000; // ms

export function createWebSocketConnection() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
      resolve(socket);
    };

    socket.onerror = (err) => {
      reject(err);
    }
  });
}

export function createSocketChannel(socket, channel) {
  return eventChannel(emit => {
    socket.onmessage = (event) => {
      emit(JSON.parse(event.data))
    };
    socket.onclose = () => {};

    const unsubscribe = () => {
      socket.onmessage = null;
    };

    return unsubscribe;
  });
}

export function* listen({ channel }) {
  const socket = yield call(createWebSocketConnection);
  socket.send('subscribe');
  // if (!socket) {
  //   yield put({
  //     type: 'ActionTypes.CONNECT_WEBSOCKET',
  //     error: 'Socket was not connected',
  //   });
  // }

  // yield put({
  //   type: 'ActionTypes.CONNECT_WEBSOCKET',
  //   payload: socket,
  // });

  const socketChannel = yield call(createSocketChannel, socket, channel);
  try {
    while (true) {
      const payload = yield take(socketChannel);
      yield put({
        type: ActionTypes.NEW_DATA_RECEIVED,
        payload,
      });
      yield delay(UPDATE_DELAY);
    }
  } finally {
    if (yield cancelled()) {
      socketChannel.close();
    }
  }
}

export function* watchData(action) {
  let listenTask = yield fork(listen, action);
  yield take('types.UNSUBSCRIBE_FROM_USER_NOTIFICATIONS');
  if (listenTask && listenTask.isRunning()) {
    yield cancel(listenTask);
  }
}


export default function* root() {
  yield all([takeLatest(ActionTypes.LISTEN_SERVER, watchData)]);
}
