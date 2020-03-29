const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { project } = require("jvtrufas-common");

// MONGOOSE CONFIG
mongoose.connect("mongodb://localhost:27017/jvtrufas", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", error => {
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

app.listen(port, () =>
  console.log(`API listening on http://localhost:${port}!`)
);
