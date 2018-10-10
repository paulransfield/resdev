const express = require('express'),
path = require('path'),
app = express(),
 
// getting port this way
port = process.env.PORT || process.argv[2] || 80;
 
// using app.use to use static files in my public 
// folder for the root level of the site
app.use('/', express.static('public'));
 
app.listen(port, function () {
     console.log('app up on port: ' + port);
});
