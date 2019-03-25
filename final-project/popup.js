

	function changeSprite(newSprite){
		//alert(newSprite);
		chrome.storage.sync.set({'sprite': newSprite}, function() {
          chrome.storage.sync.get(['sprite'], function(result) {
          console.log(result);
        });
        });
	}

	$('.spriteOpt').click(function(){
		changeSprite($(this).data('sprite'));
	})