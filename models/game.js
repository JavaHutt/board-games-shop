const uuid = require('uuid/v4');
const fs   = require('fs');
const path = require('path');

class Game {
  constructor(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.id    = uuid();
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      image: this.image,
      id: this.id
    };
  }

  async save() {
    const games = await Game.getAll();
    games.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'games.json'),
        JSON.stringify(games),
        err => {
          if (err) reject(err);
          else resolve();
        }
      );
    })
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'games.json'),
        'utf-8',
        (err, content) => {
          if (err) reject(err);
          else {
            resolve(JSON.parse(content));
          }
        }
      );
    })
  }
}

module.exports = Game;