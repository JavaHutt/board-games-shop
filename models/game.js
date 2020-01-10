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

  /**
   * Возвращает объект со всеми полями
   */
  toJSON() {
    return {
      title: this.title,
      price: this.price,
      image: this.image,
      id: this.id
    };
  }

  /**
   * Сохраняет запись
   */
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

  /**
   * Получение всех записей
   */
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

  /**
   * Получить одну запись по id
   * @param {String} id 
   */
  static async getById(id) {
    const games = await Game.getAll();

    return games.find(game => game.id == id);
  }
}

module.exports = Game;