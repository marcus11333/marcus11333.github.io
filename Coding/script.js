grid = document.getElementById("grid");

const titles = [
  "Particle Life",
  "Mandelbrot Fractal",
  "Fractal Flame",
  "Ducks Fractal",
  "Desmos Multiplayer (not currently working)",
  "Album Review Creator",
  "n-Length Wordle",
  "Particle Life but in Python",
  "Slime Mold Simulation",
  "Metaballs",
  "Image to ASCII art",
  "Reaction-Diffuse Algorithm",
  "Buddhabrot Fractal",
  "Reaction-Diffuse Image"
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
  JS,
  HTML+" "+CSS+" "+JS,
  JS
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
  "reaction",
  "buddha",
  "rdimage"
]
const links = [
  "PROJECTS/particle/index.html",
  "PROJECTS/mandelbrot/index.html",
  "PROJECTS/flame/index.html",
  "PROJECTS/duck/index.html",
  "PROJECTS/desmos/index.php",
  "https://replit.com/@marcus11333/albumreview?v=1", //
  "https://replit.com/@marcus11333/Wordle?v=1", //
  "https://replit.com/@marcus11333/pythonparticle?v=1", //
  "PROJECTS/slime/index.html",
  "PROJECTS/ball/index.html",
  "https://replit.com/@marcus11333/ASCII?v=1", //
  "PROJECTS/reaction/index.html",
  "PROJECTS/buddha/index.html",
  "PROJECTS/rdimage/index.html"
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
