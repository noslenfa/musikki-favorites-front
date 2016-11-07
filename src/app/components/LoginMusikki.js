import React, { Component } from "react";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import FormControlFeedback from "react-bootstrap/lib/FormControlFeedback";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Button from "react-bootstrap/lib/Button";
import NavBarMusikki from "./NavBarMusikki";
import VideoMusikki from "./VideoMusikki";
import ValidationsMsgMusikki from "./ValidationsMsgMusikki";
import FooterMusikki from "./FooterMusikki";

class LoginMusikki extends Component {
  constructor(props, context){
		super(props);
    this.state = {usernameLValue: "", passwordLValue: "", errorMessage: "", classMessage: ""};
    context.router;
	}

  handleChangeLUsername(e) {
    this.setState({ usernameLValue: e.target.value });
  }

  handleChangeLPassword(e) {
    this.setState({ passwordLValue: e.target.value });
  }

  loginUser() {
    this.setState({errorMessage: ""});
    this.setState({classMessage: ""});

    if (this.state.usernameLValue && this.state.passwordLValue) {

      let userLListAll = JSON.parse(localStorage.getItem("users"));
      let userPass;

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
      let validationMessage = <div></div>;
      if(verifyUsernameExistence(this.state.usernameLValue)){
        if(userPass === this.state.passwordLValue) {
          console.log("authentication correct!!");
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

  handleKeyPress(target) {
    if(target.charCode==13){
      this.loginUser();
    }
  }

  render() {
    const videoURLLogin = "../app/videos/video_03_720p.mp4";
    return (
      <div>
        <NavBarMusikki />
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

LoginMusikki.contextTypes = {
	router: React.PropTypes.object
}

export default LoginMusikki;
