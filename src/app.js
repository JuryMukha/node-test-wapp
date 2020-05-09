const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Init utils
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// Setup handlebars
app.set('views',viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Set up public directory
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Jury'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Jury'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help!',
    name: 'Jury'
  });
});


// app.get('/help', (req, res) => {
//   res.send('<h2>Help!</h2>')
// });

// app.get('/about', (req, res) => {
//   res.send('<h2>About!</h2>')
// });

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'No address provided',
    });
  }

  geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {

    if (error) return res.send({ error });

    forecast(latitude, longtitude, (error, msg) => {
      if (error) return res.send({ error });

      return res.send({ 
        location: location,
        forecast: msg,
        address: req.query.address,
       });
    });
  });
});


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help!',
    errorMessage: 'Article not found',
    name: 'Jury'
  });
});


app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Ooops page not found',
    name: 'Jury'
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});