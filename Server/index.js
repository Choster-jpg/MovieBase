const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const router = require('./routes/index');
const path = require("path");
const app = express();

dotenv.config();

const PORT = process.env.SERVER_PORT || 1000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api', router);

const api_server = app.listen(PORT, () => console.log(`Server started at ${PORT}`));