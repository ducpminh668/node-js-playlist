const express = require('express');
const todoController = require('./controllers/todoController');

const app = express();

//set view engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

todoController(app);

app.listen(3000);