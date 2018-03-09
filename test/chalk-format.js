'use strict'
const TestRunner = require('test-runner')
const a = require('assert')
const chalkFormat = require('../lib/chalk-format')

const runner = new TestRunner()

runner.test('chalk-format: simple', function () {
  let str = 'Something'
  let result = chalkFormat(str)
  a.strictEqual(result, str)
})

runner.test('chalk-format: template string in input', function () {
  let str = 'Something `0`'
  let result = chalkFormat(str)
  a.strictEqual(result, str)
})
