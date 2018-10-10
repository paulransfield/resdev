const express = require('express');
const path = require('path');
const app = express();

const log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

// using app.use to use static files in my public 
// folder for the root level of the site
app.use('/', express.static('public'));

// getting port this way
const port = process.env.PORT || process.argv[2] || 80;
 
app.listen(port, function () {
     console.log('app up on port: ' + port);
});
