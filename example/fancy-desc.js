var ussr = require('/Users/lloyd/Documents/75lb/command-line-usage/example/ussr2')

module.exports = {
  options: {
    title: 'brezhnev',
    description: [
      {
        desc: 'On his 70th birthday he was awarded the rank of Marshal of the Soviet Union – the highest military honour in the Soviet Union. After being awarded the medal, he attended an 18th Army Veterans meeting, dressed in a long coat and saying; "Attention, Marshal\'s coming!" He also conferred upon himself the rare [bold]{Order of Victory} in 1978 — the only time the decoration was ever awarded outside of World War II. (This medal was posthumously revoked in 1989 for not meeting the criteria for citation.)',
        logo: 'Generates something very important. On his 70th birthday he was awarded the rank of Marshal of the Soviet Union – the highest military honour in the Soviet Union. After being awarded the medal, he attended an 18th Army Veterans meeting, dressed in a long coat and saying; "Attention, Marshal\'s coming!" He also conferred upon himself the rare Order of Victory in 1978 — the only time the decoration was ever awarded outside of World War II. (This medal was posthumously revoked in 1989 for not meeting the criteria for citation.)'
      }
    ],
    footer: ussr,
    synopsis: [
      '$ example [[bold]{--timeout} [underline]{ms}] [bold]{--src} [underline]{file} ...',
      '$ example [bold]{--help}'
    ]
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
