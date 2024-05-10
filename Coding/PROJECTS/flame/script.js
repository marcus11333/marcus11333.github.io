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
function cylinder (x,y){
  return [Math.sin(x), y]
}

//number of functions to choose from
const j = 3

//canvas resolution
let res = 300;

//list of all possible functions
const FUNCTIONS = [linear,sinusoidal,spherical,swirl,horseshoe,polar,spiral,hyperbolic,julia,handkerchief,disk,eyefish,ex,cylinder] //diamond,noise

//list of selected functions
FUNCS = Array.from({length: j}, () => FUNCTIONS[Math.floor(Math.random() * FUNCTIONS.length)] );

//canvas + miscellaneous variables
const tau = 2 * Math.PI
let res2 = res/2
const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");
canvas.width = res.toString();
canvas.height = res.toString();

var imageData = ctx.getImageData(0, 0, res, res);
var data = imageData.data;

//fill canvas black


// weights
let w_j = Array.from({length: j}, () => Math.random());

const wsum = w_j.reduce((a, b) => a + b); // sum(w_j)
w_j = w_j.map(a => a / wsum); // sum(w_j) == 1
for (let i = 1; i < j; i++)
  w_j[i] += w_j[i - 1];

// coefficients
const a_j = Array.from({length: j}, () => 2*Math.random()-1);
const b_j = Array.from({length: j}, () => 2*Math.random()-1);
const c_j = Array.from({length: j}, () => 2*Math.random()-1);
const d_j = Array.from({length: j}, () => 2*Math.random()-1);
const e_j = Array.from({length: j}, () => 2*Math.random()-1);
const f_j = Array.from({length: j}, () => 2*Math.random()-1);

//fractal flame function
function F(x,y){
  //index for function
  const r = Math.random();
  let rand = 0
  while (r >= w_j[rand])
    rand++

  const X = a_j[rand] * x + b_j[rand] * y + c_j[rand]
  const Y = d_j[rand] * x + e_j[rand] * y + f_j[rand]
  return FUNCS[rand](X,Y)
}

//Inigo Quillez coloring
function Q(t,a,b,c,d) {
  return a + b * Math.cos(tau * (c * t+d))
}

data = data.fill(0)
for (i in data){
  if (i % 4 == 3) data[i] = 255
}
ctx.putImageData(imageData, 0, 0);
histogram = Array(res*res).fill(0);
max = 1
logmax = 0

function update(){
  let Px =  2*Math.random() - 1
  let Py =  2*Math.random() - 1
  for (let i = 0; i < 20; i++){
    [Px,Py] = F(Px,Py)
  }
  for (let i = 20; i < 100000; i++){
    [Px,Py] = F(Px,Py)
    const index = ( ((res2 * Py + res2) << 0) * res + ((res2 * Px + res2) << 0));
    histogram[index] += 1
    if (histogram[index] > max)
      max = histogram[index]
      logmax = Math.log(max)
    scl = Math.log(histogram[index])/logmax

    //data[4*index] =   Q(scl,0,0,0,0)           * 255 << 0
    data[4*index+1] = Q(scl,0.5,0.5,0.5,0.5)   * 255 << 0
    data[4*index+2] = Q(scl,0.5,0.5,0.33,0.66) * 255 << 0


  }
  //

}
//
//write function names on document
for (i of FUNCS ){
  document.getElementById("p").innerHTML = document.getElementById("p").innerHTML + " " + i.name
}
//
//

function run(){
  //console.time("1");
  update()
  update()
  update()
  //console.timeEnd("1");
  ctx.putImageData(imageData, 0, 0);
  requestAnimationFrame(run)
}
run()

function increaseres(){
  res = 1000
  res2 = res/2
  canvas.width = res.toString();
  canvas.height = res.toString();
  imageData = ctx.getImageData(0, 0, res, res);
  data = imageData.data;
  data = data.fill(0)
  for (i in data){
    if (i % 4 == 3) data[i] = 255
  }
  ctx.putImageData(imageData, 0, 0);
  histogram = Array(res*res).fill(0);
  max = 1
  logmax = 0
}