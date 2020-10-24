const FraudRadar = require('./FraudRadar')
const assert = require('assert')

const ORDER_FILE_NAMES = {
  ONE_LINE: 'OneLineFile.txt',
  TWO_LINES: 'TwoLines_FraudulentSecond.txt',
  THREE_LINES: 'ThreeLines_FraudulentSecond.txt',
  FOUR_LINES: 'FourLines_MoreThanOneFraudulent.txt'
}

describe('Fraud Radar', function () {
  it('Should process the one line file', async function () {
    const result = await FraudRadar.Check(ORDER_FILE_NAMES.ONE_LINE)
    assert.ok(result)
    assert.strictEqual(result.length, 0)
  })

  it('Should process the two line file in which the second is fraudulent', async function () {
    const result = await FraudRadar.Check(ORDER_FILE_NAMES.TWO_LINES)
    assert.ok(result)
    assert.strictEqual(result.length, 1)
    assert.strictEqual(result[0].isFraudulent, true)
    assert.strictEqual(result[0].orderId, 2)
  })

  it('Should process the three line file in which the second is fraudulent', async function () {
    const result = await FraudRadar.Check(ORDER_FILE_NAMES.THREE_LINES)
    assert.ok(result)
    assert.strictEqual(result.length, 1)
    assert.strictEqual(result[0].isFraudulent, true)
    assert.strictEqual(result[0].orderId, 2)
  })

  it('Should process the four line file in which more than one order is fraudulent', async function () {
    const result = await FraudRadar.Check(ORDER_FILE_NAMES.FOUR_LINES)
    assert.ok(result)
    assert.strictEqual(result.length, 2)
    const fraudulentOrderIds = [2, 4]
    result.forEach((order, index) => {
      assert.strictEqual(order.isFraudulent, true)
      assert.strictEqual(order.orderId, fraudulentOrderIds[index])
    })
  })
})
