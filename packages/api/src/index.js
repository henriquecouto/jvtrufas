const express = require("express");
const app = express();
const port = 3000;

const { project, getAuthors } = require("jvtrufas-common");
app.get("/", (req, res) =>
  res.send(`Hello ${project.name} from ${getAuthors()}!`)
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
