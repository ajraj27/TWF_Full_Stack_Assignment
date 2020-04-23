let router = require('express').Router()
const controller = require('./controller')

router.post('/solve', controller)

module.exports=router