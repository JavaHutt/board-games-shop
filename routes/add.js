const { Router } = require('express');
const router     = Router();

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавление игры',
    isAdd: true
  });
})

module.exports = router;