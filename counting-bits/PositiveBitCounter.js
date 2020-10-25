const BINARY_MASKS = {
  GROUP_BY_1_BIT: { dec: 1, hex: 0x55555555 }, // 1010101010101010... in hexadecimal
  GROUP_BY_2_BITS: { dec: 2, hex: 0x33333333 }, // 1100110011001100... in hexadecimal
  GROUP_BY_4_BITS: { dec: 4, hex: 0x0F0F0F0F }, // 1111000011110000... in hexadecimal
  GROUP_BY_8_BITS: { dec: 8, hex: 0x0F0F0F0F }, // 1111111100000000... in hexadecimal
  GROUP_BY_16_BITS: { dec: 16, hex: 0x0000FFFF } // 1111111111111111... in hexadecimal
}

const findIndexOfBitAtPossition = (number, position) => {
  let index = 0
  while (number) {
    if (number & 1) position--
    if (!position) return index
    index += 1
    number = number >> 1
  }
  return -1
}

exports.Count = input => {
  if (isNaN(input)) throw new TypeError()
  const integerInput = BigInt(input, 10)
  if (integerInput < 0 | integerInput === Infinity) throw new RangeError()

  let bitCount = input - ((input >> 1) & BINARY_MASKS.GROUP_BY_1_BIT.hex)
  bitCount = ((bitCount >> BINARY_MASKS.GROUP_BY_2_BITS.dec) & BINARY_MASKS.GROUP_BY_2_BITS.hex) +
    (bitCount & BINARY_MASKS.GROUP_BY_2_BITS.hex)
  bitCount = ((bitCount >> BINARY_MASKS.GROUP_BY_4_BITS.dec) + bitCount) & BINARY_MASKS.GROUP_BY_4_BITS.hex
  bitCount = ((bitCount >> BINARY_MASKS.GROUP_BY_8_BITS.dec) + bitCount) & BINARY_MASKS.GROUP_BY_8_BITS.hex
  bitCount = ((bitCount >> BINARY_MASKS.GROUP_BY_16_BITS.dec) + bitCount) & BINARY_MASKS.GROUP_BY_16_BITS.hex

  const indexes = Array.from({ length: bitCount })
    .map((item, index) => findIndexOfBitAtPossition(input, index + 1))
    .filter(bitIndex => bitIndex >= 0)

  return [indexes.length, ...indexes]
}
