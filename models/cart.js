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