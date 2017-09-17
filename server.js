const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

// Setup partial path
hbs.registerPartials(__dirname + '/views/partials');

// Setup express to use hbs template engine
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toLocaleString();
  var log = `${now}: ${req.method} ${req.url}`;
  
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// ;)

// Setup static files content
app.use(express.static(__dirname + "/public"));


// Register hbs helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// helper który przyjmuje parametry
hbs.registerHelper('scream', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    title: "Home Page",
    currentYear: new Date().getFullYear(),
    welcomeMsg: "Welcome on my node.js page"
  });
});

app.get('/json', (req, res) => {
  res.send({
    errorMessage: "Unable to handle request"
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Page",
    currentYear: new Date().getFullYear()
  });
});

app.get('/projects', (req, res) => {
  res.render('projects', {
    title: "Projects",
    welcomeMsg: "Portfolio page here"
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
});