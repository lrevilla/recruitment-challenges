const OrderRepository = require('./repositories/order.repository')
const { CHECK_FNS: { IS, IS_NOT, IS_NOT_IN } } = require('./utils/constants')

exports.Check = async fileName => {
  const ordersRepo = new OrderRepository()
  await ordersRepo.createFromFile(fileName)

  // Check and mark fraudulent orders
  const processedOrderIds = []
  ordersRepo.find().forEach(order => {
    ordersRepo.find([
      { property: 'isFraudulent', checkFn: IS, value: false },
      { property: 'orderId', checkFn: IS_NOT_IN, value: [...processedOrderIds, order.orderId] },
      { property: 'dealId', checkFn: IS, value: order.dealId },
      { property: 'creditCard', checkFn: IS_NOT, value: order.creditCard }
    ])
      .filter(machingOrder =>
        machingOrder.email === order.email ||
        machingOrder.getFullAddress() === order.getFullAddress()
      )
      .forEach(fraudulentOrder => ordersRepo.update(fraudulentOrder.orderId, { isFraudulent: true }))

    processedOrderIds.push(order.orderId)
  })

  return ordersRepo.find({ property: 'isFraudulent', checkFn: IS, value: true })
}
