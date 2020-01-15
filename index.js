const express     = require('express');
const path        = require('path');
const mongoose    = require('mongoose');
const exphbs      = require('express-handlebars');
const homeRoutes  = require('./routes/home');
const addRoutes   = require('./routes/add');
const gamesRoutes = require('./routes/games');
const cartRoutes  = require('./routes/cart');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

//Routes
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/games', gamesRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  const url = 'mongodb+srv://javahutt:NakU93zdIc@cluster0-9voh5.mongodb.net/board-games-shop';

  try {
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  } catch(e) {
    console.log(e);
  }
}

start();