import React from 'react';

import { Dashboard } from 'routes/Dashboard';
import { STATUS } from 'constants/index';

const mockDispatch = jest.fn();
const props = {
  dispatch: mockDispatch,
  dashboard: {
    status: STATUS.SUCCESS,
  },
};

function setup(ownProps = props) {
  return mount(<Dashboard {...ownProps} />);
}

describe('Dashboard', () => {
  const wrapper = setup();

  it('should render 3 dashboard items', () => {
    const items = wrapper.find('li');

    expect(items.length).toEqual(3);
  });
});
