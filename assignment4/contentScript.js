console.log('content script working');


function getRandomColor() {
	//https://stackoverflow.com/questions/1484506/random-color-generator
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


chrome.runtime.onMessage.addListener(
  function(msg, sender, sendResponse) {
    //console.log(msg);


	    console.log(msg);

	    
if(msg.action=='onBeforeRequest'){
		var xpos = Math.floor(Math.random()*screen.width);
	    console.log('xpos '+xpos);
	   
	    newRocket = "<div class='rocket' id='"+msg.requestId+"' style='margin-left:"+xpos+";background-color:"+getRandomColor()+"'>";
	    console.log(newRocket);
		$('body').prepend(newRocket);
		

}else{
		console.log('disappear');
}
	    
  });