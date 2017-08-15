var async = require('async')
var crypto = require('crypto')
var nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken')
var moment = require('moment')
var request = require('request')
var qs = require('querystring')
var User = require('../models/User')

function generateToken(user) {
  const payload = {
    iss: 'test.8byte.com',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}

exports.ensureAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send({msg: 'Unauthorized'})
  }
}

/**
 * POST /login
 * Sign in with email and password
 */
exports.loginPost = async (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('email', 'Email cannot be blank').notEmpty()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({remove_dots: false})

  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  User.findOne({email: req.body.email}, function (err, user) {
    if (!user) {
      return res.status(401).send({
        msg: 'The email address ' + req.body.email + ' is not associated with any account. ' +
        'Double-check your email address and try again.'
      })
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({msg: 'Invalid email or password'})
      }
      res.send({token: generateToken(user), user: user.toJSON()})
    })
  })
}
