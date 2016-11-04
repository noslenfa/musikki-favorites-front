require('react-hot-loader/patch')
require('./styles/app.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router/lib/Router";
import Route from "react-router/lib/Route";
import browserHistory from "react-router/lib/browserHistory";
import IndexRoute from "react-router/lib/IndexRoute";
import App from './components/App';
import LoginMusikki from './components/LoginMusikki';
import RegisterMusikki from './components/RegisterMusikki';
import SearchMusikki from './components/SearchMusikki';
import CarouselMusikki from './components/CarouselMusikki';

import AppContainer from 'react-hot-loader/lib/AppContainer';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin({
  shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
    return true;
  }
});

ReactDOM.render(
  <AppContainer>
    <Router history={browserHistory}>
      <Route path={"/"} component={App} >
        <IndexRoute component={CarouselMusikki} />
        <Route path={"login"} component={LoginMusikki} />
        <Route path={"register"} component={RegisterMusikki} />
        <Route path={"search"} component={SearchMusikki} />
      </Route>
    </Router>
  </AppContainer>,
  document.getElementById('root')
);

if(module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
