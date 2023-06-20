const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");
const app = express();
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware');

const router = require('./routes/index');

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

const sequelize = require('./database/database');

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'static', 'movies')));
app.use(express.static(path.resolve(__dirname, 'static', 'users')));

app.use(fileUpload({}));

app.use('/api', router);
app.use(errorHandlingMiddleware);

const start = async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({force: false});
    app.listen(PORT, () => console.log(`Server started at ${PORT}`));
}

start();