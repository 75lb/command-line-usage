import TestRunner from 'test-runner'
import { strict as a } from 'assert'
import chalkFormat from '../lib/chalk-format.js'

const tom = new TestRunner.Tom()

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

export default tom


