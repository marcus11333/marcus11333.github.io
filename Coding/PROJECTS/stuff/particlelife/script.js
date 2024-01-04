//makes the syntax more strict so js no longer accepts my bad syntax and so i cant accidentally have global variables
"use strict";

//canvas
const canvas = document.getElementById("life");
const ctx = canvas.getContext("2d");
canvas.width = "500";
canvas.height = "500";

//draw to canvas
function draw2canvas(xPos, yPos, color) {
  ctx.fillStyle = color;
  ctx.fillRect(xPos, yPos, p_size, p_size);
};

let atoms = [];
//initialize an atom
function atom(xPos, yPos, color) {
  return { x: xPos, y: yPos, vx: 0, vy: 0, color: color }
};

//random starting position 
function random() {
  return Math.random() * 400 + 50;
}

//create particles
function create(number, color) {
  let group = [];
  for (let i = 0; i < number; i++) {
    group.push(atom(random(), random(), color));
    atoms.push(group[i]);
  }
  return group;
}

//variables
const rmin = .3;  //attraction related variable
const dt = 1 / 500; //time between each update
const p_count = 500; //number of particles of each color
let rmax = 60; //maximum radius around a particle in which other particles interact with it
const p_size = 2; //size of each particle measured in canvas pixels

//accelerator kernel
function force(dist, a) {
  return (dist < rmin) ? (dist / rmin - 1) : a * (1 - Math.abs(1 + rmin - 2 * dist) / (1 - rmin));
}

let rmax2 = rmax * rmax;

function rule(atoms1, atoms2, g) {
  for (const a of atoms1) {
    let fx = 0;
    let fy = 0;
    for (const b of atoms2) {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d2 = dx * dx + dy * dy
      if (d2 > 0 && d2 < rmax2) {
        const d = Math.sqrt(d2);
        const F = (rmax * force(d / rmax, g)) / d;
        fx += F * dx;
        fy += F * dy;
      }
    }
    a.vx = fx * dt;
    a.vy = fy * dt;
    a.x += a.vx;
    a.y += a.vy;
  }
}


const red = create(p_count, "crimson");
const orange = create(p_count, "darkorange");
const yellow = create(p_count, "gold");
const green = create(p_count, "limegreen");
const blue = create(p_count, "dodgerblue");
const purple = create(p_count, "darkviolet");


const list = [red, orange, yellow, green, blue, purple];
const color_count = list.length;

//initialize attractions array
let attr = new Array(color_count);
for (const x in list) {
  attr[x] = [];
  for (const y in list) {
    attr[x][y] = Math.random() - .5;
  }
}




function update() {
  //update positions and velocities 
  for (const a in list) {
    for (const b in list) {
      rule(list[a], list[b], attr[a][b]);
    }
  }
  //re-draw all particles
  ctx.clearRect(0, 0, 500, 500);
  draw2canvas(0, 0, "black", 500);
  for (const a of atoms) {
    draw2canvas(a.x, a.y, a.color);
  }
  requestAnimationFrame(update);
}

update();

//==============================
const canvas2 = document.getElementById("attr")
const ctx2 = canvas2.getContext("2d");

const attrPixelSize = 20;
const canv2dims = attrPixelSize * (color_count + 1)
canvas2.width = canv2dims;
canvas2.height = canv2dims;

function update_attraction_grid() {
  //a on left b on top
  //display attractions
  for (let a = 0; a < color_count; a++) {
    for (let b = 0; b < color_count; b++) {
      //attraction
      const att = attr[a][b]
      //color
      const color = toRgb((Math.sign(att) + 1) * 50, 1, Math.abs(att))
      //formatted color
      const rgbcol = rgb(
        Math.round(255 * color.red),
        Math.round(255 * color.green),
        Math.round(255 * color.blue)
      )
      ctx2.fillStyle = rgbcol
      ctx2.fillRect(attrPixelSize * (1 + a), attrPixelSize * (1 + b), attrPixelSize, attrPixelSize);

    }
  }
  //display colors
  for (const i in list) {
    ctx2.fillStyle = list[i][0].color
    ctx2.fillRect(0, attrPixelSize + attrPixelSize * i, attrPixelSize, attrPixelSize);
    ctx2.fillRect(attrPixelSize + attrPixelSize * i, 0, attrPixelSize, attrPixelSize);
  }

}


update_attraction_grid()

function toRgb(hue, saturation, value) {
  const d = 0.0166666666666666 * hue;
  let c = value * saturation;
  let x = c - c * Math.abs(d % 2.0 - 1.0);
  const m = value - c;
  c += m;
  x += m;
  switch (d >>> 0) {
    case 0: return { red: c, green: x, blue: m };
    case 1: return { red: x, green: c, blue: m };
    case 2: return { red: m, green: c, blue: x };
    case 3: return { red: m, green: x, blue: c };
    case 4: return { red: x, green: m, blue: c };
  }
  return { red: c, green: m, blue: x };
}

function rgb(r, g, b) {
  return "rgb(" + r + "," + g + "," + b + ")";
}


function btnRando(){
  //redefine attr
  for (const x in list) {
    attr[x] = [];
    for (const y in list) {
      attr[x][y] = Math.random() - .5;
    }
  }
  //update attr visual
  update_attraction_grid()
  rmax = 80;
  rmax2 = rmax * rmax;
}
function btnSnake(){
  //redefine attr
  attr = [
    [1,.5,0,0,0,0],
    [0,1,.5,0,0,0],
    [0,0,1,.5,0,0],
    [0,0,0,1,.5,0],
    [0,0,0,0,1,.5],
    [0,0,0,0,0,1]
  ];
  //update attr visual
  update_attraction_grid()
  rmax = 70;
  rmax2 = rmax * rmax;
}
function btnLinks(){
  //redefine attr
  attr = [
    [2,2,-1,-1,-1,2],
    [2,2,2,-1,-1,-1],
    [-1,2,2,2,-1,-1],
    [-1,-1,2,2,2,-1],
    [-1,-1,-1,2,2,2],
    [2,-1,-1,-1,2,2]
  ]; 
  //update attr visual
  update_attraction_grid()
  rmax = 30;
  rmax2 = rmax * rmax;
}


//shuffle button
function shufflePts(){
  for (const color of list){
    for (const a of color){
      a.x = random()
      a.y = random()
    }
  }
}

let fs = 0;
function fullScreen(){
  if (fs == 1){
    canvas.style.height = "calc( var(--v) *.7)"
    canvas.style.left = "25%"
    canvas.style.top = "calc(56.25vh + 6.25vh)"
  } else {
    canvas.style.height = "100vmin"
    canvas.style.top = "50%"
    canvas.style.left = "50%"
    
  }
  fs = 1 - fs
}

