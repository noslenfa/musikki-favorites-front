import {API_REST_URL} from '../constants/Constants';
import {API_ID} from '../constants/Constants';
import {API_KEY} from '../constants/Constants';
import RestService from './RestService'

class ResultsService{

	getArtistsInfo(artistName, pageNumber, cb, cberror){

		let url = API_REST_URL + '/v1/artists?q=[artist-name:' + artistName + ']&appkey=' + API_KEY + '&appid=' + API_ID + '&limit=10&page=' + pageNumber;
    console.log('URL: ', url);

		RestService.get(url).then((response) => {
      cb(JSON.parse(response));
		}, (err) => {
			cberror(err);
		});
	}

}

export default ResultsService;
