const express = require('express');
const router = express.Router();
const userRouter = require('./routers/users.router');

router.use('/user', userRouter);

router.get('/', (req, res) => {
    res.send(`Hello ${new Date()}`);
})

module.exports = router

