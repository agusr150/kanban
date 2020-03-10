const { Kanban } = require('../models/index')
function authorization (req, res, next){
    console.log(req.params.id)
    Kanban.findOne({
        where: {id: req.params.id}
    })
    .then(data=>{
        if(data.UserId === req.userdata.id)
        next()
        else {
            res.send('not authorized')
        }
    })
    .catch(e => res.status(404).json({"status": 404, "response": "data not found"}))
}

module.exports = authorization