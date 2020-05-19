
const router = require("express").Router();

const Users = require('./users-model')

//const Restricted = require('./users-service')

function restricted(req, res, next){
    if(req.session && req.session.loggedIn){
      next();
    }else{
      res.status(401).json({message: 'Restricted'})
    }
  }

router.use(restricted);
//this will be used to set up restricted section
router.get('/', (req, res)=>{
    Users.find()
    .then(users =>{
        res.json(users);
    }).catch(err => res.send(err))
})

module.exports = router;