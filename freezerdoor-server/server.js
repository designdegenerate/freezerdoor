require("dotenv").config();
const express = require("express");
const corsMiddleWare = require("cors");
const Card = require("./models").card;

const app = express();
const PORT = 4000;

app.use(corsMiddleWare());

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port: ${process.env.PORT || 4000}`);
});

app.get("/cards", async (req, res) => {
  try {
    const cards = await Card.findAll();
    res.send(cards);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something bad happened");
  }
});

app.post("/cards", async (req, res) => {
  try {
    const newCard = await Card.create({ ...req.body });
    res.send(newCard);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something bad happened");
  }
});

app.patch("/cards/:id", async (req, res) => {
  try {
    if (!req.body.x || !req.body.y) {
      return res
        .status(400)
        .send("No coordinates were included in the request");
    }
    const card = await Card.findByPk(req.params.id);
    await card.update({ x: req.body.x, y: req.body.y });
    res.send("");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something bad happened");
  }
});

app.delete("/cards/:id", async(req, res) => {
  try {
    const card = await Card.findByPk(req.params.id);
    await card.destroy();
    res.send("");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something bad happened");
  }
})

/*
  Endpoints to make
  TODO:
  - create del endpoint
  - hook it up

  - figure out sockets

*/
