require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')
// const knex = require('../../config/knex')
const swaggerUi = require('swagger-ui-express');
const HomeRouter = require('./home/home.router')
const BoardRouter = require('./board/board.router')
const CardRouter = require('./card/card.router')

const docs = require('./../docs');
const { authenticateToken } = require("./middleware/auth.middleware");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs, {}));

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true ,limit: '50mb'}));

// const corsOptions = {
//     origin: process.env.CLIENT_URL,
//   };

app.use(cors());

app.use("/api", HomeRouter);
app.use("/api/board", authenticateToken, BoardRouter);
app.use("/api/card", authenticateToken, CardRouter);



app.listen(process.env.PORT, () => {
    console.log("Server up and running on " + "http://localhost:3001");
  });