const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
.post('/signup', async (req, res, next) => {
    try {
        const user = await UserService.create(req.body);
        res.send(user)
    } catch (error) {
    next(error);
    }
})

.post('/signin', async (req, res, next) => {
    try {
        const user = await UserService.signIn(req.body);
        
        res
        .cookie(process.env.COOKIE_NAME, user.authToken(), {
            httpOnly: true,
            maxAge: ONE_DAY_IN_MS,
        })
        .send({ message: 'You have successfully signed in!', user});
    } catch (error) {
    next(error);
    }
})