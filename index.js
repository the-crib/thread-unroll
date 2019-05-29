/* const http = require('http');
const PORT = process.env.PORT_NO || 3000;

const a = http.createServer()

a.listen(PORT);

a.on('listening', (err, res) => {
  console.log("listening on port", PORT);
  console.log("a:", a);
  console.log("Extra params:", err);
  console.log("Extra params 2:", res);
});

 */

 // Using Express
var express = require("express");
var path = require("path");

const app = express();

app.use('/', (req, res) => {
  res.send(200);
})

app.listen(3000, () => {
  console.log("listening on something");
})