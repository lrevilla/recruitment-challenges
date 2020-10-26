const FraudRadar = require('./FraudRadar')
const assert = require('assert')

describe('Fraud Radar', function () {
  it('Should process the one line file', function () {
    const result = FraudRadar.Check('OneLineFile.txt')
    assert.ok(result)
    assert.strictEqual(result.length, 0)
  })

  it('Should process the two line file in which the second is fraudulent', function () {
    const result = FraudRadar.Check('TwoLines_FraudulentSecond.txt')
    assert.ok(result)
    assert.strictEqual(result.length, 1)
    assert.strictEqual(result[0].isFraudulent, true)
    assert.strictEqual(result[0].orderId, 2)
  })

  it('Should process the three line file in which the second is fraudulent', function () {
    const result = FraudRadar.Check('ThreeLines_FraudulentSecond.txt')
    assert.ok(result)
    assert.strictEqual(result.length, 1)
    assert.strictEqual(result[0].isFraudulent, true)
    assert.strictEqual(result[0].orderId, 2)
  })

  it('Should process the four line file in which more than one order is fraudulent', function () {
    const result = FraudRadar.Check('FourLines_MoreThanOneFraudulent.txt')
    assert.ok(result)
    assert.strictEqual(result.length, 2)
  })
})
