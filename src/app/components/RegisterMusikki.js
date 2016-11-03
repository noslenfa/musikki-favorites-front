import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import VideoMusikki from './VideoMusikki';

class RegisterMusikki extends Component {
  constructor(props){
		super(props);
    this.state = {usernameRValue: '', passwordRValue: '', userRList: []};
	}

  handleChangeRUsername(e) {
    this.setState({ usernameRValue: e.target.value });
  }

  handleChangeRPassword(e) {
    this.setState({ passwordRValue: e.target.value });
  }

  registerUser() {
    if (this.state.usernameRValue && this.state.passwordRValue) {

      let userRListAll = JSON.parse(localStorage.getItem("users"));
      if (userRListAll === null) {
        userRListAll = this.state.userRList;
      }

      const verifyUsernameExistence = function (username) {
          let usersfound = userRListAll.filter(function(elm){
            return elm.username === username;
          });
          return usersfound.length > 0;
        }

      if(verifyUsernameExistence(this.state.usernameRValue)){
        //TODO: add information about user existence
        console.log('user already exist!')
      } else {
        userRListAll.push({username: this.state.usernameRValue, password: this.state.passwordRValue});
        this.state.usernameRValue = "";
        this.state.passwordRValue = "";
        localStorage.setItem('users', JSON.stringify(userRListAll));
        this.setState({ userRList: userRListAll });
      }
    } else {
      //TODO: inform to fill both inputs
      console.log("please fill both inputs")
    }
  }

  render() {
    const videoURLRegister = '../app/videos/video_02_720p.mp4';
    return (
        <div className="container login-area">
          <div className="overlay-video"></div>
          <VideoMusikki videoURL={videoURLRegister}/>
        <form>
              <FormGroup
                controlId="login-username"
                className="text-center">
                <ControlLabel >Username</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.usernameRValue}
                  placeholder="Username"
                  onChange={this.handleChangeRUsername.bind(this)}
                  />
              </FormGroup>
              <FormGroup
                controlId="login-password"
                className="text-center"
                >
                <ControlLabel className="text-center">Password</ControlLabel>
                <FormControl
                  type="password"
                  value={this.state.passwordRValue}
                  placeholder="Password"
                  onChange={this.handleChangeRPassword.bind(this)}
                  />
              </FormGroup>
              <div className="text-center">
                <Button bsStyle="success" onClick={this.registerUser.bind(this)}>Register</Button>
              </div>
            </form>

</div>
    );
  }
}

export default RegisterMusikki;
