const fs = require('fs')
const path = require('path')
const { FILES_PATH } = require('./utils/constants')
const { Order } = require('./entities/order')

exports.Check = fileName => {
  // READ FRAUD LINES
  const fileContent = fs.readFileSync(path.join(FILES_PATH, fileName), 'utf8')
  const lines = fileContent.split('\n')
  const orders = lines.map(line => new Order(...line.split(',')))

  // CHECK FRAUD
  orders.forEach(currentOrder => {
    if (currentOrder.isFraudulent) return

    orders
      .filter(order =>
        order.dealId === currentOrder.dealId &&
        order.orderId !== currentOrder.orderId &&
        order.creditCard !== currentOrder.creditCard
      )
      .filter(order =>
        order.email === currentOrder.email ||
        order.getFullAddress() === currentOrder.getFullAddress()
      )
      .forEach(order => { order.isFraudulent = true })
  })

  return orders
    .filter(order => order.isFraudulent)
    .map(order => order.toSimpleOutput())
}
