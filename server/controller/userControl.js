const { User } = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('430077671481-v5fne4ieak3vg5m5f2cfu4damo0f3sjh.apps.googleusercontent.com');

class UserControl {

    static register(req, res, next){
        console.log(req.body)
        User.findOne({
            where: {email:req.body.email}
        })
        .then(data=>{
            if(data){
                res.status(400).json("your e-mail has been registered")
            } else {
                User.create(req.body)
                .then(data=>res.status(201).json(data))
                .catch(err=>next(err))
            }
        })   
        .catch(err=>next(err))
    }

    static login(req, res, next){
        let { email, password } = req.body
        User.findOne({
            where: { email }
        })
        .then(user=>{
            if(user){
                if (bcrypt.compareSync(password, user.password)){
                    let token = jwt.sign({id: user.id, email: user.email}, 'aaa')
                    res.status(200).json({token})
                } else {
                    res.status(400).json('password wrong')
                }
            } else{
                res.status(400).json('email wrong')
            }
        })
        .catch(err => next(err))
    }

    static googleLogin(req, res, next){
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: '29760818398-00bf5bm48dua8i04uii7sgjf1fmd2n1i.apps.googleusercontent.com', // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            })
            .then(ticket => {
                const payload = ticket.getPayload();
                User.findOne({
                    where: {
                        email: payload.email
                    }
                })
                    .then(data => {
                        if (data) {
                            return data
                        }
                        else {
                            let obj = {
                                email: payload.email,
                                password: "google"
                            }
                            return User.create(obj)
                        }
                    })
                    .then(data => {
                        if (data) {
                            var token = jwt.sign({id: data.id, email: data.email}, 'aaa')
                        }
                        res.status(200).json({ token: token })
                    })
                    .catch(err => next(err))
            })
        }

}
    
module.exports = UserControl