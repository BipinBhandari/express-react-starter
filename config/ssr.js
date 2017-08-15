require('babel-core/register');
require('babel-polyfill');

const ReactDOM = require('react-dom/server');
const Router = require('react-router');
const Provider = require('react-redux').Provider;
const configureStore = require('../app/store/configureStore').default;
const routes = require('../app/routes');
React = require('react'),

module.exports = () => (req, res, next) => {
    const initialState = {
        auth: {token: req.cookies.token, user: req.user},
        messages: {}
    };

    const store = configureStore(initialState);

    Router.match({routes: routes.default(store), location: req.url}, function (err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Provider, {store: store},
                React.createElement(Router.RouterContext, renderProps)
            ));
            res.render('layout', {
                html: html,
                initialState: store.getState()
            });
        } else {
            res.sendStatus(404);
        }
    });
}