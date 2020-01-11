const path = require('path');
const fs   = require('fs');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

class Cart {
  static async add(game) {
    const cart = await Cart.fetch();

    const idx = cart.games.findIndex(c => c.id == game.id);
    const candidate = cart.games[idx];

    if (candidate) {
      candidate.count++;
      cart.games[idx] = candidate;
    } else {
      game.count = 1;
      cart.games.push(game);
    }

    cart.price += +game.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) reject(err);
        else resolve();
      })
    });
  }

  static async remove(id) {
    const cart = await Cart.fetch();

    const idx = cart.games.findIndex(c => c.id == id);
    const game = cart.games[idx];

    if (game.count == 1) {
      cart.games = cart.games.filter(c => c.id != id);
    } else {
      cart.games[idx].count--;
    }

    cart.price -= +game.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) reject(err);
        else resolve(cart);
      })
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf-8', (err, content) => {
        if (err) reject(err);
        else resolve(JSON.parse(content));
      })
    })
  }
}

module.exports = Cart;