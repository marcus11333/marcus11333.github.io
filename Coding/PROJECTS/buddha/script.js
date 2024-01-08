const res = 500
const max_iter = 100;
//other
let v1 = res/4
let v2 = 2 * v1
//canvas
const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");
canvas.width = res.toString();
canvas.height = res.toString();

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.globalAlpha = .02

//functions
function hsv2rgb(h,s,v){                              
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  return [255*f(5),255*f(3),255*f(1)];       
}

function draw2canvas(xPos, yPos, color) {
  ctx.fillStyle = color;
  ctx.fillRect(xPos, yPos, 1, 1);
}
function color(x,y){
  const arg = Math.atan2(y,x)
  const hue = arg/(2*Math.PI) + .5
  const rgb = hsv2rgb(360*hue,1,1)
  return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")"
}

Xlist = []
Ylist = []

function q(x0,y0){
  let x = 0
  let y = 0
  let iter = 0
  let x2 = 0;
  let y2 = 0;
  while (iter < max_iter){
    y = (x + x) * y + y0;
    x = x2 - y2 + x0
    x2 = x*x
    y2 = y*y
    iter++;
  }
  if (x2 + y2 > 4){
    Xlist.push(x0)
    Ylist.push(y0)
  }
}

function update(){
  Xlist = []
  Ylist = []
  while(Xlist.length < 20){
    let x0 = 4 * Math.random() - 2
    let y0 = 4 * Math.random() - 2
    q(x0,y0)
  }

  

  for (i in Xlist){
    let x = 0
    let y = 0
    let iter = 0
    let x2 = 0;
    let y2 = 0;
    while (iter < max_iter){
      y = (x + x) * y + Ylist[i]
      x = x2 - y2 + Xlist[i]
      x2 = x*x
      y2 = y*y
      iter++;
      draw2canvas(
        y*v1 + v2,
        x*v1 + v2,
        color(Xlist[i],Ylist[i])
      )
    }
  }

  requestAnimationFrame(update)
}

update()