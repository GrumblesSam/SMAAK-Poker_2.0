const router = require('express').Router();
const { User, Card } = require('../models');


router.get('/', async(req, res) => {
    try{
        let userData = await User.findAll()
        res.render('homepage', {userData});
    }
    catch(e){
        console.log(e);
    }
})
router.get('/login', async(req,res) => {
    try{
        res.render('login');
    }
    catch(e){
        console.log(e);
    }
})
router.get('/michael', async(req, res) => {
    try {
        const cardData = await Card.findAll();
        // console.log(cardData)
        const cards = cardData.map((card)=>{
            card.title
        })
        console.log(cards)
        res.render('gamepage', {
            cards
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
})
module.exports = router;
