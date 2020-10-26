/* eslint-disable space-before-function-paren */
const fs = require('fs')
const readLine = require('readline')
const path = require('path')
const Order = require('../entities/Order')
const { FILES_PATH } = require('../utils/constants')

class OrderRepository {
  constructor() {
    this.orders = []
  }

  async createFromFile(fileName) {
    const fileLines = readLine.createInterface({
      input: fs.createReadStream(path.join(FILES_PATH, fileName), { encoding: 'utf-8' }),
      terminal: false
    })

    for await (const line of fileLines) {
      this.orders = [...this.orders, new Order(...line.split(','))]
    }
  }

  find(filters = []) {
    filters = Array.isArray(filters) ? filters : [filters]
    if (!filters.length) return this.orders
    return this.orders.filter(order =>
      filters
        .map(({ property, checkFn, value }) => checkFn(order[property], value))
        .every(check => check === true)
    )
  }

  findById(orderId) { return this.orders.find(order => order.orderId === orderId) }

  update(orderId, { ...updateParams }) {
    const currentOrder = this.findById(orderId)
    Object.keys(updateParams).forEach(key => { currentOrder[key] = updateParams[key] })
  }
}

module.exports = OrderRepository
