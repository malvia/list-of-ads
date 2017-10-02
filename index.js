

// Environment Checks
require('checkenv').check();

// Ensuring $NODE_PATH is set
var enforceNodePath = require('enforce-node-path');
enforceNodePath(__dirname);

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Configuring the App
app.set('port', (process.env.PORT || 9292));

if (process.env.NODE_ENV=='development'){
	// Static URL
	app.use('/app/', express.static(path.resolve('app/')));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
        // Set permissive CORS header - this allows this server to be used only as
        // an API server in conjunction with something like webpack-dev-server.
        res.setHeader('Access-Control-Allow-Origin', '*');
    	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        // Disable caching so we'll always get the latest comments.
        res.setHeader('Cache-Control', 'no-cache');
        next();
});

// Connecting to the app router
var router = require('server/router');
app.use('/', router);

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
	res.redirect(302,'/oops/404');
});

// Debug when the server starts
app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

module.exports = app;
