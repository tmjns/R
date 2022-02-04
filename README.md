<img src="https://user-images.githubusercontent.com/38649555/152340113-8b79e7e8-01a6-4c93-a150-0f216dc9c0e2.gif" width="120"/>

# R – a ring-based interface.

Before I dig deeper into project details, I want to give proper respect to https://buck.co/ for the main inspiration of this project.

## Setup

### Torus demo

Simply open the ```index.html``` file in your Google Chrome browser and click the connect button.

### Connect
<img src="https://user-images.githubusercontent.com/38649555/152540325-6ae7b94a-eb7c-4037-b4b1-35b4c8ecaee1.png" width="1200">
Choose your board and connect.

### Items demo

Navigate to the ```items demo``` folder and run ``` npm install ```. Afterwards run ``` npm run dev ``` to start the app.

## Serial communication
Since the controller only sends either zeros ```0``` or ``` 1 ``` ones, I am looking at all the values ​​that come in and adjust the rotation of the torus.

```js

async function start() {
  
  const port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 });
  const textDecoder = new TextDecoderStream();
  const reader = textDecoder.readable.getReader();

  while (true) {
      const { value, done } = await reader.read();
      
      if (done) {
          reader.releaseLock();
          break;
      }

      if(value.charAt(0) == "1"){
          rotation+= 0.02; // rotation to the right
      }
      
      if(value.charAt(0) == "0"){
          rotation-= 0.02; // rotation to the left
      }
  }
  
}

```


## Working process.
<img src="https://user-images.githubusercontent.com/38649555/152338177-48a86292-88b4-4ac6-93d2-8b5b1473f438.jpg" width="1200"/>
Preparing of the lazy susan bearing.

<img src="https://user-images.githubusercontent.com/38649555/152339098-100a1516-5a22-4231-b455-4755374fc538.jpg" width="1200"/>
Attachment to the monitor.

<img src="https://user-images.githubusercontent.com/38649555/152371391-843d6362-b555-44a5-9fee-5c4652dbb0fc.gif" width="1200"/>
First working prototype.

<img src="https://user-images.githubusercontent.com/38649555/152342064-ca25fa06-9abc-4a06-a59d-bc2aeee1c8fb.jpg" width="1200"/>
Installation of the front panel.

## What's next?
I am looking forward to implement and test this setup with [Touchdesigner](https://derivative.ca)

