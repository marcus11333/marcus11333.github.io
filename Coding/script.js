grid = document.getElementById("grid");

const titles = [
  "Particle Life",
  "Mandelbrot Fractal",
  "Fractal Flame",
  "Ducks Fractal",
  "Desmos Multiplayer",
  "Album Review Creator",
  "n-Length Wordle",
  "Particle Life but in Python",
  "Slime Mold Simulation",
  "Metaballs",
  "Image to ASCII art",
  "Ducks Fractal Piling",
  "Reaction-Diffuse Algorithm",
  "Buddhabrot Fractal"
]


const JAVA = "<i class=\"fa-brands fa-java fa-2x\"></i>"
const JS = "<i class=\"fa-brands fa-js fa-2x\"></i>"
const HTML = "<i class=\"fa-brands fa-html5 fa-2x\"></i>"
const PYTHON = "<i class=\"fa-brands fa-python fa-2x\"></i>"
const RUST = "<i class=\"fa-brands fa-rust fa-2x\"></i>"
const PHP = "<i class=\"fa-brands fa-php fa-2x\"></i>"
const CSS = "<i class=\"fa-brands fa-css3 fa-2x\"></i>"

const languages = [
  HTML+" "+CSS+" "+JS,
  HTML+" "+CSS+" "+JS,
  HTML+" "+CSS+" "+JS,
  HTML+" "+CSS+" "+JS,
  PHP+" "+CSS+" "+JS,
  PYTHON,
  PYTHON,
  PYTHON,
  HTML+" "+CSS+" "+JS,
  HTML+" "+CSS+" "+JS,
  PYTHON,
  HTML+" "+CSS+" "+JS,
  JS,
  HTML+" "+CSS+" "+JS
]

for (i in titles){
  titles[i] += "<br>" + languages[i]
}


const imageurls = [
  "particle",
  "mandelbrot",
  "flame",
  "duck",
  "desmos",
  "album",
  "wordle",
  "particle",
  "slime",
  "ball",
  "ascii",
  "piling",
  "reaction",
  "buddha"
]
const links = [
  "PROJECTS/stuff/particlelife/index.html",
  "PROJECTS/stuff/mandelbrot/index.html",
  "PROJECTS/stuff/fractalflame/index.html",
  "PROJECTS/stuff/ducksfractal/index.html",
  "PROJECTS/stuff/desmos_multiplayer/index.php",
  "https://replit.com/@marcus11333/albumreview?v=1", //
  "https://replit.com/@marcus11333/Wordle?v=1", //
  "https://replit.com/@marcus11333/pythonparticle?v=1", //
  "PROJECTS/stuff/slime/index.html",
  "PROJECTS/stuff/metaballs/index.html",
  "https://replit.com/@marcus11333/ASCII?v=1", //
  "PROJECTS/stuff/ducks2/index.html",
  "PROJECTS/stuff/reaction_diffusion/index.html",
  "PROJECTS/stuff/buddha/index.html"
]

for (i in titles){
  img = new Image();
  img.src = "IMAGES/" + imageurls[i] + ".png"
  
  link = document.createElement("a");
  link.href = links[i]
  
  divider = document.createElement("div");
  divider.className = "item"
  title = document.createElement("p");
  title.innerHTML = titles[i];
  
  link.target = '_blank'
  link.appendChild(img);
  divider.appendChild(link);
  divider.appendChild(title);
  grid.appendChild(divider);

}
