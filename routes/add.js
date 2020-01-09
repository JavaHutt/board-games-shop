const { Router } = require('express');
const router     = Router();

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавление игры',
    isAdd: true
  });
});

router.post('/', (req, res) => {
  console.log(req.body);

  res.redirect('/games');
});

module.exports = router;