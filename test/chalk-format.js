const Tom = require('test-runner').Tom
const a = require('assert')
const chalkFormat = require('../lib/chalk-format')

const tom = module.exports = new Tom('chalk-format')

tom.test('chalk-format: simple', function () {
  let str = 'Something'
  let result = chalkFormat(str)
  a.strictEqual(result, str)
})

tom.test('chalk-format: template string in input', function () {
  let str = 'Something `0`'
  let result = chalkFormat(str)
  a.strictEqual(result, str)
})
