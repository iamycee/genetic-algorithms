function setup() {
	createCanvas(1080, 720);
	v = new Vehicle(width / 2, height / 2);
}

function draw() {
	background(0, 0, 50);

	let mouse = createVector(mouseX, mouseY);
	
	fill('rgb(0, 100, 100)');
	stroke(200);
	strokeWeight(2);
	ellipse(mouse.x, mouse.y, 48, 48); //draw an ellipse at mouse location

	v.seek(mouse);
	v.update();
	v.display();

}

