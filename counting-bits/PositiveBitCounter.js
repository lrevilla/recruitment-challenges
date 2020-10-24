exports.Count = input => {
  if (isNaN(input)) throw new TypeError()
  const integerInput = BigInt(input, 10)
  if (integerInput < 0 || integerInput === Infinity) throw new RangeError()

  // const binaryInputDigits = [...integerInput.toString(2)].reverse()
  const binaryInputDigits = [...integerInput.toString(2)].reverse()
  let count = 0
  const indexes = []
  binaryInputDigits.forEach((digit, index) => {
    if (parseInt(digit) === 1) {
      count += 1
      indexes.push(index)
    }
  })

  return [count, ...indexes]
}
