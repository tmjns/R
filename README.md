<img src="https://user-images.githubusercontent.com/38649555/152340113-8b79e7e8-01a6-4c93-a150-0f216dc9c0e2.gif" width="120"/>

# R – a ring-based interface.

Before I dig deeper into project details, I want to give proper respect to https://buck.co/ for the main inspiration of this project.

## Setup

### Items demo

Run ``` npm install ``` and ``` npm run dev ``` to start the vite.js app

### Torus demo

Simply open up the file in your chrome browser.

## Serial communication

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
          rotation+= 0.02;
      }
      
      if(value.charAt(0) == "0"){
          rotation-= 0.02;
      }
  }
  
}

```


## Working process.
<img src="https://user-images.githubusercontent.com/38649555/152338177-48a86292-88b4-4ac6-93d2-8b5b1473f438.jpg" width="1200"/>
<p align = "center">Preparing of the lazy susan bearing.</p></br>

<img src="https://user-images.githubusercontent.com/38649555/152339098-100a1516-5a22-4231-b455-4755374fc538.jpg" width="1200"/>
<p align = "center">Attachment to the monitor.</p></br>

<img src="https://user-images.githubusercontent.com/38649555/152371391-843d6362-b555-44a5-9fee-5c4652dbb0fc.gif" width="1200"/>
<p align = "center">First working prototype.</p></br>

<img src="https://user-images.githubusercontent.com/38649555/152342064-ca25fa06-9abc-4a06-a59d-bc2aeee1c8fb.jpg" width="1200"/>
<p align = "center">Installation of the front panel.</p></br>

## What's next?
I am looking forward to implement and test this setup with [Touchdesigner](https://derivative.ca)

