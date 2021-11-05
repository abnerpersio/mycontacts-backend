const express = require('express');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');
require('express-async-errors');

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(4000, () => console.log('server started'));