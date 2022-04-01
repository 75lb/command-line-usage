const Tom = require('test-runner').Tom
const a = require('assert')
const chalkFormat = require('../lib/chalk-format')

const tom = module.exports = new Tom('chalk-format')

tom.test('chalk-format: simple', function () {
  const str = 'Something'
  const result = chalkFormat(str)
  a.strictEqual(result, str)
})

tom.test('chalk-format: template string in input', function () {
  const str = 'Something `0`'
  const result = chalkFormat(str)
  a.strictEqual(result, str)
})
