const jwt = require('jsonwebtoken')

function authentication(req, res, next){
    const {token} = req.headers
    try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userdata = decoded
        next()
    } catch (err) {
        res.status(403).json(err)
    }
}

module.exports = authentication