// complex functions

function multiply(a,b){
  let [ax,ay] = a
  let [bx,by] = b
  return [ax*bx-ay*by,ax*by+ay*bx]
}

function recip(a){
  let [ax,ay] = a
  let m = ax*ax+ay*ay
  return [ax/m,-ay/m]
}

function divide(a,b){
  let r = recip(b)
  return multiply(a,r)
}

function abs(a){
  return [Math.abs(a[0]),Math.abs(a[1])]
}

function add(a,b){
  let [ax,ay] = a
  let [bx,by] = b
  return [ax+bx,ay+by]
}

function clog(a){
  let [ax,ay] = a
  return [.5 * Math.log(ax*ax+ay*ay),Math.atan2(ay,ax)]
}

function csin(a){
  let [ax,ay] = a
  let rx = Math.sin(ax)*Math.cosh(ay)
  let ry = Math.cos(ax)*Math.sinh(ay)
  return [rx,ry]
}

// =========================

function ducks(z,c){ // log(Iabs(z)+c)
  z[1] = Math.abs(z[1])
  return clog(add(z,c))
}

function ducks2(z,c){ // log(Iabs(z)) + c
  z[1] = Math.abs(z[1])
  return add(clog(z),c)
}

function julia(z,c){ // z²+c
  return add(multiply(z,z),c)
}

function unnamed1(z,c){ // abs(z*c+1) + 1/abs(z*c+1)
  let w = multiply(z,c)
  w[0] += 1
  w = abs(w)
  return add(w,recip(w))
}

function unnamed2(z,c){ // (z*c+1) + 1/(z*c+1)
  let w = multiply(z,c)
  w[0] += 1
  return add(w,recip(w))
}

function unnamed3(z,c){ // abs(log(z*c+1)) + 1/abs(log(z*c+1))
  let w = multiply(z,c)
  w[0] += 1
  w = abs(clog(w))
  return add(w,recip(w))
}

function unnamed4(z,c){ // log(abs(z*c+1)) + 1/log(abs(z*c+1))
  let w = multiply(z,c)
  w[0] += 1
  w = clog(abs(w))
  return add(w,recip(w))
}

function unnamed5(z,c){ // 1/abs(z) + c
  return add(recip(abs(z)),c)
}

function unnamed6(z,c){ // abs(z)/abs(c) + c
  return add(divide(abs(z),abs(c)),c)
}

function kali(z,c){ // abs(z)/abs(c) + c
  z = abs(z)
  let m = z[0]*z[0] + z[1]*z[1]
  z[0] = z[0]/m + c[0]
  z[1] = z[1]/m + c[1]
  return z
}


// coloring variables
a1 = 0.65
a2 = 0.5
a3 = 0.31

b1 = -.65
b2 = 0.5
b3 = 0.5

c1 = 1.0
c2 = 1.0
c3 = 1.0

d1 = 0.66
d2 = 0.0
d3 = 0.667

//definitions
let res = 200;
let scale = 1;
let cx = 4 * Math.random() -2
let cy = 4 * Math.random() -2
let start = 0
let iter = 30;
let pilings = 6

//other
let v1 = 10 / res
const tau = 2 * Math.PI;

//canvas
const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");
canvas.width = res.toString();
canvas.height = res.toString();



//functions
function draw2canvas(xPos, yPos, color) {
  ctx.fillStyle = color;
  ctx.fillRect(xPos, yPos, 1, 1);
};

function Q(t,a,b,c,d) {
  const re = a + b * Math.cos(tau * (c*t+d))
  return (255 * re) << 0
}


//main
function update(){
  for (let x1 = 0; x1 < res; x1++){
    for (let y1 = 0; y1 < res; y1++){
      const x00 = x1 * v1  - 5;
      const y00 = y1 * v1 - 5;
      let x0 = x00 / scale
      let y0 = y00 / scale //apply zoom coords here
      let Hx = 0
      let Hy = 0
      let col0 = 0
      let colc = 0
      let c = [cx,cy]
      for(i = 1; i <= iter; i++){

        //[x0,y0] = abs(recip([x0,y0]))
        //x0 += cx
        //y0 += cy

        //[x0,y0] = clog([x0,y0])
        let z = [x0,y0]


        let w = ducks(z,c)
        x0 = w[0]
        y0 = w[1]





        //const xtemp = Math.log(Math.sqrt(x0*x0+y0*y0)) + cx
        //y0 = Math.atan2(Math.abs(y0),x0) + cy
        //x0 = xtemp
        if (i % pilings == 0){ // i % pilings == 0
          col0+=(2 / Math.PI) * Math.atan(Math.sqrt(x0*x0+y0*y0))
          colc+=1
        }
      }

      const col = (col0/colc) % 1
      const pixCol = "rgb("+
        Q(col,a1,b1,c1,d1)+
        ","+
        Q(col,a2,b2,c2,d2)+
        ","+
        Q(col,a3,b3,c3,d3)+
        ")"
      draw2canvas(y1,x1,pixCol);



    }
  }
  if (start){
    scale *= 1.1;
    requestAnimationFrame(update);
  }

}
//sliders
var xsl = document.getElementById("x");
var ysl = document.getElementById("y");
var zsl = document.getElementById("z");
var ssl = document.getElementById("s");
var rsl = document.getElementById("r");
var psl = document.getElementById("p");
var fsl = document.getElementById("f");

xsl.value = cx
ysl.value = cy
zsl.value = 1

update();
xsl.oninput = function(){
  cx = Number(xsl.value)
  update()
}
ysl.oninput = function(){
  cy = Number(ysl.value)
  update()
}
zsl.oninput = function(){
  scale = Number(1.1**zsl.value)
  update()
}
ssl.oninput = function(){
  iter = Number(ssl.value)
  update()
}
rsl.oninput = function(){
  canvas.width = rsl.value;
  canvas.height = rsl.value;
  res = Number(rsl.value)
  v1 = 10 / res
  update()
}
psl.oninput = function(){
  pilings = Number(psl.value)
  update()
}

fsl.oninput = function(){
   c1 = Number(fsl.value)
   c2 = Number(fsl.value)
   c3 = Number(fsl.value)
  update()
}