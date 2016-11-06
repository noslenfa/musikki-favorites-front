import React, {Component} from 'react';
import Col from 'react-bootstrap/lib/Col';

class ListFavoritesMusikki extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillMount(){
  }

  render() {
    return (
      <div key={this.props.favorite.mkid} className="search-display-info">
        <Col xs={2}>
          <img src={this.props.favorite.image}/>
        </Col>
        <Col className="search-display-info-text" xs={8}>
          <div><span>NAME: </span>{this.props.favorite.name}</div>
          <div><span>TYPE: </span>{this.props.favorite.type}</div>
          </Col>
        <Col xs={2}><div className={this.props.className} onClick={() => this.props.selectFavorite(this.props.favorite.mkid)}></div></Col>
      </div>
    );
  }
}

export default ListFavoritesMusikki;
