/* 
    order:  C1, C2, C3, L1
            C1,
            C2,
            C3,
            L1
*/

const distanceMatrix = [
    [0, 4, 5, 3],
    [4, 0, 3, 2.5],
    [5, 3, 0, 2],
    [3, 2.5, 2, 0]
]

// weights of stocks from A to I
const stockWeights = [
    3, 2, 8,
    12, 25, 15,
    0.5, 1, 2
]

// Return minimum between two numbers
const min = (a, b) => {
    return a > b ? b : a
}

// Get cost per unit distance based on weight specified
const getCostPerUnit = (weight) => {

    if(weight <= 5) return 10

    return 10 + 8*(Math.floor((weight-1)/5))
}

// Calculate number of centres in weights array (length is 3) 
const numberOfCentres = (weights) => {
    let cnt=0

    weights.forEach( weight => {
        if( weight > 0) cnt++
    })

    return cnt
}

// Calculate sum of first lim weights
const prefixSum = (weights, lim, combinations) => {
    let sum = 0
    for(let i = 0; i < lim; i++){
        sum += weights[combinations[i]]
    }

    return sum
}

// If number of centre is 1 : Ci -> L1
const one = (weights) => {
    let i

    for(i = 0 ; i < 3; i++ ){
        if(weights[i] > 0){
            break
        }
    }

    return getCostPerUnit(weights[i])*distanceMatrix[i][3]
}


// If number of centre is 2
/**
     * Choices:
     *  Ci -> Cj -> L1
     *  Ci -> L1 -> Cj -> L1
     * 
     *  (+ permutations of Ci and Cj interchanged)
*/

const two = (weights) => {
    const centers=[];

    for(let i = 0; i< 3; i++){
        if(weights[i] > 0){
            centers.push(i)
        }
    }

    let minCost = Infinity
    let cost

    for (let i = 0; i < 2; i++) {
        cost = 0
        cost += getCostPerUnit(weights[centers[i]]) * 
                    distanceMatrix[centers[i]][centers[(i + 1) % 2]]
        
        cost += getCostPerUnit(weights[centers[i]] + weights[centers[(i + 1) % 2]]) * 
                    distanceMatrix[centers[(i + 1) % 2]][3]
        
        minCost = min(minCost, cost)

        cost = 0
        cost += getCostPerUnit(weights[centers[i]]) *
                     distanceMatrix[centers[i]][3]
        
        cost += getCostPerUnit(0) *
                    distanceMatrix[3][centers[(i + 1) % 2]]
        
        cost += getCostPerUnit(weights[centers[(i + 1) % 2]]) *
                    distanceMatrix[centers[(i + 1) % 2]][3]

        minCost = min(minCost, cost)
    }

    return minCost
}

// If no. of centres is 3
/**
 * Choices:
 * 
 *  Ci -> Cj -> Ck -> L1
 *  Ci -> Cj -> L1 -> Ck -> L1
 *  Ci -> L1 -> Cj -> Ck -> L1
 *  Ci -> L1 -> Cj -> L1 -> Ck -> L1
 * 
 *  (+ permutations of Ci, Cj, Ck interchanged)
 */

const three = (weights) => {
    let cost
    let minCost = Infinity

    const combinations = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]]

    for(let j = 0; j < 6; j++){

            // Ci -> Cj -> Ck -> L1
            cost = 0;
            cost += getCostPerUnit(prefixSum(weights, 1,combinations[j])) *
                        distanceMatrix[combinations[j][0]][combinations[j][1]];
            cost += getCostPerUnit(prefixSum(weights, 2,combinations[j])) *
                        distanceMatrix[combinations[j][1]][combinations[j][2]];
            cost += getCostPerUnit(prefixSum(weights, 3,combinations[j])) *
                        distanceMatrix[combinations[j][2]][3]
            
            minCost = min(minCost, cost)
    
            // Ci -> Cj -> L1 -> Ck -> L1
            cost = 0;
            cost += getCostPerUnit(weights[combinations[j][0]]) *
                distanceMatrix[combinations[j][0]][combinations[j][1]];
            cost += getCostPerUnit(prefixSum(weights, 2,combinations[j])) *
                distanceMatrix[combinations[j][1]][3]
            cost += getCostPerUnit(0) *
                        distanceMatrix[3][combinations[j][2]]
            cost += getCostPerUnit(weights[combinations[j][2]]) *
                distanceMatrix[combinations[j][2]][3]
            
            minCost = min(minCost, cost)
    
            // Ci -> L1 -> Cj -> Ck -> L1
            cost = 0;
            cost += getCostPerUnit(weights[combinations[j][0]]) *
                distanceMatrix[combinations[j][0]][3];
            cost += getCostPerUnit(0) *
                distanceMatrix[3][combinations[j][1]];
            cost += getCostPerUnit(weights[combinations[j][1]]) *
                distanceMatrix[combinations[j][1]][combinations[j][2]];
            cost += getCostPerUnit(weights[combinations[j][1]] + weights[combinations[j][2]]) *
                distanceMatrix[combinations[j][2]][3]
    
            minCost = min(minCost, cost)
    
            // Ci -> L1 -> Cj -> L1 -> Ck -> L1
            cost = 0;
            cost += getCostPerUnit(weights[combinations[j][0]]) *
                distanceMatrix[combinations[j][0]][3];
            cost += getCostPerUnit(0) *
                distanceMatrix[3][combinations[j][1]];
            cost += getCostPerUnit(weights[combinations[j][1]]) *
                distanceMatrix[combinations[j][1]][3];
            cost += getCostPerUnit(0) *
                distanceMatrix[3][combinations[j][2]]
            cost += getCostPerUnit(weights[combinations[j][2]]) *
                distanceMatrix[combinations[j][2]][3]
            
            minCost = min(minCost, cost)
    
    }
    
    return minCost
}


const getSolution = (input) => {
    let weights = []
    let sum = 0;

    for (let i = 0; i < 9; i++) {

        sum += input[i] * stockWeights[i]

        if ((i + 1) % 3 == 0) {
            
            weights.push(sum)
            sum = 0
        }

    }    

    switch (numberOfCentres(weights)) {
        case 1:
            return one(weights)

        case 2:
            return two(weights)
        
        case 3:
            return three(weights)

        default:
    }

    return new Error('Wrong input')
}

module.exports =  getSolution


