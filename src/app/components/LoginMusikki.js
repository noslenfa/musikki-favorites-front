import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
import VideoMusikki from './VideoMusikki';

class LoginMusikki extends Component {
  constructor(props, context){
		super(props);
    this.state = {usernameLValue: '', passwordLValue: ''};
    context.router;
	}

  handleChangeLUsername(e) {
    this.setState({ usernameLValue: e.target.value });
  }

  handleChangeLPassword(e) {
    this.setState({ passwordLValue: e.target.value });
  }

  loginUser() {
    if (this.state.usernameLValue && this.state.passwordLValue) {

      let userLListAll = JSON.parse(localStorage.getItem('users'));
      let userPass;

      const verifyUsernameExistence = function (username) {
        userLListAll = JSON.parse(localStorage.getItem('users'));
        let usersfound = userLListAll.filter(function(elm){
          if (elm.username === username) {
            userPass = elm.password;
            return elm;
          }
        });
        return usersfound.length > 0;
      }

      if(verifyUsernameExistence(this.state.usernameLValue)){
        if(userPass === this.state.passwordLValue) {
          //TODO: implement logic to next steps
          console.log("authentication correct!!");
          localStorage.setItem('loggedIn', JSON.stringify(true));
          this.context.router.replace('search');
        } else {
          //TODO: add information about user wrong authentication
          console.log("authentication incorrect!!");
        }
      } else {
        //TODO: add information about user !existence
        console.log('user doesnt exist!')
      }
    } else {
      //TODO: inform to fill both inputs
      console.log("please fill both inputs")
    }
  }

  render() {
    const videoURLLogin = '../app/videos/video_01_720p.mp4';
    return (
        <div className="container login-area">
          <div className="overlay-video"></div>
          <VideoMusikki videoURL={videoURLLogin}/>
        <form>
              <FormGroup
                controlId="login-username"
                className="text-center">
                <ControlLabel >Username</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.usernameLValue}
                  placeholder="Username"
                  onChange={this.handleChangeLUsername.bind(this)}
                  />
              </FormGroup>
              <FormGroup
                controlId="login-password"
                className="text-center"
                >
                <ControlLabel className="text-center">Password</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.passwordLValue}
                  placeholder="Password"
                  onChange={this.handleChangeLPassword.bind(this)}
                  />
              </FormGroup>
              <div className="text-center">
                <Button bsStyle="primary" onClick={this.loginUser.bind(this)}>Login</Button>
              </div>
            </form>
</div>

    );
  }
}

LoginMusikki.contextTypes = {
	router: React.PropTypes.object
}

export default LoginMusikki;
