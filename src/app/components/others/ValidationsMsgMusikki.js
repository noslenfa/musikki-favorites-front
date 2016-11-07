import React, {Component} from "react";

class ValidationsMsgMusikki extends Component {

  constructor(props){
		super(props);
	}

  render() {
    return (
      //adds different classes based on error type
      <div className={this.props.classMsg}>
        {/*message given based on error obtained on login or register pages*/}
        {this.props.errorMsg}
      </div>
    );
  }
}

export default ValidationsMsgMusikki;
