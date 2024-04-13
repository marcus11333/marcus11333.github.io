


// Constants
const s = {
  f: .055,
  k: .062
}
//s.f = .0367
//s.k = .0649

const Da = 1.0
const Db = 0.5
const dt = 1.0
const reso = 500
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
    B[i][j] = (Math.random() <.05)? 1 : 0
    //if ( ((100-i)**2+(100-j)**2)<2 ){B[i][j]=1}
    if ( ((reso/2-i)**2+(reso/2-j)**2)>100*100 ){B[i][j]=0}
    newa[i][j] = 0
    newb[i][j] = 0
  }
}

let sliderk
let sliderf

function setup(){
  //constants
  
  let canv = createCanvas(reso,reso)
  canvas = createGraphics(reso,reso);
  canvas.pixelDensity(1);
  canv.style('width', '80vmin');
  canv.style('height', '80vmin');
  //frameRate(60)
  

  let gui = new dat.GUI();
  gui.add(s, 'f', .01, .1).listen()
  gui.add(s, 'k', .045, .07).listen()
}



function render() {
  canvas.loadPixels();
  for (let x=1;x<reso-1;x++){
    for (let y=1;y<reso-1;y++){
      let br = (
        newb[x+1][y]+
        newb[x+1][y+1]+
        newb[x][y+1]-
        newb[x-1][y]-
        newb[x-1][y-1]-
        newb[x][y-1]+
        newb[x][y]
      ) * 255
      
      
      
      
      
      
      const idx = (reso*y+x)*4
      //const idx = (2*reso*(2*y)+(2*x))*4
      canvas.pixels[idx]   = 0
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
      newa[x][y] = a + (Da*Ga-a*b*b+s.f*(1-a))*dt
      newb[x][y] = b + (Db*Gb+a*b*b-(s.k+s.f)*b)*dt
      
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
  image(canvas,0,0, width, height);
}








