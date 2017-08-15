const Invoice = require('../models/Invoice')
const R = require('ramda')
const validation = require('../services/validation')

module.exports = {
  all: async (req, res) => {
    try {
      const invoices = await Invoice.find().populate('createdBy').exec()
      res.json(invoices)
    } catch (e) {
      res.status(500).json(err)
    }
  },

  create: async (req, res) => {
    try {
      const data = R.pick(["number", "items"])(req.body)
      data.createdBy = req.user
      const invoice = new Invoice(data)
      await invoice.save()
      return res.json({
        message: "New invoice has been created successfully.",
        data: invoice
      })
    } catch (err) {
      console.log("err", err)

      if (err.name === "ValidationError") {
        return res.json(validation(err))
      }

      return res.status(500).json(err)
    }
  },

  one: async (req, res) => {
    const id = req.params['id']

    try {
      const invoice = await Invoice.findOne({_id: id}).exec()
      res.json(invoice)
    } catch (e) {
      res.status(500).json(err)
    }
  },

  patch: async (req, res) => {
    const id = req.params['id']

    try {
      const data = R.pick(["number", "items"])(req.body)
      data.items = R.map(
        R.pick(["name", "quantity", "rate"])
      )(data.items)
      const response = await Invoice.findByIdAndUpdate(id, {
        $set: data
      }, {new: true})

      if (response)
        return res.json({
          message: "Successfully modified",
          data: response
        })
      else
        return res.status(400).json({
          message: `No response exists with id ${id}`
        })

    } catch (err) {
      console.log("invoice patch", err)
      if (err.name === "ValidationError") {
        return res.json(validation(err))
      } else if (err.name === "CastError") {
        return res.status(400).json({
          message: `No record exists with id ${id}`
        })
      }

      return res.status(500).json(err)
    }
  },
  delete: async (req, res) => {
    try {
      if (req.user.role !== "ADMIN") return res.status(401).json({
        message: "You are not authorized to perform this action."
      })

      const id = req.params['id']
      const response = await Invoice.remove({_id: id}).exec()

      if (!response.result.n) {
        return res.status(400).json({
          message: `No record exists with id ${id}`
        })
      } else {
        return res.json({
          message: "Successfully deleted"
        })
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}