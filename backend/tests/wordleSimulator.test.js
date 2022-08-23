const wordleSimulator = require('../wordleFunctions/simulator')

test('two same yellows and one different yellow', () => {
  expect(wordleSimulator('union', 'funny')).toBe('yybby')
})
test('two same yellows and one green', () => {
  expect(wordleSimulator('ginny', 'gnawn')).toBe('gbyyb')
})
test('no match', () => {
  expect(wordleSimulator('soare', 'unfit')).toBe('bbbbb')
})
test('three different yellows', () => {
  expect(wordleSimulator('thing', 'unfit')).toBe('ybyyb')
})
test('three different yellows and one green', () => {
  expect(wordleSimulator('cutin', 'unfit')).toBe('byygy')
})
test('exact match', () => {
  expect(wordleSimulator('unfit', 'unfit')).toBe('ggggg')
})
test('yellow on only one of same character', () => {
  expect(wordleSimulator('truss', 'slime')).toBe('bbbyb')
})
