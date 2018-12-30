// This is a class to describe DNA. 
// Every problem will have their DNA modelled in a dofferent way.
// In this case, we model it as an array of characters

// functions in this class include:
//

//generate random character

let num;   
function newChar() {
    let c = floor(random(48, 123));
    if (c === 63) c = 32; //replace ? with (space)
    if (c === 64) c = 46; //replace @ with .
    if (c === 94) c = 44; //replace ^ with ,

     return String.fromCharCode(c);

}

//Constructor class
class DNA {
    constructor(num){ //need to pass population size as input when creating DNA object
        this.genes = [];
        this.fitness = 0;
        
        for(let i = 0; i<num; i++){
          //each guy in the population is an array of random chars
          this.genes[i] = newChar(); //select a random character from the function we just created
        }
    }
    
    //converts character array to String
    getPhrase(){
        return this.genes.join("");
    }

    //Fitness function, this will be different depending upon the problem
    calcFitness(target){
        let score = 0;

        for(let i = 0; i<this.genes.length; i++){
            if(this.genes[i] == target.charAt(i)){
                score++; //increase fitness score for every matched character
            }
        }
        this.fitness = score / target.length;
    }

    crossover(partner){
        // A new child
        let child = new DNA(this.genes.length);

        let midpoint = floor(random(this.genes.length));

        //half from each parent strategy (this can vary)
        for(let i = 0; i < this.genes.length; i++){
            if (i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        return child;
    }

    //mutation means to randomly flip a character
    mutate(mutationRate){
        for (let  i = 0; i < this.genes.length; i++){
            if (random(1) < mutationRate){
                this.genes[i] = newChar();
            }
        }
    }

}// class end