module.exports = (excludes = []) => (req, res, next) => {
    if(excludes.includes(req.url)) {
        next();
    } else if(!req.headers.authorize) {
        res.status(401).send();
    } else {
        next();
    }
}