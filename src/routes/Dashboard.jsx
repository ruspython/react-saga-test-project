import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { appColor } from 'modules/theme';

import { loadInitialData, listenServer, resetDashboardData } from 'actions/dashboard';
import { STATUS } from 'constants/index';

import {
  Flex,
  Heading,
  Link,
  Paragraph,
  theme,
  utils,
} from 'styled-minimal';
import Loader from 'components/Loader';

const { responsive, spacer } = utils;
const { grays } = theme;

const Grid = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${spacer(2)};
  grid-template-columns: 100%;
  list-style: none;
  margin: ${spacer(4)} auto 0;
  padding: 0;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
  responsive({
    ix: `
        grid-gap: ${spacer(3)(p)};
        width: 90%;
      `,
    md: `
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
      `,
    lg: `
        grid-template-columns: repeat(3, 1fr);
      `,
    xl: `
        grid-gap: ${spacer(4)(p)};
        grid-template-columns: repeat(4, 1fr);
      `,
  })};
  /* stylelint-enable */

  > li {
    display: flex;
  }
`;

const Item = styled(Link)`
  align-items: center;
  border: solid 0.1rem ${appColor};
  border-radius: 0.4rem;
  overflow: hidden;
  padding: ${spacer(3)};
  text-align: center;
  width: 100%;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
  responsive({
    md: `
        padding: ${spacer(3)(p)};
      `,
    lg: `
        padding: ${spacer(4)(p)};
      `,
  })};
  /* stylelint-enable */

  p {
    color: #000;
  }

  img {
    height: 8rem;
    margin-bottom: ${spacer(2)};
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacer(3)};

  small {
    color: ${grays.gray60};
  }
`;

const RESET_IF_NOT_UPDATING_TIMEOUT = 1000; // ms

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadInitialData());
    dispatch(listenServer());

    this.interval = setInterval(() => {
      dispatch(resetDashboardData());
    }, RESET_IF_NOT_UPDATING_TIMEOUT);
  }

  componentWillUnmount() {
    this.interval.clearInterval()
  }

  render() {
    const { dashboard } = this.props;
    let output;
    if (dashboard.status === STATUS.SUCCESS) {
      output = (
        <Grid>
          <li>
            <Item>
              <ItemHeader>
                <Heading as="h5" lineHeight={1}>
                  Temperature
                </Heading>
              </ItemHeader>
              <Paragraph>{dashboard.temperature || 'N/A'}</Paragraph>
            </Item>
          </li>
          <li>
            <Item>
              <ItemHeader>
                <Heading as="h5" lineHeight={1}>
                  Air pressure
                </Heading>
              </ItemHeader>
              <Paragraph>{dashboard.airPressure || 'N/A'}</Paragraph>
            </Item>
          </li>
          <li>
            <Item>
              <ItemHeader>
                <Heading as="h5" lineHeight={1}>
                  Humidity
                </Heading>
              </ItemHeader>
              <Paragraph>{dashboard.humidity || 'N/A'}</Paragraph>
            </Item>
          </li>
        </Grid>
      );
    } else {
      output = <Loader block />;
    }

    return (
      <div>
        <Flex justifyContent="center">
          <Heading>Dashboard</Heading>
        </Flex>
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { dashboard: state.dashboard };
}

export default connect(mapStateToProps)(Dashboard);
