

const bcryptjs = require('bcryptjs')
const router = require('express').Router()
const Users = require('../users/users-model')
const {isValid} = require('../users/users-service')

router.post('/register', (req, res)=>{
    const credentials = req.body;

    if(isValid(credentials)){
        //need to figure out what rounds does again
        const rounds = process.env.BCRYPT_ROUNDS || 12;
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        //this hashes the password
        credentials.password = hash;

        //saves the user to database
        Users.add(credentials)
            .then(user =>{
                req.session.loggedIn === true;
                res.status(201).json({data: user})
            })
            .catch(err =>{
                res.status(500).json({message: err.message})
            })
    }else{
        res.status(400).json({
            message: 'please provide username and password'
        })
    }

})

router.post('/login', (req, res)=>{
    const {username, password} = req.body;

    if (isValid(req.body)){
        Users.findBy({username: username})
        .then( ([user]) =>{
            if(user && bcryptjs.compareSync(password, user.password)){
                req.session.loggedIn = true;
                req.session.user = user;
                res.status(200).json({message: 'Welcome to the secret API' })
            }else{
                res.status(401).json({message: 'Invalid credentials'})
            }
        }).catch(err =>{
            res.status(500).json({message: err.message})
        })
    }else{
        res.status(400).json({
            message: "Please provide username and password"
        })
    }
})


router.get('/logout', (req, res)=>{
    if(req.session){
        req.session.destroy(err =>{
            if(err){
                res.status(500).json({message:"we could not log you out, try again"})
            }else{
                res.status(204).end()
            }
        })
    }else{
        res.status(204).end()
    }
})



module.exports = router;