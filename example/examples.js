import commandLineUsage from 'command-line-usage'
const optionDefinitions = [
  {
    name: 'help',
    description: 'Display this usage guide.',
    alias: 'h',
    type: Boolean
  },
  {
    name: 'src',
    description: 'The input files to process. This is some additional text existing solely to demonstrate word-wrapping, nothing more, nothing less. And nothing in between.',
    type: String,
    multiple: true,
    defaultOption: true,
    typeLabel: '{underline file} ...'
  },
  {
    name: 'timeout',
    description: 'Timeout value in ms.',
    alias: 't',
    type: Number,
    typeLabel: '{underline ms}'
  }
]

const sections = [
  {
    header: 'A typical app',
    content: 'Generates something {italic very} important.'
  },
  {
    header: 'Synopsis',
    content: [
      '$ example [{bold --timeout} {underline ms}] {bold --src} {underline file} ...',
      '$ example {bold --help}'
    ]
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  },
  {
    header: 'Examples',
    content: 'A list of examples which demonstrate how to use the app.'
  },
  {
    content: [
      {
        desc: '1. A concise example. ',
        example: '$ example -t 100 lib/*.js'
      },
      {
        desc: '2. A long example. ',
        example: '$ example --timeout 100 --src lib/*.js'
      },
      {
        desc: '3. This even longer example will scan space for unknown things. Take care when scanning space, it could take some time. ',
        example: '$ example --src galaxy1.facts galaxy1.facts galaxy2.facts galaxy3.facts galaxy4.facts galaxy5.facts'
      }
    ]
  },
  {
    content: 'Project home: {underline https://github.com/me/example}'
  }
]

console.log(commandLineUsage(sections))
