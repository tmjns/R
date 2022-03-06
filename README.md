<img src="https://user-images.githubusercontent.com/38649555/152340113-8b79e7e8-01a6-4c93-a150-0f216dc9c0e2.gif" width="100"/>

# R – a ring-based interface.
[![made-with-js](https://badges.aleen42.com/src/javascript.svg)](https://badges.aleen42.com/src/javascript.svg)

Before I dig deeper into project details, I want to give proper respect to https://buck.co/ for the main inspiration of this project.

<img src="https://user-images.githubusercontent.com/38649555/156919184-785654e7-3801-4e18-b278-d3853b75c027.jpg" width="1200"/>

## Demos

### Items

Navigate to the ```items demo``` folder and run ``` npm install ```. Afterwards run ``` npm run dev ``` to start the app.

<img src="https://user-images.githubusercontent.com/38649555/156919725-7dc400a3-4b08-49fe-aa45-c81587064289.jpg" width="1200">

### Torus

Simply open the ```index.html``` file in your Google Chrome browser, choose your board, and click connect.

### Connect
<img src="https://user-images.githubusercontent.com/38649555/154024661-6856780a-4c90-4332-b142-5b2500c3c69e.png" width="1200">


## Serial communication
Since the controller only sends either ```0``` or ``` 1 ```, I am looking at all incoming values and adjusting the rotation.

```js

this.button.addEventListener('click', async () => {
    
    let rotation = 0;
      
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            reader.releaseLock();
            break;
        }

        // value -> string.
        if(value.charAt(0) == "1"){
            rotation = 0.0045;
            console.log(rotation)
        }

        if(value.charAt(0) == "0"){
            rotation = -0.0045;
            console.log(rotation)
        }
    }
    
});

```
## What's next?
I am looking forward to implement and test this setup with [Touchdesigner](https://derivative.ca)
