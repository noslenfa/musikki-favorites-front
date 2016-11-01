import React, { Component } from 'react';
import NavBarMusikki from './NavBarMusikki';

class App extends Component {
  render() {
    return (
      <div>
        <NavBarMusikki />
        {this.props.children}
      </div>
    );
  }
}

export default App;
