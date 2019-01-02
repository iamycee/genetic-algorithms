var population = [];

var food = [];
var poison = [];
var nutrition = [0.1, -1];
var debug;


function setup() {
	createCanvas(windowWidth, windowHeight);
	
	angleMode(RADIANS);
	for(var i = 0; i < 10; i++){
		population[i] = new Vehicle(random(width), random(height));  //create 100 vehicles at random locations
	}
	for (var i = 0; i < 25	; i++){
		poison[i] = createVector(random(width), random(height));
	}
	for (var i = 0; i < 100; i++){
		food[i] = createVector(random(width), random(height));
	}
}

function mouseDragged(){
	population.push(new Vehicle(mouseX, mouseY));
}

function draw() {
	background(0);

	//10 percent of new food
	if (random(1) < 0.1){
		food.push(createVector(random(width), random(height)));
	}

	//1 percent chance of new poison
	if (random(1) < 0.01){
		poison.push(createVector(random(width), random(height)));
	}

	for (var i = population.length - 1; i >= 0; i--){
		var v = population[i];

		v.eat(food, 0);
		v.eat(poison, 1);
		v.boundaries();
		//update and draw
		v.update();
		v.display();

		if (v.dead()){
			population.splice(i, 1);
		}else{
			var child = v.birth();
			if(child != null){
				population.push(child);
			}
		}

	}

	for (var i = 0; i < food.length; i++){
		fill(0, 255, 0);  //green food
		noStroke();
		ellipse(food[i].x, food[i].y, 4);
	}
	
	for (var i = 0; i < poison.length; i++) {
		fill(255, 0, 0);  //red poison
		noStroke();
		ellipse(poison[i].x, poison[i].y, 4);
	}
}


