import React, {Component} from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import TabContainer from 'react-bootstrap/lib/TabContainer';
import TabPane from 'react-bootstrap/lib/TabPane';
import TabContent from 'react-bootstrap/lib/TabContent';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Button from 'react-bootstrap/lib/Button';
import Pagination from 'react-bootstrap/lib/Pagination';
import ResultsService from '../services/ResultsService'
import {test} from '../services/ResultsService'

class SearchMusikki extends Component {
  constructor(props){
		super(props);
    this.resultsService = new ResultsService();
    this.state = {artistName: '', results: [], summary: [], searchOcurred: false};
	}

  handleChangeArtist(e) {
    this.setState({ artistName: e.target.value });
  }

  searchArtist(){
    if (this.state.activePage === undefined) {
      this.state.activePage = 1;
    }
    this.state.searchOcurred = true;
    this.resultsService.getArtistsInfo(this.state.artistName, this.state.activePage,
      (response) => {
        this.setState({ results: response.results });
        this.setState({ summary: response.summary });
        console.log('results: ', this.state.results);
        console.log('summary: ', this.state.summary);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleSelect(number) {
      this.state.activePage = number;
      this.searchArtist();
  }

  render() {
    return (
      <div className="container search-area">
        <TabContainer id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col xs={12}>
              <Nav bsStyle="pills">
                <NavItem className="search-search-favorites" eventKey="first">
                  SEARCH
                </NavItem>
                <NavItem className="search-search-favorites" eventKey="second">
                  FAVORITES
                </NavItem>
              </Nav>
            </Col>
            <Col xs={12}>
              <TabContent animation>
                <TabPane eventKey="first">
                  <Row className="clearfix">
                    <Col className="search-input-main" xs={8}>
                    <FormGroup className="search-input">
                      <FormControl
                      type="text"
                      value={this.state.artistName}
                      placeholder="Search"
                      onChange={this.handleChangeArtist.bind(this)}
                       />
                    </FormGroup>
                  </Col>
                  <Col className="search-artist-btn" xs={4}>
                    <Button bsStyle="primary" onClick={() => this.searchArtist()}>SEARCH ARTISTS<div className="icon fa fa-search"></div></Button>
                  </Col>
                  </Row>
                  <hr />
                   {this.state.results.map((item) =>
                    <div key={item.mkid} className="search-display-info">
                      <Col xs={2}>
                        <img src={item.image} />
                      </Col>
                      <Col className="search-display-info-text" xs={8}>
                        <div><span>NAME: </span>{item.name}</div>
                        <div><span>TYPE: </span>{item.type}</div>
                        </Col>
                      <Col xs={2}><div className="icon fa fa-star search-favorite search-favorite-empty"></div></Col>
                    </div>)}
                    {this.state.searchOcurred ?
                    <div className="search-pagination">
                      <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={this.state.summary.total_pages}
                        maxButtons={5}
                        activePage={this.state.activePage}
                        onSelect={this.handleSelect.bind(this)} />
                    </div>:
                    <div></div>}
                </TabPane>
                <TabPane eventKey="second">
                  FAVORITES
                  </TabPane>
              </TabContent>
            </Col>
          </Row>
        </TabContainer>

      </div>
    );
  }
}

export default SearchMusikki;
