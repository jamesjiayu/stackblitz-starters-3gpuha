const express = require('express');
const { resolve } = require('path');
const cities = require('./data/cities.json');
const cp = require('cookie-parser');
// const fs = require('fs');
//path.join(__dirname,'pages/index.html') //path{resolve:fn, join:fn}
const app = express();
const port = 3000;
app.use(cp());
//console.log(resolve(__dirname, 'data/cities.json'));
app.use(express.static('pages'));
app.use(express.static('static'));
app.post('/', (req, res) => {
  res.send('post Home');
});
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.get('/:abc.html', (req, res) => {
  console.log(req.params.abc); //no .html, just abc
  let { abc } = req.params;
  let cityFound = cities.find((city) => city.id === Number(abc)); //return  the element
  if (!cityFound) {
    res.status(404).send('not found the city');
  }
  res.send(`<h1>${cityFound.city}</h1>`);
});
app.get('/res', (req, res) => {
  res.send('post Home');
});
app.get('/home', (req, res) => {
  // console.log(req.path, req.query);// /home?a=1&b=3 {a:1,b:3}
  console.log(req.get('accept'));
  res.sendFile(__dirname, 'pages/index.html');
});
app.get('/other', (req, res) => {
  res.redirect('http://www.google.com'); //.status(302)
});
app.get('/api/cities', (req, res) => {
  //console.log(cities);
  req.json(cities);
  // fs.readFile(resolve(__dirname, 'data/cities.json'), (err, data) => {
  //   if (err) return console.log(err);
  //   req.json(data.toString());
  // });
});
app.get('/set-cookie', (req, res) => {
  res.cookie('name', 'j');
  res.send('cookie set ok');
});
app.get('/get-c', (req, res) => {
  console.log(req.cookies);
});
app.all('*', (req, res) => {
  res.status(404).send('Not f');
});
// app.use((req, res, next) => {
//   //(err,req,... ) why err can't be add as 1st param?
//   //console.error(err.stack);
//   res.status(404).send('NOT FOUND');
// });
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
//app.listen(port,fn)
