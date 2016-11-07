import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
import VideoMusikki from './VideoMusikki';
import NavBarMusikki from './NavBarMusikki';
import ValidationsMsgMusikki from './ValidationsMsgMusikki';
import FooterMusikki from './FooterMusikki';

class RegisterMusikki extends Component {
  constructor(props){
		super(props);
    this.state = {usernameRValue: '', passwordRValue: '', favorites: [], userRList: []};
	}

  handleChangeRUsername(e) {
    this.setState({ usernameRValue: e.target.value });
  }

  handleChangeRPassword(e) {
    this.setState({ passwordRValue: e.target.value });
  }

  registerUser() {
    this.setState({errorMessage: ""});
    this.setState({classMessage: ""});

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

      this.setState({errorMessage: "Congratulations! You are registered now."});
      this.setState({classMessage: "sucess-message"});
      if(verifyUsernameExistence(this.state.usernameRValue)){
        this.setState({errorMessage: "That user already exist! Please choose other username."});
        this.setState({classMessage: "error-message"});
      } else {
        userRListAll.push({username: this.state.usernameRValue, password: this.state.passwordRValue, favorites: this.state.favorites});
        this.state.usernameRValue = "";
        this.state.passwordRValue = "";
        localStorage.setItem('users', JSON.stringify(userRListAll));
        this.setState({ userRList: userRListAll });
      }
    } else {
      this.setState({errorMessage: "Please fill both fields (Username and Password)"});
      this.setState({classMessage: "error-message"});
    }
  }

  handleKeyPress(target) {
    if(target.charCode==13){
      this.registerUser();
    }
  }

  render() {
    const videoURLRegister = '../app/videos/video_02_720p.mp4';
    return (
      <div>
        <NavBarMusikki />
        <div className="container login-area">
          <div className="overlay-video"></div>
          <VideoMusikki videoURL={videoURLRegister}/>
          <ValidationsMsgMusikki errorMsg={this.state.errorMessage} classMsg={this.state.classMessage}/>
          <form>
            <FormGroup
              controlId="login-username"
              className="text-center">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                value={this.state.usernameRValue}
                placeholder="Username"
                onChange={this.handleChangeRUsername.bind(this)}
              />
            </FormGroup>
            <FormGroup
              controlId="login-password"
              className="text-center">
              <ControlLabel className="text-center">Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.passwordRValue}
                placeholder="Password"
                onChange={this.handleChangeRPassword.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}/>
            </FormGroup>
            <div className="text-center">
              <Button bsStyle="success" onClick={this.registerUser.bind(this)}>Register</Button>
            </div>
          </form>
        </div>
        <FooterMusikki />
      </div>
    );
  }
}

export default RegisterMusikki;
