//functions
function linear (x,y){
  return [x, y]
}
function sinusoidal (x,y){
  return [Math.sin(x), Math.sin(y)]
}
function spherical (x,y){
  const r = 1.0 / (x * x + y * y)
  return [r * x, r * y]
}
function swirl (x,y){
  const r = (x * x) + (y * y)
  return [x * Math.sin(r) - y * Math.cos(r), x * Math.cos(r) + y * Math.sin(r)]
}
function horseshoe (x,y){
  const r = 1.0 / Math.hypot(x, y)
  return [r * (x - y) * (x + y), r * 2.0 * x * y]
}
function polar (x,y){
  return [Math.atan2(y, x) / Math.PI, Math.hypot(x, y) - 1.0]
}
function spiral (x,y){
  const r = Math.hypot(x, y)
  const theta = Math.atan2(y, x)
  return [(1.0 / r) * (Math.cos(theta) + Math.sin(r)), (1.0 / r) * (Math.sin(theta) - Math.cos(r))]
}
function hyperbolic (x,y){
    r = Math.hypot(x, y)
    theta = Math.atan2(y, x)
    return [Math.sin(theta) / r, r * Math.cos(theta)]
}
function diamond (x,y){
    r = Math.hypot(x, y)
    theta = Math.atan2(y, x)
    return [Math.sin(theta) * Math.cos(r), Math.cos(theta) * Math.sin(r)]
}
function julia (x,y){
    r = Math.sqrt(Math.hypot(x, y))
    theta = Math.atan2(y, x) * 0.5
    if (Math.random() < .5){
      theta += Math.PI
    }
    return [r * Math.cos(theta), r * Math.sin(theta)]
}
function noise (x,y){
  theta = Math.random()
  r = Math.random()
  return [theta * x * Math.cos(2 * Math.PI * r), theta * y * Math.sin(2 * Math.PI * r)]
}
function handkerchief (x,y){
  r = Math.hypot(x, y)
  theta = Math.atan2(y, x)
  return [r * Math.sin(theta + r), r * Math.cos(theta - r)]
}
function disk (x,y){
  r = Math.hypot(x, y) * Math.PI
  theta = Math.atan2(y, x) / Math.PI
  return [theta * Math.sin(r), theta * Math.cos(r)]
}
function eyefish (x,y){
  r = 2.0 / (1.0 + Math.hypot(x, y))
  return [r * x, r * y]
}
function ex (x,y){
  r = Math.hypot(x, y)
  theta = Math.atan2(y, x)
  i0 = Math.sin(theta + r)
  i0 = i0 * i0 * i0
  j0 = Math.cos(theta - r)
  j0 = j0 * j0 * j0
  return [r * (i0 + j0), r * (i0 - j0)]
}
//
//number of functions to choose from
const j = 7
//canvas resolution
const res = 600
//list of all possible functions
//



const FUNCTIONS = [linear,sinusoidal,spherical,swirl,horseshoe,polar,spiral,hyperbolic,diamond,julia,noise,handkerchief,disk,eyefish,ex]
//list of selected functions
FUNCS = Array.from({length: j}, () => FUNCTIONS[Math.floor(Math.random() * FUNCTIONS.length)] );


//
//
//
//canvas + miscellaneous variables
const tau = 2 * Math.PI
const res2 = res/2
const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");
canvas.width = res.toString();
canvas.height = res.toString();
//
//fill canvas black
ctx.fillStyle = "black";
ctx.fillRect(0, 0, res, res);
//
//draw pixel to canvas
function draw2canvas(xPos, yPos, color) {
  ctx.fillStyle = color;
  ctx.fillRect(xPos, yPos, 1, 1);
}
//numbers
const aj = Array.from({length: j}, () => Math.random() );
const bj = Array.from({length: j}, () => Math.random() );
const cj = Array.from({length: j}, () => Math.random() -.5 );
const dj = Array.from({length: j}, () => Math.random() );
const ej = Array.from({length: j}, () => Math.random() );
const fj = Array.from({length: j}, () => Math.random() -.5 );
//
//fractal flame function
function F(x,y){
  //index of function in FUNCTIONS list
  const rand = Math.floor(j *Math.random()) 
  const X = aj[rand] * x + bj[rand] * y + cj[rand]
  const Y = dj[rand] * x + ej[rand] * y + fj[rand]
  const P = FUNCS[rand](X,Y)
  return [P[0],P[1],rand]
}
//
//Inigo Quillez coloring
function Q(t,d) {
  const c = .5 + Math.cos(4 * tau * (t+d)) * .5;
  return c
}
//
//
// Histogram
histogram = Array(res).fill().map(() => Array(res).fill(0));
let MAX = 0
RED = Array(res).fill().map(() => Array(res).fill(.5));
GREEN = Array(res).fill().map(() => Array(res).fill(.5));
BLUE = Array(res).fill().map(() => Array(res).fill(.5));

//
//

function update(){
  let Px = 2 * Math.random() - 1
  let Py = 2 * Math.random() - 1
  let Pred = 0
  let Pgreen = 0
  let Pblue = 0
  for (let i = 0; i < 10000; i++){
    const arr = F(Px,Py)
    Px = arr[0]
    Py = arr[1]
    const temp = arr[2]/j
    Pred = Pred/2 + Q(temp,0)/2
    Pgreen = Pgreen/2 + Q(temp,1/3)/2
    Pblue = Pblue/2 + Q(temp,2/3)/2

    if (i >= 20){
      if (Math.max(Math.abs(Px),Math.abs(Py)) < 1){
        const X0 = Math.floor(res2 * Px + res2)
        const Y0 = Math.floor(res2 * Py + res2)

        histogram[X0][Y0]++
        RED[X0][Y0] = (RED[X0][Y0] + Pred)/2
        GREEN[X0][Y0] = (GREEN[X0][Y0] + Pgreen)/2
        BLUE[X0][Y0] = (BLUE[X0][Y0] + Pblue)/2


        //
        if (histogram[X0][Y0] > MAX){
          MAX = histogram[X0][Y0]
        }

        let co = Math.log(histogram[X0][Y0]) / Math.log(MAX) * 255
        red = co * RED[X0][Y0]
        green = co * GREEN[X0][Y0]
        blue = co * BLUE[X0][Y0]
        draw2canvas(X0,Y0,"rgb("+red+","+green+","+blue+")")
      }

    }
  }
  requestAnimationFrame(update)

}
//
//write function names on document
document.getElementById("p").innerHTML = 'This program creates a random fractal flame using many different random functions, read more about fractal flames on the wikipedia page. <br><br> the functions used in the current fractal are: <br><br>'
for (i of FUNCS ){
  document.getElementById("p").innerHTML = document.getElementById("p").innerHTML + " " + i.name
}
//
//
update()


















