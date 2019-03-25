console.log('hey from bg');

// chrome.browserAction.onClicked.addListener(function(event){
// 	console.log('ya clicked me');

// 	chrome.tabs.executeScript({
// 		"file" : "contentScript.js"
// 	});
// })

let urls = []; //keeep a list of all urls we are sending requests to, so that each can have a reliable (though moving as the array expands)
				// position on the x-axis-- a request going to a particular url is going to get aimed at a point representing it

var onBeforeRequestcallback = function(request) {
	console.log("onBeforeRequest");
	console.log(request);
	console.log('tid: '+request.tabId);

	if(!urls.includes(request.url)){
		urls.push(request.url);
	}//add url to the list if it's a new one
	var spriteLoaded;
	chrome.storage.sync.get(['sprite'], function(result) {
          console.log('Value currently is ' + result.sprite);
          spriteLoaded =  result.sprite;

          chrome.tabs.sendMessage(request.tabId, {url: request.url, sprite: spriteLoaded, action: "onBeforeRequest", requestId: request.requestId, urlArray: urls}, 
	 			function(response) {
	    			console.log(response);
	  		});
        });
      

		


};
      var filter = {urls: ["<all_urls>"]};
      var opt_extraInfoSpec = [];

chrome.webRequest.onBeforeRequest.addListener(
        onBeforeRequestcallback, filter, opt_extraInfoSpec);





var onCompletedCallback = function(request) {
	console.log("onCompletedCallback");
	console.log(request);



		chrome.tabs.sendMessage(request.tabId, 
			{url: request.url, 
			action: "onCompleted", 
			requestId: request.requestId, 
			statusCode : request.statusCode}, 
	 			function(response) {
	    			console.log(response);
	  		});


};

chrome.webRequest.onCompleted.addListener(
        onCompletedCallback, filter, opt_extraInfoSpec);
     
