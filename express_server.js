const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const PORT = 8080; // default port 8080

app.set("view engine", "ejs"); // This tells the Express app to use EJS as its templating engine
app.use(bodyParser.urlencoded({ 
  extended: false 
}));
app.use(cookieParser());

//It's an object with shortURL keys and longURL values
// const urlDatabase = {
//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com"
// };

//Update urlDatabase obj, keep shortURL as the key, change the value to an object that has longURL and userID keys itself:
const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};

// Generating a "unique" shortURL
function generateRandomString() {
  //Math.random().toString(36).substr(2, length)
  return Math.random().toString(36).substr(2, 6);
};
// console.log(generateRandomString())

// Create users Obj  //In order to store our users, we'll need a "data store" 
const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

/////////////////////////////////////////////////////////////////////////////////////

// @ route            GET /
// @ description      Home page
// @ access           Public
app.get("/", (req, res) => {
  res.send("Hello!");
});

//helper Function : returns the URLs where the userID is equal to the id of the currently logged-in user
const urlsForUser = (id) => {
  let urlsOfUsers = {};
  for (let key in urlDatabase) {
    if (urlDatabase[key].userID === id) {
      urlsOfUsers[key] = urlDatabase[key];
    }
  }
  return urlsOfUsers;
};

// @ route            GET /urls
// @ description      showing urls
// @ access           Public
app.get("/urls", (req, res) => {

  const user1 = users[req.cookies.user_id] ? users[req.cookies.user_id].id : ""; //if ture => return id
  const user = user1 ? users[req.cookies.user_id].email : "";

  if(!user1) {
    return res.redirect('/login');
  }
  const urlOfTheUsers = urlsForUser(user1); //URLs where the userID is equal to the id of the currently logged-in user

  const templateVars = { 
    // urls: urlDatabase, update to:
    urls: urlOfTheUsers,
    // username: req.cookies["username"] //by passing username to each EJS template, it knows if the user is logged in and what their username is
    // user: req.cookies['user_id']
    user: user
  };
  res.render("urls_index", templateVars);
});

// @ route            GET /urls/new (Should ebe above app.get("/urls/:id", ...) // routes should be ordered from most specific to least specific)
// @ description      To present the form to the user
// @ access           Public
app.get("/urls/new", (req, res) => {

  const user = users[req.cookies.user_id] ? users[req.cookies.user_id].email : "";
  const templateVars = { 
    // username: req.cookies["username"] //by passing username to each EJS template, it knows if the user is logged in and what their username is
    // user: req.cookies['user_id'] after defining user update to :
    user
  };

  if (!user) { //if user is not logged in
    return res.redirect("/login");
  }
  res.render("urls_new", templateVars);
});

// @ route            POST /urls
// @ description      To handle the form submission
// @ access           Public
app.post("/urls", (req, res) => {
  // console.log("req.body:", req.body); // Log the POST request body to the console // req.body:{ longURL: 'http://google.com' } it's what you typesd in browser
  //                                                                                       This longURL is what we put in input attribute as name
  const shortURL = generateRandomString();
  const longURL = req.body.longURL;

  // Save the longURL and shortURL to our urlDatabase
  // urlDatabase[shortURL] = longURL;  update:
  // console.log(longURL);
  urlDatabase[shortURL] = {
    longURL,
    userID: req.cookies.user_id
  }

  res.redirect(`/urls/${shortURL}`);
});

// @ route            GET /urls
// @ description      To handle shortURL requests and redirect to its longURL
// @ access           Public
app.get("/u/:shortURL", (req, res) => {
  // Requests to the endpoint "/u/:shortURL" will redirect to its longURL
  const shortURL = req.params.shortURL;
  // const longURL = urlDatabase[shortURL]; // or directly urlDatabase[req.params.shortURL]  // update it after update urlDatabase obj
  const longURL = urlDatabase[shortURL].longURL;
  res.redirect(longURL);
});

// @ route            GET /urls:shortURL
// @ description      display a single URL and its shortened form  // :id means this part of the url will be available in the req.params object
// @ access           Public
app.get("/urls/:shortURL", (req, res) => {

  const user = users[req.cookies.user_id] ? users[req.cookies.user_id].email : "";
  if (!user) {
    return res.redirect('/login');
  }
  const urlOfTheUsers = urlsForUser(user);
  
  // const templateVars = { 
  //   shortURL: req.params.shortURL, 
  //   longURL: urlDatabase[req.params.shortURL]
  // };   OR
  
  const shortURL = req.params.shortURL;
  // const longURL = urlDatabase[shortURL]; update after updating urlDatabase obj
  const longURL = urlDatabase[shortURL].longURL;

  const templateVars = { 
    shortURL, 
    longURL,
    // username: req.cookies["username"] //by passing username to each EJS template, it knows if the user is logged in and what their username is
    // user: req.cookies['user_id'] update to:
    user,
    urlOfTheUsers
  };

  // if (urlDatabase[shortURL] && req.cookies.user_id !== urlDatabase[shortURL].userID) {
  //   res.status(400).send("<h1> 🛑 It Doesn't belong you! 🛑 </h1>")
  // }
  // console.log("req.params", req.params); //{ shortURL: 'b2xVn2' }
  // console.log(shortURL); //b2xVn2
  // console.log(longURL); //http://www.lighthouselabs.ca


  res.render("urls_show", templateVars);
});

// @ route            POST /urls/:shortURL/delete
// @ description      Delete url
// @ access           Public
app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL; //delete this would be enough because it's a key
  // delete urlDatabase[shortURL]; update to give access for owner od URL to delete

  if (urlDatabase[shortURL] && req.cookies.user_id === urlDatabase[shortURL].userID) {
    delete urlDatabase[shortURL];
    res.redirect("/urls");
  } else {
    res.status(403).send("<h1> 🛑 You must be logged in to DELETE URLs! 🛑 </h1>");
  }
  // res.redirect("/urls");
});

// @ route            POST /urls/:id
// @ description      Update url
// @ access           Public
app.post("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = req.body.longURL;
  // urlDatabase[shortURL] = longURL; //update longURL //update

  if (urlDatabase[shortURL] && req.cookies.user_id === urlDatabase[shortURL].userID) {
    urlDatabase[shortURL] = {
      longURL,
      userID: req.cookies.user_id
    };
    res.redirect("/urls");
  } else {
    res.status(403).send("<h1> 🛑 You must be logged in to EDIT URLs! 🛑 </h1>");
  }
});

// @ route            GET /register
// @ description      Registration Page
// @ access           Public
app.get("/register", (req, res) => {
  const templateVars = { 
    // username: req.cookies["username"] //by passing username to each EJS template, it knows if the user is logged in and what their username is
    user: req.cookies['user_id']
  };
  res.render("register", templateVars);
});

//helper Func: for POST Register
const fetchEmail = function(database, email) {
  for (let key in database) { //database is users so key => id = userRandomID,user2RandomID,ed5f5p(for newUser)
    // console.log("Key from line 180", key);
    // console.log("database[key] from line 180", database[key]); //{ id: 'mb3dt1', email: 'amerimahsa@yahoo.com', password: '123' }

    if (database[key].email === email) {
      return database[key];  //{id: ..., email: ..., pass: ...}
    }
  } return false;
};

// @ route            POST /register
// @ description      Registration Page
// @ access           Public
app.post("/register", (req, res) => {
  
  // console.log("req.body of POST /register", req.body); //{ email: 'amerimahsa@yahoo.com', password: '123'}

  const randomId = generateRandomString();
  const email = req.body.email;
  const password = req.body.password; // OR const {email, password} = req.body;

  if (email.length === 0 || password.length === 0) {
    return res.status(400).send("<h1> 🛑 Email or Password is invalid! 🛑 </h1>");
  } else if (fetchEmail(users, email)) { //If someone tries to register with an email that is already in the users object
    return res.status(400).send("<h1> 🛑 Email is already in use! 🛑 </h1>");
  }

  const user = {
    id: randomId,
    email,
    password
  };
  users[randomId] = user;

  // console.log("users from line 189",users)

  //set a user_id cookie containing the user's newly generated ID
  res.cookie('user_id', randomId);
  res.redirect("/urls");
  
});

// @ route            GET /login
// @ description      Login Page
// @ access           Public
app.get("/login", (req, res) => {
  const templateVars = { 
    // username: req.cookies["username"] //by passing username to each EJS template, it knows if the user is logged in and what their username is
    user: req.cookies['user_id']
  };
  res.render("login", templateVars);
});

// @ route            POST /login
// @ description      It should set a cookie named username to the value submitted in the request body via the login form
// @ access           Public
app.post("/login", (req, res) => {

  // It should set a cookie named username to the value submitted in the request body via the login form
  // console.log(req.body.username); will show what ever we put inside box in browser

  // res.cookie('username', req.body.username); 
  
  const email = req.body.email;
  const password = req.body.password;
  const user = fetchEmail(users, email);

  if (email.length === 0 || password.length === 0) {
    return res.status(403).send("<h1> 🛑 Email or Password is invalid! 🛑 </h1>");
  } else if (!user || user.password !== password) {
    return res.status(403).send("<h1> 🛑 User or Password is NOT MATCH!!! 🛑 First Register </h1>"); 
  }
  res.cookie('user_id', user.id); //else : user exist and password matchs
  res.redirect("/urls");
});

// @ route            POST /logout
// @ description      It clears the username cookie and redirects the user back to the /urls page
// @ access           Public
app.post("/logout", (req, res) => {

  // res.clearCookie('username', req.body.username); //or res.clearCookie("username") only the key
  //Modify the logout endpoint to clear the correct user_id cookie instead of the username one:
  res.clearCookie('user_id');
  res.redirect("/urls");

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