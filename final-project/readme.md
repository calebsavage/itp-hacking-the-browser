
# Network Traffic Visualizer
## Uses the WebRequest API to add a visual indication of background network traffic.
### Caleb Savage - Final project for Hacking the Browser at NYU ITP

## Components
* background.js: monitors network requests, and sends a message containing info about the request to the tab that generated the request.
* content.js: receives messages from background.js. 
  * When it gets a message that an outgoing web request is happening, it adds a *sprite* (small character or icon) to the DOM at the bottom center of the screen. 
  * Chooses a "destination" for the sprite to launch towards. Animates the sprite's movement across the screen. 
  * When it gets a message that the request has completed, it spins the sprite around and animates it towards the origin point. If the request fails (404 or 500 error, etc), the sprite will explode.
* Popup.html and popup.js: Allow the user to select a sprite from a list of available options. When a user selects a sprite, their choice is saved using the storage API. 
