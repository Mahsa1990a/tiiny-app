const http = require("http");
const PORT = 8080;

// requestHandler: a callback function which handles requests and sends response\
// We read values from the request, and send a string back to the client using the response object
const requestHandler = function(request, response) {
  response.end(`Requested Path: ${request.url}\nRequest Method: ${request.method}`);
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});