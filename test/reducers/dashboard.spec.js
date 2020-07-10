import reducer, { defaultState } from 'reducers/dashboard';
import { ActionTypes, STATUS } from 'constants/index';

describe('dashboard', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql(defaultState);
  });

  it(`should handle ${ActionTypes.LOAD_INITIAL_DATA_SUCCESS}`, () => {
    const payload = {
      temperature: null,
      airPressure: 20,
      humidity: 30,
    };
    expect(
      reducer(undefined, {
        type: ActionTypes.LOAD_INITIAL_DATA_SUCCESS,
        payload,
      }),
    ).to.eql({
      temperature: null,
      airPressure: payload.airPressure,
      humidity: payload.humidity,
      status: STATUS.SUCCESS,
      message: '',
    });
  });

  it(`should handle ${ActionTypes.NEW_DATA_RECEIVED}`, () => {
    const payload = {
      data: {
        humidity: 30,
      }
    };

    const action = {
      type: ActionTypes.LOAD_INITIAL_DATA_SUCCESS,
      payload,
    };
    const state = reducer(undefined, action);
    expect(state.humidity).to.equal(payload.data.humidity);
  });



});
