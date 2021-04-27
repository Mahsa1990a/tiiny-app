const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 8080; // default port 8080

app.set("view engine", "ejs"); // This tells the Express app to use EJS as its templating engine
app.use(bodyParser.urlencoded({ 
  extended: false 
}));


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// Generating a "unique" shortURL
function generateRandomString() {
  //Math.random().toString(36).substr(2, length)
  return Math.random().toString(36).substr(2, 6);
}
// console.log(generateRandomString())

/////////////////////////////////////////////////////////////////////////////////////

// @ route            GET /
// @ description      Home page
// @ access           Public
app.get("/", (req, res) => {
  res.send("Hello!");
});

// @ route            GET /urls
// @ description      showing urls
// @ access           Public
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

// @ route            GET /urls/new (Should ebe above app.get("/urls/:id", ...) // routes should be ordered from most specific to least specific)
// @ description      To present the form to the user
// @ access           Public
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

// @ route            POST /urls
// @ description      To handle the form submission
// @ access           Public
app.post("/urls", (req, res) => {
  console.log("req.body:", req.body); // Log the POST request body to the console // req.body:{ longURL: 'http://google.com' } it's what you typesd in browser
  //                                                                                       This longURL is what we put in input attribute as name
  res.send("Ok");
});

// @ route            GET /urls:shortURL
// @ description      display a single URL and its shortened form  // :id means this part of the url will be available in the req.params object
// @ access           Public
app.get("/urls/:shortURL", (req, res) => {

  // const templateVars = { 
  //   shortURL: req.params.shortURL, 
  //   longURL: urlDatabase[req.params.shortURL]
  // };   OR
  
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  const templateVars = { 
    shortURL, 
    longURL
  };
  console.log("req.params", req.params); //{ shortURL: 'b2xVn2' }
  console.log(shortURL); //b2xVn2
  console.log(longURL); //http://www.lighthouselabs.ca


  res.render("urls_show", templateVars);
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