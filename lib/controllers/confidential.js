const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Confidential = require('../models/Confidential');

module.exports = Router() 

.get('/', authenticate, async (req, res, next) => {
    try {
        res.send(await Confidential.getAll());
    } catch (error) {
    next(error)
    }
})