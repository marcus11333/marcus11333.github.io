//const zoom_x = -0.5274030411175556;
//const zoom_y = -0.663931210594343;

//const zoom_x = -1.941576642
//const zoom_y = -0.000152914

const zoom_x = -1.768778833
const zoom_y = -0.001738996

//definitions
const res = 300;

let scale = 1;
let angle = 0;
const max_iter = 500;
//other
const v1 = 4 / res
//math constants
const tau = 2 * Math.PI;
const ln2 = Math.LN2

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


//prebake pixel distances and angles
const distances = Array(res).fill().map(() => Array(res).fill(0));
const angles = Array(res).fill().map(() => Array(res).fill(0));

for (let x1 = 0; x1 < res; x1++){
  for (let y1 = 0; y1 < res; y1++){
    let x = x1 * v1  - 2;
    let y = y1 * v1 - 2;
    distances[x1][y1] = Math.sqrt(x*x + y*y)
    angles[x1][y1] = Math.atan2(y,x)
  }
}

function update(){
  for (let x1 = 0; x1 < res; x1++){
    for (let y1 = 0; y1 < res; y1++){
      const theta = angles[x1][y1]
      const dist = distances[x1][y1]
      const x0 = Math.cos(theta + angle) * dist / scale + zoom_x;
      const y0 = Math.sin(theta + angle) * dist / scale + zoom_y;
      let x = 0;
      let y = 0;
      let iter = 0;
      let x2 = 0;
      let y2 = 0;
      while (x2 + y2 <= 4 && iter < max_iter){
        y = (x + x) * y + y0;
        x = x2 - y2 + x0
        x2 = x*x
        y2 = y*y
        iter++;
      }
      if (iter < max_iter){
        //update 2 more times
        y = (x + x) * y + y0;
        x = x2 - y2 + x0
        x2 = x*x
        y2 = y*y
        y = (x + x) * y + y0;
        x = x2 - y2 + x0
        //smooth
        const mod =  x*x + y*y
        const mu = iter + 3 - Math.log(.5 * Math.log(mod) ) / ln2;
        const v = mu / 10
        const pixCol = "rgb("+Q(v,0)+","+Q(v,.3333)+","+Q(v,.6666)+")"
        draw2canvas(x1,y1,pixCol);
      } else {
        const pixCol = "black";
        draw2canvas(x1,y1,pixCol);
      }


    }
  }
  scale *= 1.1;
  angle += .02;
  requestAnimationFrame(update);
}

update();