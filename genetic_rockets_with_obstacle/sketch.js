// DNA is a set of vectors
// The vectors tell the rocket where to go
// Fitness is how close the rocket gets to it's target


let lifetime; // #frames each population lives
let population;
let lifecycle; //timer for cycles of generation
let recordtime;
let target; // position of target planet
let info;
let obstacles = [];

function setup() {
	createCanvas(640, 360);
	lifetime = 300;

	target = new Obstacle(width / 2 - 12, 24, 24, 24);

	let mutationRate = 0.01;
	population = new Population(mutationRate, 50);

	obstacles = [];
	obstacles.push(new Obstacle(width / 2 - 100, height / 2, 200, 10));

	info = createP("");
	info.position(10, 380);
}

function draw() {

	background(127);

	target.display();

	fill(0);
	stroke(0);
	ellipse(target.x, target.y, 24, 24);

	if (lifecycle < lifetime){  // generation has not ended yet
		population.live(obstacles);
		if (population.targetReached() && (lifecycle < recordtime)){
			recordtime = lifecycle;
		}
	} else{
		lifecycle = 0;
		population.fitness();
		population.naturalSelection();
		population.reproduction()
	}


	for (let i = 0; i < obstacles.length; i++){
		obstacles[i].display();
	}

	fill(0);
	text("Generation #: " + population.getGenerations(), 10, 18);
	text("Cycles left: " + (lifetime - lifecycle), 10, 36);
    text("Record cycles: " + recordtime, 10, 54);



	function mousePressed(){
		target.x = mouseX;
		target.y = mouseY;
		recordtime = lifetime;
	}
}