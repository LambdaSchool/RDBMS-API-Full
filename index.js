const server = require('./server');

const port = 4400;
server.listen(port, function() {
  console.log(`\n=== Lambda Server API listening on http://localhost:${port}`)
});