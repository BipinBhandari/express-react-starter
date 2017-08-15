const R = require('ramda');

//TODO
module.exports = (error) => {
    return error.errors ? error.errors : error
}