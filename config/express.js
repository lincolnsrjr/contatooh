// config/express.js
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function() {
    var app = express();

    // configuração de ambiente
    app.set('port', 3000);

    // middleware
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.set('view engine', 'ejs');
    app.set('views', '../app/views/');

    app.use(cookieParser());
    app.use(session({
        secret: 'homem avestruz',
        resave: true,
        saveUninitialized: true
    }));
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.disable('x-powered-by');

    load('models', {
            cwd: 'app'
        })
        .then('controllers')
        .then('routes/auth.js')
        .then('routes')
        .into(app);

    app.get('*', function(req, res) {
        res.status(404).render('teste');
    });

    return app;
};
