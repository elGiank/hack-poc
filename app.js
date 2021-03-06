const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 1338;

//Controllers
const homeRoutes = require('./controllers/home/home');
const lenddoRoutes = require('./controllers/lenddo/lenddo');

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

//Routes
app.use('/', homeRoutes);
app.use('/lenddo', lenddoRoutes);

// Handle 404 error, the last middleware.
app.use("*", (req, res) => {
    res.status(404).send('404');
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});