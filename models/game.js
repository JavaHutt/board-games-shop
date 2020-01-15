const { Schema, model } = require('mongoose');

const game = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: String
});

module.exports = model('Game', game);