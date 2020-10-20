/* eslint-disable space-before-function-paren */
const { STREET_TYPES, STATES } = require('../utils/constants')

class Order {
  constructor(orderId, dealId, email, street, city, state, zipCode, creditCard) {
    this.orderId = Number(orderId)
    this.dealId = Number(dealId)
    this.email = email.toLowerCase()
    this.street = street.toLowerCase()
    this.city = city.toLowerCase()
    this.state = state.toLowerCase()
    this.zipCode = zipCode
    this.creditCard = creditCard
    this.isFraudulent = false

    this.normalize()
  }

  normalize() {
    const state = Object.values(STATES).find(stateValue => stateValue.SHORT === this.state)
    this.state = state?.LONG ? state.LONG : this.state

    this.street = this.street
      .replace(STREET_TYPES.STREET.SHORT, STREET_TYPES.STREET.LONG)
      .replace(STREET_TYPES.ROAD.SHORT, STREET_TYPES.ROAD.LONG)

    let [recipient, domain] = this.email.split('@')
    recipient = recipient.replace('.', '')
    const recipientMatch = recipient.match(/^(?<recipient>\w+)((?<plus_symbol_fragment>\+\w+)|)/)
    if (recipientMatch.groups && recipientMatch.groups.recipient) recipient = recipientMatch.groups.recipient

    this.email = `${recipient}@${domain}`
  }

  getFullAddress() { return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}` }

  toSimpleOutput() { return { orderId: this.orderId, isFraudulent: this.isFraudulent } }
}

module.exports = Order
