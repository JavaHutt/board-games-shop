const { Router } = require('express');
const router     = Router();

router.get('/', (req, res) => {
  res.render('games', {
    title: 'Игры',
    isGames: true
  });
})

module.exports = router;