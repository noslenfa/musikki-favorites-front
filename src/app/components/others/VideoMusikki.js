import React, {Component} from "react";

class VideoMusikki extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <video id="background-video" loop autoPlay>
                <source src={this.props.videoURL} type="video/mp4" />
                <source src={this.props.videoURL} type="video/ogg" />
            </video>
        )
    }
};

export default VideoMusikki;
