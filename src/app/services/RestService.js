class RestService {

	static get(url) {
		return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.open("GET", url);
			//this is called even on 404 etc, to check the status
			req.onload = function() {
				//resolve the promise with the response text
				if (req.status == 200) {
					resolve(req.response);
					//otherwise reject with the status text
					// which will hopefully be a meaningful error
				} else {
					reject(Error(req.statusText));
				}
			};

			//handle network errors
			req.onerror = function() {
				reject(Error("Network Error"));
			};
			req.send();
		});
	}
}

export default RestService;
