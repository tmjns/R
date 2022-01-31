import './style.css'

import Matter from 'matter-js';

let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

// create an engine
let engine = Engine.create();
// define extra gravity.x
engine.gravity.y = 5;

// renderer with and height
let w = window.innerWidth;
let h = window.innerHeight;


// create a renderer
let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: w,
      height: h,
      showAngleIndicator: false,
      wireframes: false,
      background: 'rgb(20,21,31)',
      showCollisions: true,
      showVelocity: true  
    },
});

//add bodies
Composite.add(engine.world, [
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40),
  Bodies.circle(300, 250, 40)
]);

const wall_options = {
  isStatic: true,
  render: { 
    fillStyle: "rgb(20,21,31)" 
  }
}

let walls = Composite.add(engine.world, [
  Bodies.rectangle(400, 0, 800, 50, wall_options),
  Bodies.rectangle(400, 800, 800, 50, wall_options),
  Bodies.rectangle(800, 400, 50, 800, wall_options),
  Bodies.rectangle(0, 400, 50, 800, wall_options)
]);

// translate enginge to center of viewport
Matter.Composite.translate(engine.world, {x: w / 2 - 400, y: h / 2 - 400});

///////////////////////////////////////////////////////////////////////////////


// let rotation = 0;

// document.addEventListener('keydown', logKey);
// document.addEventListener('keyup', reset);

// function reset () {
//   rotation = 0;
//   console.log(rotation);
// }

// function logKey(e) {
//   rotation += 0.05;
//   Matter.Composite.rotate(engine.world, rotation, {x: w / 2, y: h / 2})
//   console.log(` ${e.code}`);
//   console.log(rotation);
// }

let rotation = 0;

async function start() {
  
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
      // value is a string.
      
      if(value.charAt(0) == "1"){
          rotation += 0.00005;
          Matter.Composite.rotate(engine.world, rotation, {x: w / 2, y: h / 2})
      }
      if(value.charAt(0) == "0"){
          rotation -= 0.00005;
          Matter.Composite.rotate(engine.world, rotation, {x: w / 2, y: h / 2})
      }
  }

}

document.getElementById("button").onclick = start;



///////////////////////////////////////////////////////////////////////////////

// run the renderer
Render.run(render);
// create runner
let runner = Runner.create();
// run the engine
Runner.run(runner, engine);