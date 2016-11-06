import React, {Component} from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

class SearchFormMusikki extends Component {

  constructor(props){
		super(props);
	}

  render() {
    return (
      <Row className="clearfix">
        <Col className="search-input-main" xs={8}>
        <FormGroup className="search-input">
          <FormControl
          type="text"
          value={this.props.artistN}
          placeholder="Search"
          onChange={this.props.changeArtist}
           />
        </FormGroup>
        </Col>
        <Col className="search-artist-btn" xs={4}>
          <Button bsStyle="primary" onClick={() => this.props.searchArtist()}>SEARCH ARTISTS<div className="icon fa fa-search"></div></Button>
        </Col>
      </Row>
    );
  }
}

export default SearchFormMusikki;
