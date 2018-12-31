//This is a class to define multiple creatures of rockets

class Population {
    constructor(m, num){
        this.mutationRate = m;
        this.population = [];
        this.matingPool = [];
        this.generations = 0;

        //create rockets
        for (var i = 0; i < num; i++){
            var location = createVector(width/2, height+20);
            this.population[i] = new Rocket(location, new DNA()); 
        }
    }

    live(){
        for(var i= 0; i < this.population.length; i++){
            this.population[i].run();
        }
    }

    fitness(){  //calculate fitness for each member
        for (var i = 0; i<this.population.length; i++){
            this.population[i].calcFitness();
        }
    }

    //Generate a mating pool
    naturalSelection(){
        this.matingPool = [];
        var maxFitness = this.getMaxFitness();

        for (let i = 0; i < this.population.length; i++){
            var fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);  //scale between 0 and 1
            var n = floor(fitnessNormal*100);
            
            for (let j = 0; j < n; j++){
                //push it as many times as it's fitness
                this.matingPool.push(this.population[i]);
            }
        }
    }

    reproduction(){
        for (var i = 0; i < this.population.length; i++){
            var m = floor(random(this.matingPool.length));
            var d = floor(random(this.matingPool.length));
            
            var parentA = this.matingPool[m];
            var parentB = this.matingPool[d];

            var aGenes = parentA.getDNA();
            var bGenes = parentB.getDNA();
            
            var child = aGenes.crossover(bGenes);
            //mutate
            child.mutate(this.mutationRate);

            //add child in place of i
            var location = createVector(width/2, height+20);
            this.population[i] = new Rocket(location, child);
        }
        this.generations++;
    }

    getGenerations(){
        return this.generations;
    }

    getMaxFitness(){
        var record = 0;
        for (var i = 0; i < this.population.length; i++){
            if (this.population[i].getFitness() > record) {
            record = this.population[i].getFitness();
            }
        }
        return record;
    }
}// Population class end