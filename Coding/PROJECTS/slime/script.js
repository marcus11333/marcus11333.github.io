/*
Based off of:
- https://sagejenson.com/physarum
- https://uwe-repository.worktribe.com/output/980579
*/

// setup
const agents = [];
let trail; 
let regenerateNext = true;

let canvas;
let W = 600;
let H = 600;
const MAX_AGENTS = 100000;
const MIN_AGENTS = 5000;



// base settings
const settings = {
	sensor_distance: 9, //SO
	sensor_angle: 22.5/180*Math.PI, //SA
	turning_speed: 45/180*Math.PI, //RA
	speed: 3, //SS
	decay_factor: 0.8,
	deposit_amount: 0.6,
	num_agents: 25000,
}


// Utils
function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Main step function
function step(agents, trail, width, height) {
	// FIRST PASS
	function index(x, y) {
		return x + y * width;
	}

	// STEP 1: Sense and rotate
	for (let agent of agents) {
		// returns the trail value at a certain angle + distance away from the current agent.
		function senseNeighborsAt(theta) {
			return trail [
					index(
						Math.round(agent.x + Math.cos(agent.heading + theta) * settings.sensor_distance),
						Math.round(agent.y + Math.sin(agent.heading + theta) * settings.sensor_distance)
					)
			];
		}

		const FL   = senseNeighborsAt(settings.sensor_angle);
		const F = senseNeighborsAt(0);
		const FR  = senseNeighborsAt(-settings.sensor_angle);
    const RA = settings.turning_speed
    const SS = settings.speed
    
		if (F > FL && F > FR) {
			// no change
		} else if (FL > FR) {
			agent.heading += RA;
		} else if (FR > FL) {
			agent.heading -= RA;
		} else {
			agent.heading += Math.round(Math.random() * 2 - 1) * settings.turning_speed;
		}

		// STEP 2: Move
		agent.x += SS * Math.cos(agent.heading);
		agent.y += SS * Math.sin(agent.heading);
		
		// wrap the values on the edges
		agent.x = (agent.x + width) % width;
		agent.y = (agent.y + height) % height;

		// STEP 3: Deposit trail
		const x = Math.round(agent.x);
		const y = Math.round(agent.y);

		const distToCenter = Math.round(Math.sqrt((x-W/2)**2+(y-H/2)**2))
		
		// ignore agents on the edge
		if (distToCenter > W/2 || x <= 0 || y <= 0 || x >= width-1 || y >= height-1) { continue; }
		  trail[index(x, y)] += settings.deposit_amount;
	}
	
	// SECOND PASS
	// STEP 4: Diffuse and Decay
	for (let y=1; y < height-1; y++) {
		for (let x=1; x < width-1; x++) {			
			//average cells in Moore neighborhood
			const diffused_value = (
				trail[index(x-1, y-1)] +
				trail[index(x, y-1)] 	 +
				trail[index(x+1, y-1)] +
				trail[index(x-1, y)] 	 +
				trail[index(x, y)] 		 +
				trail[index(x+1, y)] 	 +
				trail[index(x-1, y+1)] +
				trail[index(x, y+1)] 	 +
				trail[index(x+1, y+1)]
			)/9;

			trail[index(x, y)] = Math.min(1.0, diffused_value * settings.decay_factor);
		}
	}

	return trail;
}

function render(trail, agents) {
	canvas.loadPixels();
	// Updating pixel values with just a 1.0 pixel density
	for(let i = 0; i < W*H; i++) {
		const brightness = Math.floor(trail[i] * 255);
		const idx = i*4;
		// pixels is a flat array where every pixel is 4 spots in a row
    //CornflowerBlue
		canvas.pixels[idx]   = brightness * 100/255 // r
		canvas.pixels[idx+1] = brightness * 149/255 // g
		canvas.pixels[idx+2] = brightness * 237/255// b
		canvas.pixels[idx+3] = 255; 			 // a
	}
  canvas.updatePixels();
}

function regenerate() {
		agents.splice(0,agents.length); // empty list
		for (let i=0; i<settings.num_agents; i++) {
			agents.push({
				x: Math.random() * W,
				y: Math.random() * H,
				heading: Math.random() * 2 * Math.PI, // radians
			});
		}
		regenerateNext = false;
}

function reset() {
  trail = new Float32Array(W * H);
  regenerate();
}

function randomSim() { //randomize settings
	settings.sensor_distance =  getRandomBetween(10,100);
	settings.sensor_angle = getRandomBetween(0.5, Math.PI); // radians
	settings.turning_speed = getRandomBetween(0.5, Math.PI); // radians
	settings.speed = getRandomBetween(5,20);
	settings.decay_factor = getRandomBetween(0.5,1);
	settings.deposit_amount = getRandomBetween(0.5,1);
	//settings.num_agents = getRandomBetween(MIN_AGENTS,MAX_AGENTS);
	reset();
}

function setup() {
  createCanvas(W,H);
  canvas = createGraphics(W,H);
  canvas.pixelDensity(1);

	// Setup empty trail
	trail = new Float32Array(W * H);

	// GUI 
	let gui = new dat.GUI();
  gui.add(settings, 'sensor_distance', 1, 100).listen()
  gui.add(settings, 'sensor_angle', 0,PI).listen()
  gui.add(settings, 'turning_speed', 0,PI).listen()
  gui.add(settings, 'speed', 1,20).listen()
  gui.add(settings, 'decay_factor', 0, 1).listen()
  gui.add(settings, 'deposit_amount', 0,1).listen()
  gui.add(settings, 'num_agents', MIN_AGENTS,MAX_AGENTS).listen()

  let resetButton = { reset: function () { reset(); } }
  gui.add(resetButton, 'reset');

	let randomButton = { random: function () { randomSim(); } }
  gui.add(randomButton, 'random');
}

function draw() {
  background(0);
  if (regenerateNext) { regenerate(); }
  trail = step(agents, trail, W, H);
  render(trail, agents);
  image(canvas,0,0, width, height);
}