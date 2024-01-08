//preload image
let img;
function preload() {
  img = loadImage('img.jpeg');
}

// Constants
let f = .055
let k = .062
const Da = 1.0
const Db = 0.4
const dt = 1.0
const reso = 1200

// Setup Arrays
let A = Array(reso)
let B = Array(reso)
let newa = Array(reso)
let newb = Array(reso)
for (let i = 0 ; i < reso; i++) {
  A[i] = []
  B[i] = []
  newa[i] = []
  newb[i] = []
  for (let j = 0; j < reso; j++) {
    A[i][j] = 1
    B[i][j] = (Math.random() <.01)? 1 : 0
    newa[i][j] = 0
    newb[i][j] = 0
  }
}

let imgArr = Array.from(Array(reso), () => new Array(reso).fill(0));

function setup(){
  //constants
  
  let canv = createCanvas(reso,reso)
  canvas = createGraphics(reso,reso);
  canvas.pixelDensity(1);
  canv.style('width', '70vmin');
  canv.style('height', '70vmin');
  //frameRate(60)

  //
  image(img, 0, 0);
  for (i=0;i<reso;i++){
    for (j=0;j<reso;j++){
      imgArr[i][j] = img.get(i,j)[0]
    }
  }
  //
  
}




function render() {
  canvas.loadPixels();
  for (let x=1;x<reso-1;x++){
    for (let y=1;y<reso-1;y++){
      let br = 2 * newb[x][y] * 255
      const idx = (reso*y+x)*4
      //const idx = (2*reso*(2*y)+(2*x))*4
      canvas.pixels[idx] = br
      canvas.pixels[idx+1] = br
      canvas.pixels[idx+2] = br
      canvas.pixels[idx+3] = 255
      
    }
  }
  canvas.updatePixels();
}

//update
function update(){
  for (let x=1;x<reso-1;x++){
    for (let y=1;y<reso-1;y++){
      const a = A[x][y]
      const b = B[x][y]
      //neighbor weighting
      const Ga = (
        A[x-1][y]*.2+
        A[x+1][y]*.2+
        A[x][y-1]*.2+
        A[x][y+1]*.2+
        A[x-1][y-1]*.05+
        A[x-1][y+1]*.05+
        A[x+1][y-1]*.05+
        A[x+1][y+1]*.05-
        a
      )
      const Gb = (
        B[x-1][y]*.2+
        B[x+1][y]*.2+
        B[x][y-1]*.2+
        B[x][y+1]*.2+
        B[x-1][y-1]*.05+
        B[x-1][y+1]*.05+
        B[x+1][y-1]*.05+
        B[x+1][y+1]*.05-
        b
      )
      //===
      f = .01 + (imgArr[x][y]/255) * .08
      //k = .055 + (imgArr[x][y]/255) * .02

      newa[x][y] = a + (Da*Ga-a*b*b+f*(1-a))*dt
      newb[x][y] = b + (Db*Gb+a*b*b-(k+f)*b)*dt
      
    }
  }
  A = newa
  B = newb
}





function draw(){
  update()
  update()
  update()
  render()
  image(canvas,0,0, width, height)
}