'use strict'
const TestRunner = require('test-runner')
const commandLineUsage = require('../')
const a = require('assert')

const runner = new TestRunner()

runner.test('commandLineUsage(sections)', function () {
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
})

runner.test('header only, no content', function () {
  const usage = commandLineUsage([
    { header: 'header' }
  ])
  a.ok(/header/.test(usage))
})
