import { call, put } from 'redux-saga/effects';

import { listen, createWebSocketConnection, createSocketChannel } from 'sagas/websocket';

jest.mock('modules/client', () => ({
  request: () => ({ items: [] }),
}));

const socketObj = {
  send: () => {},
};

describe('listen', () => {
  it('starts listening for updates', () => {
    const channel = 'test';
    const gen = listen({ channel });

    expect(JSON.stringify(gen.next().value)).toEqual(
      JSON.stringify(call(createWebSocketConnection))
    );

    expect(JSON.stringify(gen.next(socketObj).value)).toEqual(
      JSON.stringify(call(createSocketChannel, socketObj, channel))
    );
  });
});
