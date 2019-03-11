console.log('hey from bg');

// chrome.browserAction.onClicked.addListener(function(event){
// 	console.log('ya clicked me');

// 	chrome.tabs.executeScript({
// 		"file" : "contentScript.js"
// 	});
// })

var onBeforeRequestcallback = function(request) {
	console.log("onBeforeRequest");
	console.log(request);



		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	 		chrome.tabs.sendMessage(tabs[0].id, {url: request.url, action: "onBeforeRequest", requestId: request.requestId}, 
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



		chrome.tabs.query({active: true}, function(tabs) {
	 		chrome.tabs.sendMessage(tabs[0].id, {complete:true, url: request.url, action: "onCompleted", requestId: request.requestId}, 
	 			function(response) {
	    			console.log(response);
	  		});
		});


};
     

chrome.webRequest.onCompleted.addListener(
        onCompletedCallback, filter, opt_extraInfoSpec);