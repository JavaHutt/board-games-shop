const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

gameSchema.method('toClient', function() {
  const game = this.toObject();

  game.id = game._id;
  delete game._id;
  return game;
})

module.exports = model('Game', gameSchema);