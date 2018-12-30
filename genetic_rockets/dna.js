

class DNA{
    constructor(newgenes){
        if (arguments.length > 0){
            this.genes = newgenes;
        } else{
            this.genes = [];
            this.maxForce = 0.1;
            for (let i = 0; i < lifetime; i++){
                let angle = random(TWO_PI);
                this.genes[i] = p5.Vector.fromAngle(angle);
                this.genes[i].mult(random(0, this.maxForce));
            }
        }
    }

    crossover(partner){
        let child = [];
        
        let crossover = floor(random(this.genes.length));
        //note: this is not  midpoint based strategy
        for (let i = 0; i < this.genes.length; i++){
            if (i > crossover) child[i] = this.genes[i];
            else child[i] = partner.genes[i];
        }

        let newgenes = new DNA(child);
        return newgenes;
    }

    mutate(m){
        for(let i = 0; i < this.genes.length; i++){
            if  (random(1) < m){  
                let angle = random(TWO_PI);
                this.genes[i] = p5.Vector.fromAngle(angle);
                this.genes[i].mult(random(0, this.maxForce))
            }
        }
    }


}// DNA class end