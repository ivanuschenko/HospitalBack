const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
const url = process.env.URL
console.log(url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

