import React, {Component} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

class TabsSearchFavoritesMusikki extends Component {

  render() {
    return (
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
    );
  }
}

export default TabsSearchFavoritesMusikki;
