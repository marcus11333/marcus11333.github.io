

//definitions
const res = 200;
let scale = 1;
let cx = 2 * Math.random() -1
let cy = -Math.PI * Math.random()
let iter = 30;
//other
const v1 = 10 / res
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
  const c = .5 + Math.cos(4 * tau * (t+d)) * .5;
  return (255 * c) << 0
}


//main
function rotate(x,y){
  const theta = Math.atan2(y,x)
  const dist = Math.sqrt(x*x + y*y)
  return {
    x: Math.cos(theta + angle) * dist,
    y: Math.sin(theta + angle) * dist
  }
}

function update(){
  for (let x1 = 0; x1 < res; x1++){
    for (let y1 = 0; y1 < res; y1++){
      const x00 = x1 * v1  - 5;
      const y00 = y1 * v1 - 5;
      let x0 = x00 / scale
      let y0 = y00 / scale
      let Hx = 0
      let Hy = 0

      for(i = 1; i <= iter; i++){
        const xtemp = Math.log(Math.sqrt(x0*x0+y0*y0)) + cx
        y0 = Math.atan2(Math.abs(y0),x0) + cy
        x0 = xtemp
      }

      const col = (2 / Math.PI) * Math.atan(Math.sqrt(x0*x0+y0*y0))
      const pixCol = "rgb("+Q(col,0)+","+Q(col,.3333)+","+Q(col,.6666)+")"
      draw2canvas(y1,x1,pixCol);



    }
  }
  scale *= 1.1;
  requestAnimationFrame(update);
}

update();