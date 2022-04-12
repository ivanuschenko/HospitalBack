const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use("/", apiRoutes);
app.use(cors());
app.use(express.json());

const apiRoutes = require('./src/modules/routes/routes');
const URL = process.env.URL;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

