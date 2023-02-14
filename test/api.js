import commandLineUsage from 'command-line-usage'
import TestRunner from 'test-runner'
import { strict as a } from 'assert'

const tom = new TestRunner.Tom()

tom.test('typical', function () {
  const definitions = [
    {
      name: 'help',
      description: 'Display this usage guide.',
      alias: 'h',
      type: Boolean,
      group: 'one'
    },
    {
      name: 'src',
      description: 'The input files to process',
      type: String,
      multiple: true,
      defaultOption: true,
      group: 'one'
    },
    {
      name: 'timeout',
      description: 'Timeout value in ms',
      alias: 't',
      type: Number
    }
  ]

  const sections = [
    {
      header: 'a typical app',
      content: 'Generates something very important.'
    },
    {
      header: 'Option list',
      optionList: definitions
    }
  ]

  const result = commandLineUsage(sections)
  a.ok(/a typical app/.test(result))
  a.ok(/Generates something very important/.test(result))
  a.ok(/Display this usage guide/.test(result))
  a.ok(/\u001b\[1m-t\u001b\[22m, \u001b\[1m--timeout\u001b\[22m/.test(result))
})

tom.test('empty sections', function () {
  const sections = []
  const result = commandLineUsage(sections)
  a.strictEqual(result, '')
})

export default tom
