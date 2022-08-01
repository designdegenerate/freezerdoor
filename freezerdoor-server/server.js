require("dotenv").config();

//Express
const http = require("http");
const express = require("express");
const app = express();
const corsMiddleWare = require("cors");
const Card = require("./models").card;
const PORT = 4000;

//Socket
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.frontEndServer,
    methods: ["GET", "POST"],
  },
});

app.use(corsMiddleWare());

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

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
    io.sockets.emit("post", newCard);
    res.send("");
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

app.delete("/cards/:id", async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id);
    await card.destroy();
    io.sockets.emit("delete", {id: req.params.id});
    res.send("");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something bad happened");
  }
});

io.on("connection", (socket) => {
  console.log("user connected");

  // socket.on("post", (data) => {
  //   console.log(data);
  //   io.emit("post", data);
  // });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server Listening on port: ${PORT}`);
});
