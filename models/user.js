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
  const idx = items.findIndex(g => {
    return g.gameId.toString() === game._id.toString();
  });

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

module.exports = model('User', userSchema);