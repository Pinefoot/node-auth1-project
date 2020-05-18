const router = require('express').Router();

const Users = require('./users-model')




//this will be used to set up restricted section
router.get('/', (req, res)=>{
    Users.find()
    .then(users =>{
        res.json(users);
    }).catch(err => res.send(err))
})