import './style.css'
import Matter from 'matter-js';

///////////////////////////////////////////////////////////////////////////////////////////////////

class Sketch{
  constructor(gravity, options){
    this.status = options.status
    this.button = options.button

    this.Engine = Matter.Engine
    this.Render = Matter.Render
    this.Runner = Matter.Runner
    this.Composite = Matter.Composite
    this.Bodies = Matter.Bodies

    this.engine = this.Engine.create()
    this.engine.gravity.y = gravity

    this.w = window.innerWidth
    this.h = window.innerHeight

    this.render = this.Render.create({
      element: document.body,
      engine: this.engine,
      options: {
        width: this.w,
        height: this.h,
        showAngleIndicator: false,
        wireframes: true,
        background: 'rgb(20,21,31)',
        showCollisions: false,
        showVelocity: false  
      },
    })

    this.body_options = {
      restitution: 0.6,
    }

    this.wall_options = {
      isStatic: true,
      render: { 
        fillStyle: "rgb(20,21,31)" 
      }
    }

  }


  bodies = () => {
    let bodies = this.Composite.add(this.engine.world, [
      this.Bodies.rectangle(200, 200, 100, 100, { 
        chamfer: { radius: 20 }
      }),
      this.Bodies.rectangle(300, 200, 100, 100, { 
        chamfer: { radius: [90, 0, 0, 0] }
      }),
      this.Bodies.rectangle(400, 200, 200, 200, { 
        chamfer: { radius: [150, 20, 40, 20] }
      }),
      this.Bodies.rectangle(200, 200, 200, 200, { 
        chamfer: { radius: [150, 20, 150, 10] }
      }),
      this.Bodies.polygon(300, 100, 5, 80, { 
        chamfer: { radius: [10, 40, 20, 40, 10] }
      }),
      this.Bodies.circle(300, 250, 40, this.body_options)
    ]);
  }


  walls = () => {
    let walls = this.Composite.add(this.engine.world, [
      this.Bodies.rectangle(400, 0, 800, 50, this.wall_options),
      this.Bodies.rectangle(400, 800, 800, 50, this.wall_options),
      this.Bodies.rectangle(800, 400, 50, 800, this.wall_options),
      this.Bodies.rectangle(0, 400, 50, 800, this.wall_options)
    ]);
  }
  

  run = () => {
    s.walls()
    s.bodies()

    Matter.Composite.translate(this.engine.world, {x: this.w / 2 - 400, y: this.h / 2 - 400});
    this.Render.run(this.render);
    let runner = this.Runner.create();
    this.Runner.run(runner, this.engine);

    window.addEventListener('keydown', this.keyboard);
    // window.addEventListener('click', this.chromeSerial);
  }


  // Controlls -> Keyboard
  keyboard = () => {
    let rotation = 0;

    if ( event.key == "ArrowRight" ) {
      rotation = 0.09;
      console.log(rotation)
      Matter.Composite.rotate(this.engine.world, rotation, {x: this.w / 2, y: this.h / 2})
    }
    if ( event.key == "ArrowLeft" ) {
      rotation = -0.09;
      console.log(rotation)
      Matter.Composite.rotate(this.engine.world, rotation, {x: this.w / 2, y: this.h / 2})
    }
  }

  // Controlls -> Chrome Serial API
  chromeSerial = () => {
    
    let  rotation = 0;

    async function start() {    
    
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      const textDecoder = new TextDecoderStream();
      // const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      
      while (true) {
          const { value, done } = await reader.read();
          if (done) {
            reader.releaseLock();
            break;
          }
          
          if(value.charAt(0) == "1"){
            rotation += 0.00005;
            Matter.Composite.rotate(this.engine.world, rotation, {x: this.w / 2, y: this.h / 2})
          }
          if(value.charAt(0) == "0"){
            rotation -= 0.00005;
            Matter.Composite.rotate(this.engine.world, rotation, {x: this.w / 2, y: this.h / 2})
        }
      }
    }

    this.button.onclick = start;
    
  }
  
}

///////////////////////////////////////////////////////////////////////////////////////////////////

let s = new Sketch(4, {
  status : "Init new Sketch ...",
  button : document.getElementById("button")
})

s.run()