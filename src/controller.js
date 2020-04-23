
const getSolution = require('./problem')
const isError = require('iserror')

const controller = (req, res)  => {
    let inputArray = []
    let inputArrayString = req.body.input

    // refactor following code to make it better
    try {
        inputArray = inputArrayString
            .substring(1, inputArrayString.length - 1)
            .split(', ')
            .map(Number)

        if (inputArray.length != 9) {
            return res.status(400).json('Input array should be of length 9')
        }

        for (let i = 0; i < 9; i++) {
            if (inputArray[i] == NaN) {
                return res.status(400).json('Invalid input array')
            }
        }
    } catch (error) {
        return res.status(400).json(error)
    }    

    let result = getSolution(inputArray)
    if (isError(result)) {
        return res.status(500).json(result.message)
    }

    return res.status(200).json(result)
}

module.exports =  controller