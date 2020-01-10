const { Router } = require('express');
const Game       = require('../models/game');
const router     = Router();

router.get('/', async (req, res) => {
  const games = await Game.getAll();
  res.render('games', {
    title: 'Игры',
    isGames: true,
    games
  });
});

router.get('/:id', async (req, res) => {
  const game = await Game.getById(req.params.id);

  res.render('game', {
    layout: 'empty',
    title: `Игра ${game.title}`,
    game
  });
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('index');
  }

  const game = await Game.getById(req.params.id);

  res.render('game-edit', {
    title: `Редактирование ${game.title}`,
    game
  });
});

router.post('/edit', async (req, res) => {
  await Game.update(req.body);

  res.redirect('/games');
})

module.exports = router;