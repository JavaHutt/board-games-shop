const { Router } = require('express');
const Game       = require('../models/game');
const router     = Router();

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавление игры',
    isAdd: true
  });
});

router.post('/', async (req, res) => {
  const { title, price, image } = req.body;
  const userId = req.user;
  const game  = new Game({ title, price, image, userId });

  try {
    await game.save();

    res.redirect('/games');
  } catch(e) {
    console.log(e);
  }
});

module.exports = router;