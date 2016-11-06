import React, {Component} from 'react';
import NavBarMusikki from './NavBarMusikki'
import VideoMusikki from './VideoMusikki'


class NotFoundMusikki extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticatedUser: "",
      loggedIn: JSON.parse(localStorage.getItem("loggedIn"))
   };
  }

  componentWillMount() {
      this.setState({authenticatedUser: JSON.parse(localStorage.getItem("authenticatedUser"))});
      this.setState({loggedIn: JSON.parse(localStorage.getItem("loggedIn"))});
      console.log(this.state);
  }

  render() {
    const videoURLLogin = '../app/videos/video_01_720p.mp4';
    return (
      <div>
          <NavBarMusikki loggedIn={this.state.loggedIn} username={this.state.authenticatedUser}/>
          <VideoMusikki videoURL={videoURLLogin}/>
          <div className="notfound-404">404</div>
          <div className="notfound-page">PAGE NOT FOUND</div>
      </div>
    );
  }
}

export default NotFoundMusikki;
