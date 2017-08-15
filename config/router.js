// Controllers
const UserController = require('../controllers/user')
const InvoiceController = require('../controllers/invoice')
const ensureAuthenticated = UserController.ensureAuthenticated

module.exports = ({app}) => {
  app.post('/api/login', UserController.loginPost)

  app.get('/api/invoice', ensureAuthenticated, InvoiceController.all)
  app.get('/api/invoice/:id', ensureAuthenticated, InvoiceController.one)
  app.post('/api/invoice', ensureAuthenticated, InvoiceController.create)
  app.put('/api/invoice/:id', ensureAuthenticated, InvoiceController.patch)
  app.delete('/api/invoice/:id', ensureAuthenticated, InvoiceController.delete)
}

