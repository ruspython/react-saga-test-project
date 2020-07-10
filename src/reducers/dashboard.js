import moment from 'moment';
import { parseError } from 'modules/client';

import { ActionTypes, STATUS } from 'constants/index';

export const defaultState = {
  temperature: null,
  airPressure: null,
  humidity: null,
  status: STATUS.IDLE,
  message: '',
  lastTemperatureUpdate: null,
  lastAirPressureUpdate: null,
  lastHumidityUpdate: null,
};

export default (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.LOAD_INITIAL_DATA: {
      return {
        ...defaultState,
        status: STATUS.RUNNING,
        message: '',
      };
    }
    case ActionTypes.LOAD_INITIAL_DATA_SUCCESS: {
      const now = new Date();

      return {
        temperature: payload.temperature,
        airPressure: payload.airPressure,
        humidity: payload.humidity,
        status: STATUS.SUCCESS,
        message: '',
        lastTemperatureUpdate: now,
        lastAirPressureUpdate: now,
        lastHumidityUpdate: now,
      };
    }
    case ActionTypes.LOAD_INITIAL_DATA_FAILURE: {
      return {
        status: STATUS.ERROR,
        message: parseError(payload.message),
      };
    }
    case ActionTypes.NEW_DATA_RECEIVED: {
      return {
        ...state,
        lastTemperatureUpdate: payload.data.temperature ? new Date() : state.lastTemperatureUpdate,
        lastAirPressureUpdate: payload.data.airPressure ? new Date() : state.lastAirPressureUpdate,
        lastHumidityUpdate: payload.data.humidity ? new Date() : state.lastHumidityUpdate,
        temperature: payload.data.temperature || state.temperature,
        airPressure: payload.data.airPressure || state.airPressure,
        humidity: payload.data.humidity || state.humidity,
      };
    }
    case ActionTypes.RESET_DASHBOARD_DATA: {
      let newState = null;
      const timestamp = moment();
      if (
        !state.lastTemperatureUpdate ||
        timestamp.diff(state.lastTemperatureUpdate, 'seconds') > 1
      ) {
        newState = { temperature: null };
      }
      if (
        !state.lastAirPressureUpdate ||
        timestamp.diff(state.lastAirPressureUpdate, 'seconds') > 1
      ) {
        newState = { airPressure: null };
      }
      if (
        !state.lastHumidityUpdate ||
        timestamp.diff(state.lastHumidityUpdate, 'seconds') > 1
      ) {
        newState = { humidity: null };
      }
      if (!newState) return state;

      return {
        ...state,
        ...newState,
      }
    }
    default:
      return state;
  }
};
