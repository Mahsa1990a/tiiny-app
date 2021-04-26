const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs"); // This tells the Express app to use EJS as its templating engine


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// @ route            GET /
// @ description      Home page
// @ access           Public
app.get("/", (req, res) => {
  res.send("Hello!");
});

// @ route            GET /hello
// @ description      it is an example
// @ access           Public
app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

// @ route            GET /urls.json
// @ description      JSON string representing the entire urlDatabase object
// @ access           Public
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}! 😎`);
});