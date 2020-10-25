const PositiveBitCounter = require('./PositiveBitCounter')
const assert = require('assert')

describe('PositiveBitCounter', function () {
  it('Should return a RangeError when a negative value is supplied', function () {
    assert.throws(() => PositiveBitCounter.Count(-2), error => error instanceof RangeError)
  })

  it('Should return a RangeError when a Infinity value is supplied', function () {
    assert.throws(() => PositiveBitCounter.Count(Infinity), error => error instanceof RangeError)
  })

  it('Should return a TypeError when a not-number value is supplied', function () {
    assert.throws(() => PositiveBitCounter.Count('thisIsNotANumber'), error => error instanceof TypeError)
  })

  it('Should return zero occurrences for input = 0', function () {
    const expected = [0]
    const actual = PositiveBitCounter.Count(0)
    assert.deepStrictEqual(actual, expected)
  })

  it('Should return the expected count for input = 1', function () {
    const expected = [1, 0]
    const actual = PositiveBitCounter.Count(1)
    assert.deepStrictEqual(actual, expected)
  })

  it('Should return the expected count for input = 161', function () {
    const expected = [3, 0, 5, 7]
    const actual = PositiveBitCounter.Count(161)
    assert.deepStrictEqual(actual, expected)
  })

  it('Should return the expected count for input = 2147483647', function () {
    const expected = [
      31, 0, 1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14, 15, 16,
      17, 18, 19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30
    ]

    const actual = PositiveBitCounter.Count(2147483647)
    assert.deepStrictEqual(actual, expected)
  })
})
