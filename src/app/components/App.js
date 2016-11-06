import React, { Component } from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import browserHistory from 'react-router/lib/browserHistory';
import HomeMusikki from './HomeMusikki';
import LoginMusikki from './LoginMusikki';
import RegisterMusikki from './RegisterMusikki';
import SearchMusikki from './SearchMusikki';

class App extends Component {
  render() {
    return (
        <Router history={browserHistory}>
            <Route path={"/"} handler={App}>
                //<IndexRoute component={HomeMusikki} />
                <IndexRedirect to="home" />
                <Route path={"home"} component={HomeMusikki} />
                <Route path={"login"} component={LoginMusikki} />
                <Route path={"register"} component={RegisterMusikki} />
                <Route path={"search"} component={SearchMusikki} />
                <Route path='*' component={HomeMusikki} />
            </Route>
        </Router>
    );
  }
}

export default App;
