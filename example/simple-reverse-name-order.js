import commandLineUsage from 'command-line-usage'
import optionDefinitions from './assets/example-options.js'

const usage = commandLineUsage([
  {
    header: 'A typical app',
    content: 'In the option list, --long-name options should be display before short options.'
  },
  {
    header: 'Options',
    optionList: optionDefinitions,
    reverseNameOrder: true
  },
  {
    content: 'Project home: {underline https://github.com/me/example}'
  }
])

console.log(usage)
