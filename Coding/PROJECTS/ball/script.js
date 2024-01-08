const RES = 400
const BALLS = 10
const THRESHOLD = .08
const DT = .7

const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");
canvas.width = RES.toString()
canvas.height = RES.toString()
ctx.fillStyle = "black"


//initiat metaball positions and velocities
m_x = Array.from({length: BALLS}, () => RES * Math.random() );
m_y = Array.from({length: BALLS}, () => RES * Math.random() );

m_vx = Array.from({length: BALLS}, () => 2 * Math.random() -1 );
m_vy = Array.from({length: BALLS}, () => 2 * Math.random() -1 );

function f(x,y){
  v = 0
  for (a=0; a<BALLS; a++){
    x0 = m_x[a]
    y0 = m_y[a]
    v += 1 / Math.sqrt( (x-x0)**2 + (y-y0)**2 )
    if (v>=THRESHOLD){continue}
  }
  
  return v
}




//
function update(){
  //
  ctx.clearRect(0, 0, RES, RES);
  for (x=0; x<RES; x++){
    for (y=0; y<RES; y++){
      if ( f(x,y) >= THRESHOLD ){
        ctx.fillRect(x, y, 1, 1);
      }
      
    }
  }

  
  for (a=0; a<BALLS; a++){
    m_x[a] += m_vx[a]*DT
    m_y[a] += m_vy[a]*DT

    if (m_x[a] < 0){m_vx[a] *= -1}
    if (m_x[a] > RES){m_vx[a] *= -1}

    if (m_y[a] < 0){m_vy[a] *= -1}
    if (m_y[a] > RES){m_vy[a] *= -1}
  }


  
  
  requestAnimationFrame(update)
}

update()