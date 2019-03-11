function callback(details) {
	console.log(details);
  // 1: details.requestHeaders.push({name: 'x-secret-code', value::'pineapple'})
 // 2: for(var i=0;i<details.requestHeaders.length;i++){
 //  	if(details.requestHeaders[i].name=='Accept-Language'){
 //  		details.requestHeaders[i].value='de';
 //  	}
 //  }
//return { requestHeaders: details.requestHeaders };


//3:
if(details.url == "https://htb-week-6.herokuapp.com/public/scripts/quiz-scripts-2.js"){
	return {cancel: true};
}
}

var filter = {
  urls: ['<all_urls>']
};

// As of Chrome v72, the 'extraHeaders' string is required here
// in order to get access to Set-Cookie header
var extraInfo = ['blocking', 'requestHeaders','extraHeaders'];

chrome.webRequest.onBeforeSendHeaders.addListener(
  callback, filter, extraInfo);