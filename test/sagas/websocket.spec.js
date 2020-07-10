import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { listen, createWebSocketConnection } from 'sagas/websocket';
import { ActionTypes } from 'constants/index';
import { createSocketChannel } from '../../src/sagas/websocket';

jest.mock('modules/client', () => ({
  request: () => ({ items: [] }),
}));

const socketObj = {
  send: () => {},
};

describe('listen', () => {
  it('listen for updates', () => {
    const channel = 'test';
    const gen = listen({ channel });

    expect(JSON.stringify(gen.next().value)).toEqual(
      JSON.stringify(call(createWebSocketConnection))
    );

    expect(JSON.stringify(gen.next(socketObj).value)).toEqual(
      JSON.stringify(call(createSocketChannel, socketObj, channel))
    );
    console.log(JSON.stringify(gen.next(socketObj)));

    expect(gen.next().done).toEqual(false);
  });
});
