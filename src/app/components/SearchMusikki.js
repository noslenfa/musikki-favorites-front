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
import FooterMusikki from './FooterMusikki';
import VideoMusikki from './VideoMusikki';


class SearchMusikki extends Component {
  constructor(props){
		super(props);
    this.resultsService = new ResultsService();
    this.state = {
      artistName: '',
      results: [],
      summary: [],
      searchOcurred: false,
      authenticatedUser: '',
      favoritesList: [],
      allUsers: []
    };
	}

  componentWillMount() {
    if(!JSON.parse(localStorage.getItem("loggedIn"))) {
      this.context.router.replace('login');
      return;
    }

    this.state.allUsers = JSON.parse(localStorage.getItem("users"));
    this.state.authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser"));

    let allFav = this.getUserFavorites(this.state.authenticatedUser);
    for (let i = 0; i < allFav.length; i++) {
      let mkid = allFav[i];
      this.getInfoArtist(mkid);
    }
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
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleSelect(number) {
      this.setState({activePage: number});
      this.searchArtist();
  }

  selectFav(item) {
    if (_.includes(this.getUserFavorites(this.state.authenticatedUser), item)) {
      _.pull(this.getUserFavorites(this.state.authenticatedUser), item);
      this.setState({ allUsers: this.state.allUsers });
      this.setState({
        favoritesList: this.state.favoritesList.filter((elm, i) => elm.mkid !== item)
      });
      localStorage.setItem('users', JSON.stringify(this.state.allUsers));
    } else {
      this.getInfoArtist(item);
      this.getUserFavorites(this.state.authenticatedUser).push(item);
      this.setState({ allUsers: this.state.allUsers });
      localStorage.setItem('users', JSON.stringify(this.state.allUsers));
    }
  }

  getInfoArtist(mkid){
    this.resultsService.getArtistsInfo(mkid,
      (response) => {
        let element = {
          mkid: response.result.mkid,
          name: response.result.name,
          image: response.result.image,
          type: response.result.type
        };
        // does not modify the state, is like if it creates a new one
        this.setState({ favoritesList: this.state.favoritesList.concat([element])});
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUser(username){
    return _.find(this.state.allUsers, {'username': username});
  }

  getUserFavorites(username){
    return this.getUser(username).favorites;
  }

  verifyFavorites(item){
    const numElm = this.state.favoritesList.filter((elm) =>
      item.mkid === elm.mkid
    );
    return numElm.length > 0;
  }

  render() {
    const videoURLLogin = '../app/videos/video_04_720p.mp4';
    return (
      <div><NavBarMusikki loggedIn={true} username={this.state.authenticatedUser}/>
      <div className="container search-area">
        <div className="overlay-video"></div>
        <VideoMusikki videoURL={videoURLLogin}/>
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
                  {!this.state.searchOcurred ?
                  <div className="search-info">PLEASE USE THE SEARCH BOX TO FIND SOME ARTISTS!</div> :
                  <div></div>}
                   {
                     this.state.results.map((item) =>
                      <ListArtistsAndFavorites
                         key={item.mkid}
                         favorite={item}
                         selectFavorite={this.selectFav.bind(this)}
                         className={ this.verifyFavorites(item) ? "icon fa fa-star search-favorite search-favorite-full" : "icon fa fa-star search-favorite search-favorite-empty"  } />
                     )
                   }
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
                  <hr />
                  {!this.state.favoritesList.length > 0 ?
                  <div className="search-info">YOU CAN ADD OR REMOVE YOUR FAVORITES ARTISTS AFTER SEARCH BY CLICKING THE STAR!</div> :
                  <div></div>}
                  {this.state.favoritesList.map((item) =>
                   <ListArtistsAndFavorites
                     key={item.mkid}
                     favorite={item}
                     selectFavorite={this.selectFav.bind(this)}
                     className='icon fa fa-star search-favorite search-favorite-full' />)}
                  </TabPane>
              </TabContent>
            </Col>
          </Row>
        </TabContainer>
      </div>
      <FooterMusikki />
      </div>
    );
  }
}

SearchMusikki.contextTypes = {
	router: React.PropTypes.object
}

export default SearchMusikki;
