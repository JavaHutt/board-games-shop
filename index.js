const express = require('express');
const path = require('path');
const fs = require('fs');
const exphbs  = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная страница',
    isHome: true
  });
})

app.get('/games', (req, res) => {
  res.render('games', {
    title: 'Каталог игр',
    isGames: true
  });
})

app.get('/add', (req, res) => {
  res.render('add', {
    title: 'Добавить игру',
    isAdd: true
  });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})