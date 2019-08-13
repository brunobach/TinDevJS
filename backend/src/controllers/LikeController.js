const Dev = require('../models/Dev')

module.exports = {
   async store(req, res, next){
        
        console.log(req.params.devId)

        const {devId} = req.params
        const {user} = req.headers

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        if(!targetDev){
            return res.status(400).json({error: 'Dev not exists'})
        }

        if (targetDev.likes.includes(loggedDev._id)){
            loggedDev.match.push(targetDev._id)

            targetDev.match.push(loggedDev._id)
            
            await targetDev.save()

            await loggedDev.save()
            
          

            return res.json(loggedDev) 

            

            console.log('Deu match')
        }

        loggedDev.likes.push(targetDev._id)

        await loggedDev.save()
        

        return res.json(loggedDev) 
    }
}