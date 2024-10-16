//import express
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./src/routes')

//init app
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//define port
const port = 3000;

//route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// define routes
app.use('/api', routes)

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
