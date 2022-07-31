require('dotenv').config()
const express = require("express");
const corsMiddleWare = require("cors");

const app = express();
const PORT = 4000;

app.use(corsMiddleWare({
  preflightContinue: true,
  origin: process.env.frontEndServer,
  credentials: true,
}));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.listen( process.env.PORT || PORT, () => {
  console.log(`Listening on port: ${process.env.PORT || 4000}`);
})

app.get("/", async(req, res) => {
  res.send("Welcome to my server!");
});

app.get("/cards", async(req, res) => {
  res.send("")
})

/*
  Endpoints to make
  TODO:
  - implement GET and send it.
  - Hook up front-end to get data from server
  - create post endpoint
  - hook it up
  - create del endpoint
  - hook it up

  - figure out sockets

*/