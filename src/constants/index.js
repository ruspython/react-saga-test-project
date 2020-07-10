import { keyMirror } from 'modules/helpers';

/**
 * @namespace Constants
 * @desc App constants
 */

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes = keyMirror({
  SWITCH_MENU: undefined,
  EXCEPTION: undefined,
  LOAD_INITIAL_DATA: undefined,
  LOAD_INITIAL_DATA_SUCCESS: undefined,
  LOAD_INITIAL_DATA_FAILURE: undefined,
  CONNECT_WEBSOCKET_SUCCESS: undefined,
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
  LISTEN_SERVER: undefined,
  NEW_DATA_RECEIVED: undefined,
  RESET_DASHBOARD_DATA: undefined,
});

/**
 * @constant {Object} STATUS
 * @memberof Constants
 */
export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};
