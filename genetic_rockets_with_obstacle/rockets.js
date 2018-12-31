//This class defines the structure and function of the rockets

class Rocket{   
    constructor(loc, dna){
        //physics
        this.acceleration = createVector();
        this.velocity = createVector();
        this.position = loc;    //location of rocket, copies the vector passed when the rocket object is instantiated

        this.r = 4;   //radius
        this.fitness = 0;
        this.dna = dna;

        this.geneCounter = 0;
        this.hitTarget = false; //has the target planet been reached   
    }
    //every member of population needs a fitness function
    calcFitness(){
        let d = dist(this.position.x, this.position.y, target.x, target.y);
        this.fitness = 1/d;  //can square this   
    }

    run(){
        this.checkTarget(); //target reached?
        if (!this.hitTarget){
            this.applyForce(this.dna.genes[this.geneCounter]);  //add acceleration to that geneLoc
            this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
            this.update();
        }
        this.display();
    }

    checkTarget(){
        let d = dist(this.position.x, this.position.y, target.x, target.y);
        if (d < 12){
            this.hitTarget = true;
        }
    }

    applyForce(f){
        this.acceleration.add(f);
    }

    update(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);  //once vel and position changes, acc. .becomes zero
    }

    display(){
        let theta = this.velocity.heading() + PI/2;    //veloccity vector direction
        let r = this.r;
        stroke(0);
        push();
        translate(this.position.x, this.position.y);  //position vector components
        rotate(theta); 
        
        //Thrusters
        rectMode(CENTER);
        fill(0);
        rect(-r/2, r*2, r/2, r);  // Draw a rectangle at location (-r/2, r*2) with a width and height of r/2, r.

        rect(r/2, r*2, r/2, r);
        
        //Rocket Body
        fill(255);
        beginShape(TRIANGLES);
        vertex(0, -r * 2);
        vertex(-r, r * 2);
        vertex(r, r * 2);
        endShape(CLOSE);
        
        pop();
    }

    getFitness() {
      return this.fitness;
    }

    getDNA() {
      return this.dna;
    }

}// Rocket class end