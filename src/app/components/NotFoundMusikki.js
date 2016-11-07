import React, {Component} from "react";

import HeaderMusikki from "./common/HeaderMusikki"
import FooterMusikki from "./common/FooterMusikki"
import VideoMusikki from "./others/VideoMusikki"


class NotFoundMusikki extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticatedUser: ""
   };
  }

  //get username if there's info about user is loggedIn in localStorage
  componentWillMount() {
      if(JSON.parse(localStorage.getItem("loggedIn"))) {
        console.log("entrou");
        this.setState({authenticatedUser: JSON.parse(localStorage.getItem("authenticatedUser"))});
      }
  }

  render() {
    const videoURLLogin = "../app/videos/video_01_720p.mp4";
    return (
      <div>
          <HeaderMusikki loggedIn={JSON.parse(localStorage.getItem("loggedIn"))} username={this.state.authenticatedUser}/>
          <VideoMusikki videoURL={videoURLLogin}/>
          <div className="notfound-404">404</div>
          <div className="notfound-page">PAGE NOT FOUND</div>
          <FooterMusikki />
      </div>
    );
  }
}

export default NotFoundMusikki;
