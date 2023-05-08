const express = require("express");
const app = express();
const { port = 3000 } = process.env;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use(usersRouter);
app.use(cardsRouter);

app.use((req, res) => {
  res.status(404).send("Requested resource not found");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
