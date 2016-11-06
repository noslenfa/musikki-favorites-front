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
import NavBarMusikki from './NavBarMusikki'
import TabsSearchFavoritesMusikki from './search/TabsSearchFavoritesMusikki'
import ListArtistsAndFavorites from './search/ListArtistsAndFavorites'
import SearchFormMusikki from './search/SearchFormMusikki'

class SearchMusikki extends Component {
  constructor(props){
		super(props);
    this.resultsService = new ResultsService();
    this.state = {artistName: '', results: [], summary: [], searchOcurred: false, authenticatedUser: '', favoritesList: [], allUsers: []};
	}

  componentWillUpdate(nextProps, nextState) {
    if (nextState.allUsers != this.state.allUsers) {
      console.log("alterou lista favoritos");
    }
  }

  componentWillMount() {

    console.log("wilmount searcg");

    this.state.allUsers = JSON.parse(localStorage.getItem("users"));
    this.state.authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser"));
    let allFav = _.find(this.state.allUsers, {'username': this.state.authenticatedUser}).favorites;
    let favList = [];
    for (let i = 0; i < allFav.length; i++) {
      let mkid = allFav[i];
      this.resultsService.getArtistsInfo(mkid,
        (response) => {
          favList.push({mkid: response.result.mkid, name: response.result.name, image: response.result.image, type: response.result.type});
          this.setState({ favoritesList: favList});
        },
        (err) => {
          console.log(err);
        }
      );
    }
    console.log(this.state.favoritesList);
  }

  handleChangeArtist(e) {
    this.setState({ artistName: e.target.value });
  }

  searchArtist(){
    if (this.state.activePage === undefined) {
      this.state.activePage = 1;
    }
    this.state.searchOcurred = true;
    this.resultsService.getAllSearchedArtistsInfo(this.state.artistName, this.state.activePage,
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

  handleKeyPress(target) {
    if(target.charCode==13){
      this.searchArtist();
    }
  }

  handleSelect(number) {
      this.state.activePage = number;
      this.searchArtist();
  }

  selectFav(item) {
    if (_.includes(_.find(this.state.allUsers, {'username': this.state.authenticatedUser}).favorites, item)) {
      _.pull(_.find(this.state.allUsers, {'username': this.state.authenticatedUser}).favorites, item);
      this.setState({ allUsers: this.state.allUsers });
      localStorage.setItem('users', JSON.stringify(this.state.allUsers));
    } else {
      _.find(this.state.allUsers, {'username': this.state.authenticatedUser}).favorites.push(item);
      this.setState({ allUsers: this.state.allUsers });
      localStorage.setItem('users', JSON.stringify(this.state.allUsers));
    }
    console.log(this.state.allUsers);
  }

  render() {
    return (
      <div><NavBarMusikki loggedIn={true} username={this.state.authenticatedUser}/>
      <div className="container search-area">
        <TabContainer id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <TabsSearchFavoritesMusikki />
            <Col xs={12}>
              <TabContent animation>
                <TabPane eventKey="first">
                  <SearchFormMusikki
                    artistN = {this.state.artistName}
                    changeArtist = {this.handleChangeArtist.bind(this)}
                    searchArtist = {this.searchArtist.bind(this)}
                    />
                  <hr />
                   {this.state.results.map((item) =>
                     <ListArtistsAndFavorites
                       key={item.mkid}
                       favorite={item}
                       selectFavorite={this.selectFav.bind(this)} />)}
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
                  {this.state.favoritesList.map((item) =>
                   <ListArtistsAndFavorites
                     key={item.mkid}
                     favorite={item}
                     selectFavorite={this.selectFav.bind(this)} />)}
                  </TabPane>
              </TabContent>
            </Col>
          </Row>
        </TabContainer>
      </div>
      </div>
    );
  }
}

export default SearchMusikki;
