const express = require('express');
const router = express.Router();
const userRouter = require('./routers/users.router');
const blogRouter = require('./routers/blogs.router');
const authenRouter = require('./routers/authen.router');

router.use('/authen', authenRouter);
router.use('/user', userRouter);
router.use('/blog', blogRouter);

router.get('/', (req, res) => {
	res.send(`Hello ${new Date()}`);
});

module.exports = router;
