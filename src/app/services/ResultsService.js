import {API_REST_URL} from "../constants/Constants";
import {API_ID} from "../constants/Constants";
import {API_KEY} from "../constants/Constants";
import RestService from "./RestService"

class ResultsService{


//get all artists info based on input inserted
	getAllSearchedArtistsInfo(artistName, pageNumber, cb, cberror){

		let url = API_REST_URL + "/v1/artists?q=[artist-name:" + artistName + "]&appkey=" + API_KEY + "&appid=" + API_ID + "&limit=10&page=" + pageNumber;

		RestService.get(url).then((response) => {
      cb(JSON.parse(response));
		}, (err) => {
			cberror(err);
		});
	}


//get artist info based on artist mkid
	getArtistsInfo(mkid, cb, cberror){

		let url = API_REST_URL + "/v1/artists/" + mkid + "/?appkey=" + API_KEY + "&appid=" + API_ID;

		RestService.get(url).then((response) => {
      cb(JSON.parse(response));
		}, (err) => {
			cberror(err);
		});
	}

}

export default ResultsService;
