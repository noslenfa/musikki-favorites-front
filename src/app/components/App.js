import React, { Component } from 'react';
import NavBarMusikki from './NavBarMusikki';

class App extends Component {

  constructor(props){
		super(props);
    this.state = {loggedIn: false};
	}

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
