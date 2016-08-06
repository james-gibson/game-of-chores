'use strict';

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config.json');
const routeManagement = require('deepthought-routing');

// Set up global singletons ~ugly yes but requiring a logger in every file....meh
const logger = require('technicolor-logger');
logger.init(config)
global.Logger = logger;


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/client/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(__dirname + '/public'));


routeManagement.setup(app, config);

app.get('/', (req, res) => {
    res.render('index', {});
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    // this forces the html routing on the client ~ dirty
    Logger.debug('[App] Unknown route {' + req.url + '}, redirecting to /');
    res.redirect('/');

    // var err = new Error('Not Found');
    // err.status = 404;
    // next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err.status || 500);
        Logger.error(err);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);
    Logger.error(err);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

Logger.info('[App] Initialized');
module.exports = app;

