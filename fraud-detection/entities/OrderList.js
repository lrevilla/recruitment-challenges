/* eslint-disable space-before-function-paren */
class OrderList {
  constructor(orders = []) {
    this.orders = []
    this.fraudulentOrders = []
    if (orders.length) orders.forEach(order => this.addOrder(order))
  }

  __orderIsFraudulent(currentOrder) {
    if (currentOrder.isFraudulent) return true
    if (!this.orders.length) return false

    const matchingOrders = this.orders
      .filter(order =>
        !order.isFraudulent &&
        order.orderId !== currentOrder.orderId &&
        order.dealId === currentOrder.dealId &&
        order.creditCard !== currentOrder.creditCard
      )
      .filter(order =>
        order.email === currentOrder.email ||
        order.getFullAddress() === currentOrder.getFullAddress()
      )

    if (matchingOrders.length) return true
    return false
  }

  addOrder(order) {
    order.isFraudulent = this.__orderIsFraudulent(order)
    this.orders = [...this.orders, order]
    if (order.isFraudulent) this.fraudulentOrders = [...this.fraudulentOrders, order]
  }

  getFraudulentOrders() { return this.fraudulentOrders }
}

module.exports = OrderList
