const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
    async index(req, res){
        const {user} = req.headers
        const loggedDev = await Dev.findById(user)
        
        
        const users = await Dev.find({
            $and: [
                {_id: {$ne: user}},
                {_id: {$nin: loggedDev.likes}},
                {_id: {$nin: loggedDev.dislikes}},
                {_id: {$nin: loggedDev.match}}
            ]
         
        })
        return res.json(users)

       
    },
     
    async match(req,res){
        const {user} = req.headers
        const loggedDev = await Dev.findById(user)
        const pesq = await Dev.find({_id: loggedDev.match})
        const pesq2 = await Dev.find({name: loggedDev.name})
        return res.json(pesq)

    },

    async usuario(req, res){
        const {user} = req.headers
        const loggedDev = await Dev.findById(user)

        const pesq = await Dev.find({name: loggedDev.name})
        return res.json(pesq)

    },





    async store(req, res) {
        const {username} = req.body

        const userExists = await Dev.findOne({user: username})

        if (userExists){
            return res.json(userExists)
        }

        const response = await axios.get(`https://api.github.com/users/${username}`)
        .catch(err => console.log('usuario nao encontrado'))


        const {name, bio, avatar_url: avatar} = response.data
        
            const dev = await Dev.create({
                name,
                user: username.toLowerCase(),
                bio,
                avatar
            })
    
            return res.json(dev)
       
        
    }
}
