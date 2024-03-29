import commandLineUsage from 'command-line-usage'
import ussr from './assets/ascii-ussr.js'
import optionDefinitions from './assets/example-options.js'

const sections = [
  {
    header: 'Soviet Union',
    content: {
      options: {
        columns: [
          { name: 'one', maxWidth: 40 },
          { name: 'two', width: 40, noWrap: true }
        ]
      },
      data: [
        {
          one: "At the beginning of World War II, Stalin signed a non-aggression pact with Hitler's Germany; the treaty delayed confrontation between the two countries.\n\nIn June 1941 the Germans invaded, opening the largest and bloodiest theater of war in history. Soviet war casualties accounted for the highest proportion of the conflict in the cost of acquiring the upper hand over Axis forces at intense battles such as Stalingrad. Soviet forces eventually captured Berlin in 1945.\n\nThe territory overtaken by the Red Army became satellite states of the Eastern Bloc. The Cold War emerged in 1947 as the Soviet bloc confronted the Western states that united in the North Atlantic Treaty Organization in 1949.",
          two: ussr
        }
      ]
    }
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
  }
]

console.log(commandLineUsage(sections))
