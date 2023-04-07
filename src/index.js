const express = require('express');

const app = express();

const routes = require("./routes")
const middlewareLogRequest = require('./middleware/logs')

app.use(express.json());

app.use('/', routes);

app.use(middlewareLogRequest);

app.listen(4000, () => {
    console.log('server running port 4000')
})
