const express = require('express')
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('currentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now}: Method=${req.method} : Path = ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) =>{
    if(err)
    console.log('Unable to append to server log');
  });
  next();
});

app.set('View Engine','hbs');
// app.use((req,res,next) => {
//   res.render('maintainance.hbs');
// });
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res) =>{
res.render('home.hbs',{
  pageTitle: 'Home Page',
  welcomeMessage: 'Welcome to my website'
});
});
app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/details',(req,res) =>{
  res.render('details.hbs',{
    pageTitle: 'Details Page',
  });
});

app.get('/bad',(req,res) =>{
  res.send({'BAD BOY': 'BADBOYY'});
});

app.listen(port,() =>{
  console.log(`Server is Running on port ${port}`);
});
