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

class LoginMusikki extends Component {
  constructor(props, context){
		super(props);
    this.state = {
      usernameLValue: "",
      passwordLValue: "",
      errorMessage: "",
      classMessage: ""
    };
    context.router;
	}

  handleChangeLUsername(e) {
    this.setState({ usernameLValue: e.target.value });
  }

  handleChangeLPassword(e) {
    this.setState({ passwordLValue: e.target.value });
  }

  loginUser() {
    //set the errorMessage and classMessage to an empty string.
    //this way the last error won't appear in case everything is correct
    this.setState({errorMessage: ""});
    this.setState({classMessage: ""});

    //user and password verification
    if (this.state.usernameLValue && this.state.passwordLValue) {
      //retrieve users list from localStorage
      let userLListAll = JSON.parse(localStorage.getItem("users"));
      let userPass;
      //user verification based on name entered and users existent in localStorage
      const verifyUsernameExistence = function (username) {
        userLListAll = JSON.parse(localStorage.getItem("users"));
        let usersfound = userLListAll.filter(function(elm){
          if (elm.username === username) {
            userPass = elm.password;
            return elm;
          }
        });
        return usersfound.length > 0;
      }

      //empty div in case there's no error
      let validationMessage = <div></div>;

      //validations existent for verifications based on username or fields filled
      if(verifyUsernameExistence(this.state.usernameLValue)){
        if(userPass === this.state.passwordLValue) {
          localStorage.setItem("authenticatedUser", JSON.stringify(this.state.usernameLValue));
          localStorage.setItem("loggedIn", JSON.stringify(true));
          this.context.router.replace("search");
        } else {
          this.setState({errorMessage: "Incorrect Authentication! Please try again."});
          this.setState({classMessage: "error-message"});
        }
      } else {
        this.setState({errorMessage: "User unknown. Please register first."});
        this.setState({classMessage: "error-message"});
      }
    } else {
      this.setState({errorMessage: "Please fill both fields (Username and Password)"});
      this.setState({classMessage: "error-message"});
    }
  }

  //because react doesn't detect input Enter we must detect by its charCode
  handleKeyPress(target) {
    if(target.charCode==13){
      this.loginUser();
    }
  }

  render() {
    const videoURLLogin = "../app/videos/video_03_720p.mp4";
    return (
      <div>
        <HeaderMusikki />
        <div className="container login-area">
          <div className="overlay-video"></div>
          <VideoMusikki videoURL={videoURLLogin}/>
          <ValidationsMsgMusikki errorMsg={this.state.errorMessage} classMsg={this.state.classMessage}/>
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
                  onKeyPress={this.handleKeyPress.bind(this)}
                  />
            </FormGroup>
            <div className="text-center">
              <Button bsStyle="primary" onClick={this.loginUser.bind(this)}>Login</Button>
            </div>
          </form>
        </div>
        <FooterMusikki />
      </div>
  );
  }
}

//needed for routing purposes
LoginMusikki.contextTypes = {
	router: React.PropTypes.object
}

export default LoginMusikki;
