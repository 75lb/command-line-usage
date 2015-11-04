var wales = require('./assets/ansi-wales')

module.exports = {
  options: {
    title: 'a typical app',
    description: 'Generates something very important.',
    synopsis: [
      '$ example [[bold]{--timeout} [underline]{ms}] [bold]{--src} [underline]{file} ...',
      '$ example [bold]{--help}'
    ],
    footer: [
      '[italic]{This app was tested by dragons in Wales.}',
      ''
    ].concat(wales.split('\n'))
  },
  definitions: [
    {
      name: 'help', description: 'Display this usage guide.',
      alias: 'h', type: Boolean
    },
    {
      name: 'src', description: 'The input files to process',
      type: String, multiple: true, defaultOption: true, typeLabel: '[underline]{file} ...'
    },
    {
      name: 'timeout', description: 'Timeout value in ms',
      alias: 't', type: Number, typeLabel: '[underline]{ms}'
    }
  ]
}
