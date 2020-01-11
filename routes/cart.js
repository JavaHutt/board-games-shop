const { Router } = require('express');
const Cart       = require('../models/cart');
const Game       = require('../models/game');
const router     = Router();

router.post('/add', async (req, res) => {
  const game = await Game.getById(req.body.id);

  await Cart.add(game);

  res.redirect('/cart');
});

router.get('/', async (req, res) => {
  const cart = await Cart.fetch();

  res.render('cart', {
    title: 'Корзина',
    isCart: true,
    games: cart.games,
    price: cart.price
  });
})

router.delete('/remove/:id', async (req, res) => {
  const cart = await Cart.remove(req.params.id);

  res.status(200).json(cart);
})

module.exports = router;