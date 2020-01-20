const { Router } = require('express');
const Game       = require('../models/game');
const router     = Router();

const mapCartItems = cart => {
  return cart.items.map(game => ({
    ...game.gameId._doc,
    count: game.count
  }))
}

const calculatePrice = games => {
  return games.reduce((total, game) => {
    return total + game.price * game.count;
  }, 0)
}

router.post('/add', async (req, res) => {
  const game = await Game.findById(req.body.id);
  await req.user.addToCart(game);

  res.redirect('/cart');
});

router.get('/', async (req, res) => {
  const user = await req.user
    .populate('cart.items.gameId')
    .execPopulate();

  const games = mapCartItems(user.cart);

  res.render('cart', {
    title: 'Корзина',
    isCart: true,
    games,
    price: calculatePrice(games)
  });
})

router.delete('/remove/:id', async (req, res) => {
  const cart = await Cart.remove(req.params.id);

  res.status(200).json(cart);
})

module.exports = router;