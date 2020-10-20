const fs = require('fs')
const path = require('path')
const Order = require('./entities/order')
const OrderList = require('./entities/OrderList')
const { FILES_PATH } = require('./utils/constants')

exports.Check = fileName => {
  // READ FRAUD LINES
  const fileContent = fs.readFileSync(path.join(FILES_PATH, fileName), 'utf8')
  const lines = fileContent.split('\n')
  const orders = lines.map(line => new Order(...line.split(',')))

  const orderList = new OrderList(orders)
  return orderList.getFraudulentOrders()
}
