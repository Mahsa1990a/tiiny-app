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