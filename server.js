const express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    dotenv = require('dotenv'),
    React = require('react'),
    moment = require('moment'),
    request = require('request'),
    webpack = require('webpack'),
    config = require('./webpack.config'),
    db = require("./config/db"),
    router = require("./config/router"),
    ssr = require("./config/ssr"),
    jwtParser = require("./config/jwt"),
    seed = require("./seed")


require('babel-core/register');
require('babel-polyfill');

dotenv.load();

const app = express();
const compiler = webpack(config);

db.setup().then(() => seed()).catch(() => {
    console.error('Couldn\'t connect to mongodb. Make sure mongodb is running.');
    process.exit(1);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwtParser());

router({app})

if (app.get('env') === 'development') {
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(ssr());


if (app.get('env') === 'production') {
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}

app.listen(app.get('port'), function () {
    console.log('Server is running on port ' + app.get('port'));
});

module.exports = app;
