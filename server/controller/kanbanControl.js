const { Kanban } = require('../models/index')
const createError = require('../helpers/createError')

class KanbanControl {

    static show(req, res, next){
        Kanban.findAll({
            where: {UserId: req.userdata.id}
        })
        .then(data=>res.status(200).json(data))
        .catch(err=>next(err))
    }

    static find(req, res, next){
        let searchId = req.params.id
        Kanban.findByPk(searchId)
        .then(data=>{
            if (data!==null){
                res.status(200).json(data)
            } else {
                res.status(404).json("data not found")
            }
        })
        .catch(err=>next(err))
    }

    static create(req, res, next){
        let newData = {
            title: req.body.title,
            category: req.body.category,
            note: req.body.status,
            UserId: req.userdata.id
        }
        Kanban.create(newData)
        .then(data=>res.status(201).json(`new data : ${data.title} has been saved`))
        .catch(err=>next(err))
    }

    static edit(req, res, next){
        let searchId = req.params.id
        Kanban.update(req.body, {
            where: {id: searchId}
        })
        .then(data=>{
            res.status(200).json(`data with id : ${searchId} has been updated`)
            
        })  
        .catch(err=>next(err))
    }

    static delete(req, res, next){
        let searchId =  req.params.id
        Kanban.destroy({
            where : { id: searchId}
        })
        .then(data=>{
            if(data!==0){
                res.status(200).json(`data with id ${searchId} has been deleted`)
            } else {
                res.status(404).json("no data is deleted")
            }
        })
        .catch(err=> next(err))
    }

}

module.exports = KanbanControl