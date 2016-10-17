'use strict'
var TestRunner = require('test-runner')
var commandLineUsage = require('../')
var a = require('core-assert')

var runner = new TestRunner()

runner.test('commandLineUsage(sections)', function () {
  var definitions = [
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

  var sections = [
    {
      header: 'a typical app',
      content: 'Generates something very important.'
    },
    {
      header: 'Option list',
      optionList: definitions
    }
  ]

  var result = commandLineUsage(sections)
  a.ok(/a typical app/.test(result))
  a.ok(/Generates something very important/.test(result))
  a.ok(/Display this usage guide/.test(result))
})

runner.test('header only, no content', function () {
  var usage = commandLineUsage([
    { header: 'header' }
  ])
  a.ok(/header/.test(usage))
})
