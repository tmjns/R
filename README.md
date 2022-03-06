<img src="https://user-images.githubusercontent.com/38649555/152340113-8b79e7e8-01a6-4c93-a150-0f216dc9c0e2.gif" width="100"/>

# R – a ring-based interface.

Before I dig deeper into project details, I want to give proper respect to https://buck.co/ for the main inspiration of this project.

<img src="https://user-images.githubusercontent.com/38649555/156917519-841c7fd7-f43c-4e4c-b915-ae75a3443129.jpg" width="1200"/>

## Demos

### Torus

Simply open the ```index.html``` file in your Google Chrome browser, choose your board, and click connect.

### Connect
<img src="https://user-images.githubusercontent.com/38649555/154024661-6856780a-4c90-4332-b142-5b2500c3c69e.png" width="1200">


### Items

Navigate to the ```items demo``` folder and run ``` npm install ```. Afterwards run ``` npm run dev ``` to start the app.

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
