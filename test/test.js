var test = require('tape')
var getUsage = require('../')

var definitions: [
  {
    name: 'help', description: 'Display this usage guide.',
    alias: 'h', type: Boolean
  },
  {
    name: 'src', description: 'The input files to process',
    type: String, multiple: true, defaultOption: true
  },
  {
    name: 'timeout', description: 'Timeout value in ms',
    alias: 't', type: Number
  }
]

test('.getUsage(definitions, options)', function (t) {
  var options = {
    title: 'a typical app',
    description: 'Generates something very important.'
  }

  var result = getUsage(definitions, options)
  t.ok(/a typical app/.test(result))
  t.end()
})

test('.getOptionList()', function (t) {
  var result = getOptionList(definitions)
  
})
