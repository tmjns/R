<img src="https://user-images.githubusercontent.com/38649555/152340113-8b79e7e8-01a6-4c93-a150-0f216dc9c0e2.gif" width="100"/>

# R – a ring-based interface.

Before I dig deeper into project details, I want to give proper respect to https://buck.co/ for the main inspiration of this project.

## Demos

### Torus

Simply open the ```index.html``` file in your Google Chrome browser, choose your board, and click connect.

### Connect
<img src="https://user-images.githubusercontent.com/38649555/154024661-6856780a-4c90-4332-b142-5b2500c3c69e.png" width="1200">


### Items

Navigate to the ```items demo``` folder and run ``` npm install ```. Afterwards run ``` npm run dev ``` to start the app.

## Serial communication
Since the controller only sends either ```0``` or ``` 1 ```, I am looking at all these values and adjusting the rotation of the torus. The digits are standing for a left or a right turn.

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


## Working process.
Attachment to the monitor.
<img src="https://user-images.githubusercontent.com/38649555/152339098-100a1516-5a22-4231-b455-4755374fc538.jpg" width="1200"/>

First working prototype.
<img src="https://user-images.githubusercontent.com/38649555/152371391-843d6362-b555-44a5-9fee-5c4652dbb0fc.gif" width="1200"/>

Installation of the front panel.
<img src="https://user-images.githubusercontent.com/38649555/152342064-ca25fa06-9abc-4a06-a59d-bc2aeee1c8fb.jpg" width="1200"/>


## What's next?
I am looking forward to implement and test this setup with [Touchdesigner](https://derivative.ca)
