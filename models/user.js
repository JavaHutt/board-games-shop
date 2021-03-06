const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1
        },
        gameId: {
          type: Schema.Types.ObjectId,
          ref: 'Game',
          required: true
        }
      }
    ]
  }
})

userSchema.methods.addToCart = function(game) {
  const items = [...this.cart.items];
  const idx = items.findIndex(g =>  g.gameId.toString() === game._id.toString());

  if (idx >= 0) {
    items[idx].count++;
  } else {
    items.push({
      count: 1,
      gameId: game._id
    });
  }
  
  this.cart = { items };
  return this.save();
}

userSchema.methods.removeFromCart = function(id) {
  let items = [...this.cart.items];
  const idx = items.findIndex(g => g.gameId.toString() === id.toString());

  if (items[idx].count === 1) {
    items = items.filter(g => g.gameId.toString() !== id.toString());
  } else {
    items[idx].count--;
  }

  this.cart = { items };

  return this.save();
}

module.exports = model('User', userSchema);