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
    console.log(msg);


	    console.log(msg);

	    
if(msg.action=='onBeforeRequest'){
		var xpos = Math.floor(Math.random()*screen.width);
	    console.log('xpos '+xpos);

	    xOrigin = $(window).width()/2;
	   
	    newRocket = "<div class='rocket "+msg.sprite+" ' id='"+msg.requestId+"' style='position:absolute; bottom:0; left: "+xOrigin+";'>";
	    console.log(newRocket);
		$('body').append(newRocket);

		//given the x origin and x destination position (xpos), calculate the angle that the rocket's nose needs to point.

		let tanx = (xpos - xOrigin)/$(window).height();
		let rocketAngle = Math.atan(tanx);

		let $rocket = $('#'+msg.requestId);



console.log('angle',rocketAngle);
		$rocket.css({'transform' : 'rotate('+ rocketAngle +'rad)'});

		$rocket.data('angle', rocketAngle);




		$rocket.animate({ 'top': '0px', 'left': xpos+'px'}, 300, function(){
			console.log('animatin');
			$rocket.addClass('flipped');
    	});
		

		

}else if(msg.action == 'onCompleted'){
		
		 let $rocket = $('#'+msg.requestId);

		// let tanx = (xpos - xOrigin)/$(window).height();
		
		// let rocketAngle = Math.atan(tanx);

		// let $rocket = $('#'+msg.requestId);

		// console.log('angle',rocketAngle);

		let rocketAngle = $rocket.data('angle') + Math.PI;
		
		$rocket.css({'transform' : 'rotate('+rocketAngle+'rad)'});

		if(msg.statusCode != 200){
		
			
		$rocket.html("Explosion!!!");
			settimeout(function($rocket){
				$rocket.remove();
			},1500)
		}else{
			$rocket.animate({ 'top':'500px', 'bottom': '0px', 'left': '500px'}, 400, function($rocket){
				$(this).remove();
			
    	});
		}

	
	
		
	}

	
	    
  });