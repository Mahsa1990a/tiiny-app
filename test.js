// Test for GET /urls
const templateVars = {
  urls: {
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xK": "http://www.google.com"
  }
};

console.log(templateVars.urls);

for (let url in templateVars.urls) {
  console.log(url); //b2xVn2 //9sm5xK
  console.log(templateVars.urls[url]); //http://www.lighthouselabs.ca //http://www.google.com
}
//////////////////////////////////////////////////////////////////////////

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const shortURL = "u3uzs0";
urlDatabase[shortURL] = 'http://google.com';

console.log(urlDatabase); // will be:
// {
//   b2xVn2: 'http://www.lighthouselabs.ca',
//   '9sm5xK': 'http://www.google.com',
//   u3uzs0: 'http://google.com'
// }

/////////////////////////////////////////////////////////////////////////

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

let user = users["user3RandomID"]
user = {
  id: "user3RandomID", 
  email: "user3@example.com", 
  password: "dishwasher-funk3"
};

console.log(users);

/////////////////////////////////////////////////////////////////

const urlDatabase1 = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};

console.log(urlDatabase1.b6UTxQ.longURL)