

//definitions
let res = 300;
let scale = 1;
let cx = 2 * Math.random() -1
let cy = -Math.PI * Math.random()
let iter = 30;

//other
let v1 = 10 / res
//math constants
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

function Q(t,d) {
  const c = .5 + Math.cos(tau * (t+d)) * .5;
  return (255 * c) << 0
}


//main
function update(){
  for (let x1 = 0; x1 < res; x1++){
    for (let y1 = 0; y1 < res; y1++){
      const x00 = x1 * v1  - 5;
      const y00 = y1 * v1 - 5;
      let x0 = x00 / scale
      let y0 = y00 / scale
      let Hx = 0
      let Hy = 0
      let col0 = 0
      let colc = 0
      for(i = 1; i <= iter; i++){
        const xtemp = Math.log(Math.sqrt(x0*x0+y0*y0)) + cx
        y0 = Math.atan2(Math.abs(y0),x0) + cy
        x0 = xtemp
        if (i % 6 == 0){
          col0+=(2 / Math.PI) * Math.atan(Math.sqrt(x0*x0+y0*y0))
          colc+=1
        }
      }

      const col = col0/colc
      const pixCol = "rgb("+Q(col,0)+","+Q(col,.1)+","+Q(col,.2)+")"
      draw2canvas(y1,x1,pixCol);



    }
  }
  //scale *= 1.1;
  //requestAnimationFrame(update);
}
//sliders
var xsl = document.getElementById("x");
var ysl = document.getElementById("y");
var zsl = document.getElementById("z");
var ssl = document.getElementById("s");
var rsl = document.getElementById("r");

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