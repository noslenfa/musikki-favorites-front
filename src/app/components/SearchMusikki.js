import React, {Component} from "react";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import TabContainer from "react-bootstrap/lib/TabContainer";
import TabContent from "react-bootstrap/lib/TabContent";
import TabPane from "react-bootstrap/lib/TabPane";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import Button from "react-bootstrap/lib/Button";
import Pagination from "react-bootstrap/lib/Pagination";

import ResultsService from "../services/ResultsService"

import HeaderMusikki from "./common/HeaderMusikki"
import FooterMusikki from "./common/FooterMusikki";
import TabsSearchFavoritesMusikki from "./search/TabsSearchFavoritesMusikki"
import ListArtistsAndFavorites from "./search/ListArtistsAndFavorites"
import SearchFormMusikki from "./search/SearchFormMusikki"
import VideoMusikki from "./others/VideoMusikki";

class SearchMusikki extends Component {
  constructor(props){
		super(props);
    this.resultsService = new ResultsService();
    this.state = {
      artistName: "",
      results: [],
      summary: [],
      searchOcurred: false,
      authenticatedUser: "",
      favoritesList: [],
      allUsers: []
    };
	}

  //is invoked immediately before mounting occurs
  componentWillMount() {
    //prevent access to search page if the user is not logged in redirecting to login page
    if(!JSON.parse(localStorage.getItem("loggedIn"))) {
      this.context.router.replace("login");
      return;
    }

    //get all users list form localStorage
    this.state.allUsers = JSON.parse(localStorage.getItem("users"));
    //get the authenticatedUser from localStorage
    this.state.authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser"));

    //verifies if the user has favorites and in case it has it asks for info about each artist
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
    //to set in which page (of all artist possible pages) is, in case of value
    //being undefined it's in the first one
    if (this.state.activePage === undefined) {
      this.state.activePage = 1;
    }
    //updates the existing value that tells that a search already ocurred
    this.state.searchOcurred = true;
    //getting the results from search using resultsService to get it
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

  //used to handle when user clicks in Pagination buttons
  handleSelect(number) {
      this.setState({activePage: number});
      this.searchArtist();
  }

  //used to add or remove a favorite from the users list updating the users list in
  //localStorage at the end
  selectFav(item) {
    //if it's a favorite removes it
    if (_.includes(this.getUserFavorites(this.state.authenticatedUser), item)) {
      _.pull(this.getUserFavorites(this.state.authenticatedUser), item);
      this.setState({ allUsers: this.state.allUsers });
      this.setState({
        favoritesList: this.state.favoritesList.filter((elm, i) => elm.mkid !== item)
      });
      localStorage.setItem("users", JSON.stringify(this.state.allUsers));
    } else {
      //if it's not a favorite adds it
      this.getInfoArtist(item);
      this.getUserFavorites(this.state.authenticatedUser).push(item);
      this.setState({ allUsers: this.state.allUsers });
      localStorage.setItem("users", JSON.stringify(this.state.allUsers));
    }
  }

  //gets Artist info based on artist mkid
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

  //get username
  getUser(username){
    return _.find(this.state.allUsers, {"username": username});
  }

  //get user favorites
  getUserFavorites(username){
    return this.getUser(username).favorites;
  }

  //verify which are favorites to apply a class based on the response
  verifyFavorites(item){
    const numElm = this.state.favoritesList.filter((elm) =>
      item.mkid === elm.mkid
    );
    return numElm.length > 0;
  }

  render() {
    const videoURLLogin = "../app/videos/video_04_720p.mp4";
    return (
      <div><HeaderMusikki loggedIn={true} username={this.state.authenticatedUser}/>
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
                  {/*verifies it there was already a search and if not presents that message*/}
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
                  {/*if there are not favorites it presents that message other wise shows favorites list*/}
                  {!this.state.favoritesList.length > 0 ?
                  <div className="search-info">YOU CAN ADD OR REMOVE YOUR FAVORITES ARTISTS AFTER SEARCH BY CLICKING THE STAR!</div> :
                  <div></div>}
                  {this.state.favoritesList.map((item) =>
                   <ListArtistsAndFavorites
                     key={item.mkid}
                     favorite={item}
                     selectFavorite={this.selectFav.bind(this)}
                     className="icon fa fa-star search-favorite search-favorite-full" />)}
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

//needed for routing purposes
SearchMusikki.contextTypes = {
	router: React.PropTypes.object
}

export default SearchMusikki;
