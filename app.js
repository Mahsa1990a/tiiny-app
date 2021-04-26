const http = require("http");
const PORT = 8080;

// requestHandler: a callback function which handles requests and sends response\
// We read values from the request, and send a string back to the client using the response object
const requestHandler = function(request, response) {

  console.log('In requestHandler');
  // response.end(`Requested Path: ${request.url}\nRequest Method: ${request.method}`);

  if (request.url === "/") {
    response.end("Welcome!");
  } else if (request.url === "/urls") {
    response.end("www.lighthouselabs.ca\nwww.google.com");
  } else {
    response.statusCode = 404;
    response.end("404 Page not found");
  }
};

const server = http.createServer(requestHandler);    // createServer and listen funtions are non-blocking and will return immediately
console.log('Server created');

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

console.log('Last line (after .listen call)');