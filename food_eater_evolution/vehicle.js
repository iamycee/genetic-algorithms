
function Vehicle(x, y, dna){

    this.acceleration = createVector();
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r = 3;
    this.maxforce = 0.5;
    this.maxspeed = 1;
    this.velocity.setMag(this.maxspeed);

    if (dna instanceof Array){
        this.dna = [];
        for (var i = 0; i < dna.length; i++){
            if (random(1) < 0.1){
                if (i < 2){
                    // adjust the steering force weights
                    this.dna[i] = dna[i] + random(-0.2, 0.2);
                }
                else{
                    this.dna[i] = dna[i];
                }
            }
        }
    } else{
    var maxf_food = 3;  //more attracted to food
    var maxf_poison = 1;  //less attracted to poison
    // DNA
    // 0: Attraction/Repulsion to food
    // 1: Attraction/Repulsion to poison
    // 2: Radius to sense food
    // 3: Radius to sense poison
    this.dna = [random(-maxf_food, maxf_food), random(-maxf_poison, maxf_poison), random(5, 100), random(5, 100)];
}
this.health = 1;

}// Vehicle class end

Vehicle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    //negative health if you dont eat
    this.health -= 0.001;
};

Vehicle.prototype.dead = function(){
    return (this.health < 0);
}

Vehicle.prototype.birth = function(){
    var  r = random(1);
    //0.1 percent chance of new birth
    if (r < 0.001){
        return new Vehicle(this.position.x, this.position.y, this.dna);
    }
}

//index 0 for food, index 1 for poison
Vehicle.prototype.eat = function(list, index){

    var closest = null;
    var closestD = Infinity;  //this is a preset constant in JS

    for (var i = list.length - 1; i >= 0; i--){
        var d = p5.Vector.dist(list[i], this.position);  //distance to food/poison

        if (d < this.dna[2 + index] && d < closestD){
            closestD = d;
            closest = list[i];

            if (d <  5){  //eat it if distance is less than 5 px.
                list.splice(i, 1);
                this.health += nutrition[index];
            }
        }
    }

    if (closest){  //move towards closest
        var seek = this.seek(closest, index);
        seek.mult(this.dna[index]);  //weight the seek intensity by DNA
        seek.limit(this.maxforce);
        this.applyForce(seek);
    } 
}// eat end

Vehicle.prototype.applyForce = function(force){
    this.acceleration.add(force);
}

//SEEK algorithm
Vehicle.prototype.seek = function(target, index){
    
    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    var d = desired.mag();

    desired.setMag(this.maxspeed);

    var steer = p5.Vector.sub(desired, this.velocity);

    return steer; //gives steering direction

}

Vehicle.prototype.display = function() {
    var green = color(0, 255, 0);
    var red = color(255, 0, 0);
    var col = lerpColor(red, green, this.health);  //change color acc to health. Green for healthy, Red for unhealthty

    var theta = this.velocity.heading() + PI/2;
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    //Vehicle
    fill(col);
    stroke(col);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();  
}
//to keep the  vehicle on screen
Vehicle.prototype.boundaries = function(){
    var d = 10;
    var desired = null;

    if (this.position.x < d){
        desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - d){
        desired = createVector(-this.maxspeed,  this.velocity.y);
    }

    if (this.position.y < d){
        desired = createVector(this.vector.x, this.maxspeed);
    } else if (this.position.y > height - d){
        desired = createVector(this.velocity.x, -this.maxspeed);
    }

    if(desired != null){
        desired.setMag(this.maxspeed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }
}
