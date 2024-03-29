const express = require("express");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const bodyParser = require("body-parser");
const { project } = require("jvtrufas-common");
const path = require("path");
const cors = require("cors");

// MONGOOSE CONFIG
mongoose.connect("mongodb://localhost:27017/jvtrufas", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
autoIncrement.initialize(db);
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("db connected");
});

// APP CONFIG
const port = 3030;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/auth", require("./routes/UserRouter"));
app.use("/admin", require("./routes/AdminRouter"));
app.use("/purchaser", require("./routes/PurchaserRouter"));

app.get("/", (req, res) =>
  res.send(`
<h1>${project.name} API made by ${project.author.name}!</h1>
Email: <a href="mailto:${project.author.email}">${project.author.email}</a>
Site: <a href="https://${project.author.url}" target="blank">${project.author.url}</a>
`)
);

app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.get("/termos-de-uso", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "docs/useTerms.html"));
});

app.get("/politicas-de-privacidade", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "docs/privacyPolicy.html"));
});

app.listen(port, () =>
  console.log(`API listening on 'http://localhost:${port}'!`)
);
