const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");
const app = express();

const router = require('./routes/index');

dotenv.config();

const PORT = process.env.SERVER_PORT || 1000;

const sequelize = require('./database/database');
const models = require('./models/models').Models(sequelize);

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api', router);

const start = async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({force: false});
    app.listen(PORT, () => console.log(`Server started at ${PORT}`));
}

start();