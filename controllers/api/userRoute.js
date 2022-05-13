const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData.user_id);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/create', async(req,res) => {
  try {
        console.log('post method 2')
        const userData = await User.findOne({ where: { email: req.body.email } });
    
        if (userData) {
          res
            .status(300)
            .json({ message: 'user already exists' });
            console.log('user exists')
          return;
        }
        let user = await User.create(
           req.body
           // add starting chips
          );
          // let data = await user.authorize();
          return res.json(user);
    }
    catch (e){
      console.log(e);
        console.error('you messed up')
    }
})

module.exports = router;