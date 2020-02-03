const { createCanvas, loadImage } = require('canvas')
require('dotenv').config()
var Twitter = require('twitter');

const GIFEncoder = require('gifencoder');
const fs = require('fs');

const encoder = new GIFEncoder(600, 600);
// stream the results as they are available into myanimated.gif
encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));

encoder.start();
encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
encoder.setDelay(50);  // frame delay in ms
encoder.setQuality(10); // image quality. 10 is default.
const canvas = createCanvas(600, 600);
const ctx = canvas.getContext('2d');

let particles = []
    function createParticleAtPoint(x, y, color) {
      const particle = {}
      particle.posX = x
      particle.posY = y
      particle.startTime = Date.now()
      particle.radius = Math.floor(Math.random()*400)
      particle.color = color

      particles.push(particle)


    }
for(let j=0;j<50;j++){
  new createParticleAtPoint( Math.random()*600,  Math.random()*600, `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`)

}
    for(let i=0;i<5000;i++) {

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      particles  = particles.filter(x=> x.posY < canvas.height + x.radius)
      particles  = particles.filter(x=> x.posX < canvas.width + x.radius)
      particles.map(x  => {
        ctx.beginPath()
        ctx.arc(x.posX, x.posY, x.radius, 0, Math.PI * 2)
        ctx.globalAlpha = 0.5
        ctx.fillStyle = x.color
        ctx.fill()

        x.posY +=  Math.random()
        x.posX +=  Math.random()





      })
      
    encoder.addFrame(ctx)
    }

// use node-canvas
// const canvas = createCanvas(320, 240);
// const ctx = canvas.getContext('2d');
//
// // red rectangle
// ctx.fillStyle = '#ff0000';
// ctx.fillRect(0, 0, 320, 240);
// encoder.addFrame(ctx);
//
// // green rectangle
// ctx.fillStyle = '#00ff00';
// ctx.fillRect(0, 0, 320, 240);
// encoder.addFrame(ctx);
//
// // blue rectangle
// ctx.fillStyle = '#0000ff';
// ctx.fillRect(0, 0, 320, 240);
// encoder.addFrame(ctx);

encoder.finish();
