const wordleSimulator = require('../wordleFunctions/simulator')

test('two same yellows and one different yellow', () => {
  expect(wordleSimulator('funny', 'union')).toBe('🟨🟨⬛⬛🟨')
})
test('two same yellows and one green', () => {
  expect(wordleSimulator('gnawn', 'ginny')).toBe('🟩⬛🟨🟨⬛')
})
test('no match', () => {
  expect(wordleSimulator('unfit', 'soare')).toBe('⬛⬛⬛⬛⬛')
})
test('three different yellows', () => {
  expect(wordleSimulator('unfit', 'thing')).toBe('🟨⬛🟨🟨⬛')
})
test('three different yellows and one green', () => {
  expect(wordleSimulator('unfit', 'cutin')).toBe('⬛🟨🟨🟩🟨')
})
test('exact match', () => {
  expect(wordleSimulator('unfit', 'unfit')).toBe('🟩🟩🟩🟩🟩')
})
