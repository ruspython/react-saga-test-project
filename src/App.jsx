import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import styled, { css, ThemeProvider } from 'styled-components';

import history from 'modules/history';
import theme, { headerHeight } from 'modules/theme';
import { utils } from 'styled-minimal';

import Dashboard from 'routes/Dashboard';
import NotFound from 'routes/NotFound';

import GlobalStyles from 'components/GlobalStyles';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

const Main = styled.main`
  min-height: 100vh;
  padding: ${utils.px(headerHeight)} 0 0;
`;

export class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  render() {
    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <Main>
              <Switch>
                <Route
                  path="/"
                  exact
                  render={props => (<Dashboard {...props} />)}
                />
                <Route component={NotFound} />
              </Switch>
            </Main>
            <GlobalStyles />
          </AppWrapper>
        </ThemeProvider>
      </Router>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps() {
  return {};
}

export default hot(connect(mapStateToProps)(App));
