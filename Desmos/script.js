grid = document.getElementById("grid");

graphs =[
  '9p6a6egdeh', // Monkey
  'ljcovsaj5g', // Shape fitting b-spline
//'v9jcw3kzgh', // Complex fractal renderer
  '4xsds3ahyg', // Burning ship fractal
  'ix38u7zq5g', // Isometric illusion platformer
  'mxpmkjpp5e', // Contest submission donut
  'qxrvynyr85', // Delaunay Triangulation and Voronoi Diagram
  'qqmigtgblg', // Rhombicuboctahedron
  'adjemgfcw6', // Cel shading
  'z3wzwkiim0', // Block Game
//'yubxsdpwtq', // Smiley Face
  'hb2jzrhaou', // Procedural city at night r/Desmos October'22 challenge winner
  'v3giddrhvi', // Desmos Game APCSA Final Project '22'
  'nwwkya9ef9', // Metashape sandbox
  '0j2lsfbyo4', // Spirograph
  '1qugsmrs5k', // Triangle inscription
//'sh6gks0ycr', // Sierpinski Triangle
  '4yupeiswm8', // Particle Life
  'bqsyfpfqqh', // Dragon Fractal
//'r1dfsmrh03', // Mandelbulb
  'ktspueqqah', // Riemann hypothesis Visualization 
  'dsnoobxeet', // Rasterizer
  'nucqhan4xb', // Riemann Zeta Domain Shading
  'mwtp3rnx1p', // Domain Colored Mandelbrot
  'dmnag8ueu6', // Real to complex function transformations
  'ciebmw5kjm', // Smooth shaded mandelbrot
  'gtbu3mjniv', // Ducks fractal
//'clacj5jybd', // Torus knot
//'euluhkblj9', // Draw
  'uoxkjuizcj', // Light sim
  'tqzmpjewmj', // Torus knot
//'i5uqrcpwsz', // Knot
  'ptc2gohz5w', // Jacobi Theta Function
  '5y38htxvef', // Jansens linkage
  'hhlkbarck5', // Buddhabrot
  'rehfgrr4i0', // Terrain Pathfinder
  'saz1eeqkst', // Softbody Sim
  'olcbmylm5m', // Lenia
  'tdfy3xbkyq', // Conways game of life
  'tiqlotmgkw', // Ford circles
  'qtkcetobbl', // Double pendulums
  'zqp3wuw4nw', // Spherical grid projection
  'tfnodfocva', // Ducks Fractal Piling
  '9jzhx72bau', // Mandelbulb
  'zxt00y39wv', // Wythoff Construction
  'fkeqsyk4oj', // Ducks Fractal
  'o72ifubmta', // (5 4 2) hyperbolic tesselation on the poincare disk
  'kmlfgbs4dg', // Wythoff construction on a (5 4 2) hyperbolic tesselation on the poincare disk
  'wyr9tizeca', // Fractal flame
  'gjf2nuztfz'  // Circle packing
  ]

async function grabTitle(hash) {
    let state = await fetch("https://www.desmos.com/calculator/" + hash, {
        headers: {Accept: "application/json"},
        method: "GET"
    });
    state = await state.json();
    return state;
}

let states = [];
for (let hash of graphs) {
    states.push(grabTitle(hash));
}

Promise.all(states).then(loopFunction);

function loopFunction(graphStates){
  var img;
  var link;
  var divider;
  var title;
  for (item in graphs){
    img = new Image();
    img.src = 'https://saved-work.desmos.com/calc_thumbs/production/' + graphs[item] +'.png';
  
    link = document.createElement("a");
    link.href = 'https://www.desmos.com/calculator/' + graphs[item]

    divider = document.createElement("div");
    divider.className = "item"
    title = document.createElement("p");
    title.innerHTML = graphStates[item].title;
  
    link.target = '_blank'
    link.appendChild(img);
    divider.appendChild(link);
    divider.appendChild(title);
    grid.appendChild(divider);
  }

}

