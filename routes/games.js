const { Router } = require('express');
const Game       = require('../models/game');
const router     = Router();

router.get('/', async (req, res) => {
  const games = await Game.find()
                          .populate('userId', 'email name')
                          .select('title price image');
                          
  res.render('games', {
    title: 'Игры',
    isGames: true,
    games
  });
})

router.get('/:id', async (req, res) => {
  const game = await Game.findById(req.params.id);

  res.render('game', {
    layout: 'empty',
    title: `Игра ${game.title}`,
    game
  });
})

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('index');
  }

  const game = await Game.findById(req.params.id);

  res.render('game-edit', {
    title: `Редактирование ${game.title}`,
    game
  });
})

router.post('/edit', async (req, res) => {
  const { id } = req.body;
  delete req.body.id;

  await Game.findByIdAndUpdate(id, req.body);

  res.redirect('/games');
})

router.post('/remove', async (req, res) => {
  try {
    await Game.deleteOne({ _id: req.body.id });
    res.redirect('/games');
  } catch(e) {
    console.log(e);
  }
})

module.exports = router;