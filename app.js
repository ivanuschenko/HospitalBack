const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const userRoutes = require('./src/modules/routes/userRoutes');
const AppointsRoutes = require('./src/modules/routes/AppoinmentRoutes');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./src/middlewares/error-middlewares');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", AppointsRoutes);
app.use('/api', userRoutes);
app.use(errorMiddleware);


const URL = process.env.URL;
const PORT = process.env.PORT;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});

