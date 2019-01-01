class Vehicle{
    constructor(x, y){
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, -2);
        this.position = createVector(x, y);
        this.r = 4;
        this.maxspeed = 8;
        this.maxforce = 0.2;
    }

    update(){
        this.velocity.add(this.acceleration); //increase
        this.velocity.limit(this.maxspeed); //limit
        this.position.add(this.velocity);
        this.acceleration.mult(0); 
    }

    applyForce(force){
        this.acceleration.add(force);
    }

    seek(target){
        var desired = p5.Vector.sub(target, this.position);  //desired location vector points in the direction of target
        desired.setMag(this.maxspeed);

        //steering_direction = desired - velocity
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        
        this.applyForce(steer);
    }

    display(){
        var theta = this.velocity.heading() + PI / 2;
        fill('red');
        stroke(100);
        strokeWeight(1);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 3);
        vertex(-this.r, this.r * 3+25);
        vertex(this.r, this.r * 3+25);
        endShape(CLOSE);
        pop();   
    }
}