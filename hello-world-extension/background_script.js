console.log('hey from bg');

chrome.browserAction.onClicked.addListener(function(event){
	console.log('ya clicked me');

	chrome.tabs.executeScript({
		"file" : "contentScript.js"
	});
})