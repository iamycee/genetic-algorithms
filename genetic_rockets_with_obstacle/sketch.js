// DNA is a set of vectors
// The vectors tell the rocket where to go
// Fitness is how close the rocket gets to it's target


let lifetime; // #frames each population lives
let population;
let lifeCounter; 
let target; // position of target planet
let info;

function setup() {
	createCanvas(640, 360);
	lifetime = height;
	lifeCounter = 0;

	target = createVector(width/2, 24);

	let mutationRate = 0.01;
	population = new Population(mutationRate, 50);

	info = createP("");
	info.position(10, 380);
}

function draw() {

	background(101);

	fill(0);
	stroke(0);
	ellipse(target.x, target.y, 24, 24);

	if (lifeCounter < lifetime){  // generation has not ended yet
		population.live();
		lifeCounter++;
	} else{
		lifeCounter = 0;
		population.fitness();
		population.naturalSelection();
		population.reproduction()
	}

	fill(0);
	info.html("Generation #: " + population.getGenerations() + "<br>" + "Cycles left: " + (lifetime - lifeCounter));

	function mousePressed(){
		target.x = mouseX;
		target.y = mouseY;
	}
}