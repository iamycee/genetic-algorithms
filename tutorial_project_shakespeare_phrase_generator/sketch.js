// setup()
//  # Step 1: The Population 
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection 
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function, 
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it 
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//  
//   # Rinse and repeat


let target;
let popmax;
let mutationRate;
let population;
let bestPhrase;
let allPhrases;
let stats;

function setup(){
	bestPhrase = createP("Best yet: ");
	bestPhrase.position(10, 10);
	bestPhrase.class("best");

	allPhrases = createP("All Phrases:");
	allPhrases.position(600, 10);
	allPhrases.class("all");
	
	stats = createP("Stats");
	stats.class("stats");

	target = "To be or not to be, that is the question";
	popmax = 2000;    //better a larger value for longer phrases
	mutationRate = 0.0005; //empirical evidence: smaller the better. this is experimental, can't say anything yet.

	//population object
	population = new Population(target, mutationRate, popmax);

}//setup end


function draw(){

	population.naturalSelection();  //create mating pool of the fittest
	population.generate(); //create next generation
	population.calcFitness(); //calculate fitness of each member

	population.evaluate();

	if(population.isFinished()){
		console.log("!!!!!!!!!FINISHED!!!!!!!!!")
		print("Time: ", millis()/1000.0, "seconds")
		noLoop();
	}

	displayInfo();
}//draw end

function displayInfo() {
	// Display current status of population
	let answer = population.getBest();
  
	bestPhrase.html("Best yet:<br>" + answer);
  
	let statstext = "Total generations:     " + population.getGenerations() + "<br><br>";
	statstext += "Average fitness:       	" + nf(population.getAvgFitness()) + "<br><br>";  //nf converts to string
	statstext += "Total population:      " + popmax + "<br><br>";
	statstext += "Mutation rate:         " + floor(mutationRate * 100) + "%<br><br>";
	statstext += "Time taken:            " + (millis()/1000.0).toFixed(3) + "  seconds <br>";
  
	stats.html(statstext);
	
	allPhrases.html("<strong>All phrases:</strong><br>" + population.allPhrases())
  }//displayInfo end




