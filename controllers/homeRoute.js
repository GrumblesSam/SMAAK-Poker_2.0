const router = require('express').Router();
const { User } = require('../models');

router.get('/', async(req, res) => {
    try{
        console.log('hi')
        res.json( {name: "koki"});
    }
    catch(e){
        console.log(e);
    }
})

module.exports = router;
