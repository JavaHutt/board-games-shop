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
  const title = req.body.title;
  const price = req.body.price;
  const image = req.body.image;
  const game  = new Game(title, price, image);

  await game.save();

  res.redirect('/games');
});

module.exports = router;