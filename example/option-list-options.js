const commandLineUsage = require('../')
const optionDefinitions = require('./assets/example-options')

const sections = [
  {
    header: 'A typical app',
    content: 'Generates something {italic very} important.'
  },
  {
    header: 'Options',
    optionList: optionDefinitions,
    tableOptions: {
      columns: [
        {
          name: 'option',
          noWrap: true,
          padding: { left: '🔥  ', right: '' },
          width: 30
        },
        {
          name: 'description',
          width: 50,
          padding: { left: '', right: '   🔥' }
        }
      ]
    }
  }
]

console.log(commandLineUsage(sections))
