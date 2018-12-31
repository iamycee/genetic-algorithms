//This class defines the structure and function of the rockets

class Rocket{   
    constructor(loc, dna, totalRockets){
        //physics
        this.acceleration = createVector();
        this.velocity = createVector();
        this.position = loc;    //location of rocket, copies the vector passed when the rocket object is instantiated

        this.r = 4;   //radius
        this.fitness = 0;
        this.dna = dna;
        this.finishTime = 0;
        this.recordDist = 10000;
        this.geneCounter = 0;
        this.hitObstacle = false;
        this.hitTarget = false; //has the target planet been reached   
    }
    //every member of population needs a fitness function
    calcFitness(){
        if (this.recordDist < 1) this.recordDist = 1;   
        
        //reward finishing faster and getting closer
        this.fitness (1 / this.finishTime * this.recordDist);

        this.fitness = pow(this.fitness, 4);

        if (this.hitObstacle) this.fitness *= 0.1;  // reduce fitness if obstacle is  hit
        if (this.hitTarget) this.fitness *=2; // double the fitness if you finish
    }

    run(os){
        if (!this.hitObstacle && !this.hitTarget){
            this.applyForce(this.dna.genes[this.geneCounter]);
            this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
            this.update();
            
            this.obstacles(os);
        }

        if(!this.hitObstacle){
            this.display();
        }
    }

    checkTarget(){
        let d = dist(this.position.x, this.position.y, target.x, target.y);
        if (d < this.recordDist) this.recordDist = d;

        if (target.contains(this.position) && !this.hitTarget){
            this.hitTarget = true;
        } else if (!this.hitTarget) {
                this.finishTime++;
            }
 
    }

    obstacles(os){
        for (let i = 0; i < os.length; i++){
            let obs = os[i];
            if (obs.contains(this.position)){
                this.hitObstacle =  true; 
            }
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