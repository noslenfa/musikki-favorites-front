import React, {Component} from "react";

class ValidationsMsgMusikki extends Component {

  constructor(props){
		super(props);
	}

  render() {
    return (
      <div className={this.props.classMsg}>
        {this.props.errorMsg}
      </div>
    );
  }
}

export default ValidationsMsgMusikki;
