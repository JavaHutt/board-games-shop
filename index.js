const express     = require('express');
const path        = require('path');
const mongoose    = require('mongoose');
const handlebars  = require('handlebars');
const exphbs      = require('express-handlebars');
const homeRoutes  = require('./routes/home');
const addRoutes   = require('./routes/add');
const gamesRoutes = require('./routes/games');
const cartRoutes  = require('./routes/cart');
const User        = require('./models/user');

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5e2406c62e993604d4d6b2f6');
    req.user = user;
    next();
  } catch(e) {
    console.log(e);
  }
})

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
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    
    const candidate = await User.findOne();

    if (!candidate) {
      const user = new User({
        email: 'alex@mail.ru',
        name: 'Alex',
        cart: {
          items: []
        }
      });
      await user.save();
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  } catch(e) {
    console.log(e);
  }
}

start();