import reducer, { defaultState } from 'reducers/dashboard';
import { ActionTypes, STATUS } from 'constants/index';

describe('dashboard', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it(`should handle ${ActionTypes.LOAD_INITIAL_DATA_SUCCESS}`, () => {
    const payload = {
      temperature: null,
      airPressure: 20,
      humidity: 30,
    };

    const action = {
      type: ActionTypes.LOAD_INITIAL_DATA_SUCCESS,
      payload,
    };
    const state = reducer(undefined, action);
    expect(state.humidity).toEqual(payload.humidity);
    expect(state.airPressure).toEqual(payload.airPressure);
    expect(state.temperature).toEqual(payload.temperature);
    expect(state.status).toEqual(STATUS.SUCCESS);

  });

  it(`should handle ${ActionTypes.NEW_DATA_RECEIVED}`, () => {
    const payload = {
      data: {
        humidity: 30,
      }
    };

    const action = {
      type: ActionTypes.NEW_DATA_RECEIVED,
      payload,
    };
    const state = reducer(undefined, action);
    expect(state.humidity).toEqual(payload.data.humidity);
  });



});
