import React, { Component } from "react";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import FormControlFeedback from "react-bootstrap/lib/FormControlFeedback";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Button from "react-bootstrap/lib/Button";

import HeaderMusikki from "./common/HeaderMusikki";
import FooterMusikki from "./common/FooterMusikki";
import VideoMusikki from "./others/VideoMusikki";
import ValidationsMsgMusikki from "./others/ValidationsMsgMusikki";

class RegisterMusikki extends Component {
  constructor(props){
		super(props);
    this.state = {
      usernameRValue: "",
      passwordRValue: "",
      favorites: [],
      userRList: [],
      errorMessage: "",
      classMessage: ""
    };
	}

  handleChangeRUsername(e) {
    this.setState({ usernameRValue: e.target.value });
  }

  handleChangeRPassword(e) {
    this.setState({ passwordRValue: e.target.value });
  }

  registerUser() {
    //set the errorMessage and classMessage to an empty string.
    //this way the last error won't appear in case everything is correct
    this.setState({errorMessage: ""});
    this.setState({classMessage: ""});

    //user and password verification
    if (this.state.usernameRValue && this.state.passwordRValue) {
      //retrieve users list from localStorage
      let userRListAll = JSON.parse(localStorage.getItem("users"));
      //if ther's no users list it passes an empty one
      if (userRListAll === null) {
        userRListAll = this.state.userRList;
      }

      //user verification based on name entered and users existent in localStorage
      const verifyUsernameExistence = function (username) {
          let usersfound = userRListAll.filter(function(elm){
            return elm.username === username;
          });
          return usersfound.length > 0;
      }

      //validation existent for verification based on existing username
      if(verifyUsernameExistence(this.state.usernameRValue)){
        this.setState({errorMessage: "That user already exist! Please choose other username."});
        this.setState({classMessage: "error-message"});
      } else {
        //validation existent when the registry has success
        this.setState({errorMessage: "Congratulations! You are registered now."});
        this.setState({classMessage: "sucess-message"});
        userRListAll.push({username: this.state.usernameRValue, password: this.state.passwordRValue, favorites: this.state.favorites});
        this.state.usernameRValue = "";
        this.state.passwordRValue = "";
        localStorage.setItem("users", JSON.stringify(userRListAll));
        this.setState({ userRList: userRListAll });
      }
    } else {
      //validation existent for one empty field
      this.setState({errorMessage: "Please fill both fields (Username and Password)"});
      this.setState({classMessage: "error-message"});
    }
  }

  //because react doesn't detect input Enter we must detect by its charCode
  handleKeyPress(target) {
    if(target.charCode==13){
      this.registerUser();
    }
  }

  render() {
    const videoURLRegister = "../app/videos/video_02_720p.mp4";
    return (
      <div>
        <HeaderMusikki />
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
