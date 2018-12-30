

class Population {
    constructor(p, m, num){  //target phrase, mutationRate, populationSize
        this.population;
        this.matingPool;
        this.generations = 0;
        this.finished = false;  //finished evolving : : perfect score achieved
        this.mutationRate = m;
        this.perfectScore = 1;
        this.target = p; //target phrase

        this.best = "";

        this.population = [];

        for (let i = 0; i < num; i++){
            this.population[i] = new DNA(this.target.length);
        }//create a population of DNAs

        this.matingPool = [];
        this.calcFitness();
    }

    //this is calcFitness of Population class
    calcFitness(){
        for (let i = 0; i<this.population.length; i++){
              this.population[i].calcFitness(target);  //this is calcFitness of DNA object
        }
    }

    naturalSelection(){
        this.matingPool = [];

        let maxFitness = 0;
        for (let i = 0; i<this.population.length; i++){
            if (this.population[i].fitness > maxFitness){
                maxFitness = this.population[i].fitness;
            }
        }

        //add to matingPool based on fitness
        for (let i = 0; i<this.population.length; i++){
            let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1); //scale between 0 and 1
            let n = floor(fitness * 100);
            for (let j = 0; j < n; j++){
                this.matingPool.push(this.population[i]);
            }      
        }
        //console.log(this.matingPool.length)
    }

    //create a new generation
    generate(){
        for (let i = 0; i < this.population.length; i++){
            let a = floor(random(this.matingPool.length));	 
            let b = floor(random(this.matingPool.length));
            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        this.generations++;
    }

    getBest(){
        return this.best;
    }

    evaluate(){
        let worldrecord = 0.0;
        let  index = 0;

        for(let i = 0; i < this.population.length; i++){
            if(this.population[i].fitness > worldrecord){
                index = i;
                worldrecord = this.population[i].fitness;
            }
        }

        this.best = this.population[index].getPhrase();
        if(worldrecord === this.perfectScore){
            this.finished = true; //finish the evolution if perfect score is reached
        }
    }

    isFinished(){
        return this.finished;
    }

    getGenerations(){
        return this.generations;
    }

    getAvgFitness(){
        let total = 0;
        for (let i = 0; i < this.population.length; i++) {
            total += this.population[i].fitness;
          }
          return total / (this.population.length);
    } 
    

    // for displaying the generated phrases on the screen 
    allPhrases(){
        let everything = "";

        let displayLimit = min(this.population.length, 50);

        for(let i = 0; i < displayLimit; i++){
            everything += this.population[i].getPhrase() + "<br>";
        }
        return everything;
    }


}//class end