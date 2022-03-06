<img src="https://user-images.githubusercontent.com/38649555/152340113-8b79e7e8-01a6-4c93-a150-0f216dc9c0e2.gif" width="100"/>

# R – a ring-based interface.
[![made-with-js](https://badges.aleen42.com/src/javascript.svg)](https://badges.aleen42.com/src/javascript.svg)

Before I dig deeper into project details, I want to give proper respect to <a href="https://buck.co/">Buck</a> for the main inspiration. For this, I experimented with the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API">Google Chrome Web Serial API</a> and build my on ring-based interface. 

<img src="https://user-images.githubusercontent.com/38649555/156919184-785654e7-3801-4e18-b278-d3853b75c027.jpg" width="1200"/>

## Demos

### Items

Navigate to the ```items demo``` folder and run ``` npm install ```. Afterwards run ``` npm run dev ``` to start the app.

<img src="https://user-images.githubusercontent.com/38649555/156919725-7dc400a3-4b08-49fe-aa45-c81587064289.jpg" width="1200">

### Torus

Open the ```index.html``` file in your Google Chrome browser, choose your board, and click connect.

### Connect
If the site doesn't have access to any connected ports it has to wait until it has user activation to proceed. In this case, the API use the ```click``` event handler.

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
I am looking forward to implement and test this setup with [Touchdesigner](https://derivative.ca).

## Hardware
Incremental Rotary Encoder : https://www.amazon.de/gp/product/B015GYY7XU/ref=ppx_yo_dt_b_asin_title_o05_s00?ie=UTF8&psc=1<br>
Lazy Susan : https://www.amazon.de/gp/product/B07HMQKLHD/ref=ppx_yo_dt_b_asin_title_o04_s00?ie=UTF8&psc=1<br>
Arduino UNO Rev3 : https://www.amazon.de/Arduino-Uno-Rev-3-Mikrocontroller-Board/dp/B008GRTSV6/ref=sr_1_3?keywords=arduino+uno+r3&qid=1646573389&sprefix=arduino+uno+%2Caps%2C82&sr=8-3

