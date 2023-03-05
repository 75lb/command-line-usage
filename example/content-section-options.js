import commandLineUsage from 'command-line-usage'
import optionDefinitions from './assets/example-options.js'

const sections = [
  {
    header: 'Background information',
    content: {
      options: {
        columns: [
          { name: 'column 1', maxWidth: 60 }
        ]
      },
      data: [
        {
          'column 1': "Before you use this tool there is something you should know. You might not consider this information relevant and you would be correct. However, it demonstrates table layout and that's why we're here."
        }
      ]
    }
  },
  {
    content: {
      options: {
        columns: [
          { name: 'column 1', maxWidth: 30 },
          { name: 'column 2', maxWidth: 40 }
        ]
      },
      data: [
        {
          'column 1': '{yellow.underline The Kingdom of Scotland} was a state in north-west Europe traditionally said to have been founded in 843, which joined with the Kingdom of England to form a unified Kingdom of Great Britain in 1707. Its territories expanded and shrank, but it came to occupy the northern third of the island of Great Britain, sharing a land border to the south with the Kingdom of England. It suffered many invasions by the English, but under Robert I it fought a successful war of independence and remained a distinct state in the late Middle Ages. In 1603, James VI of Scotland became King of England, joining Scotland with England in a personal union. In 1707, the two kingdoms were united to form the Kingdom of Great Britain under the terms of the Acts of Union. ',
          'column 2': "{yellow.underline Operation Barbarossa} (German: Unternehmen Barbarossa) was the code name for Nazi Germany's invasion of the Soviet Union during World War II, which began on 22 June 1941. Over the course of the operation, about four million soldiers of the Axis powers invaded Soviet Russia along a 2,900 kilometer front, the largest invasion force in the history of warfare. In addition to troops, the Germans employed some 600,000 motor vehicles and between 600–700,000 horses. The operation was driven by Adolf Hitler's ideological desire to conquer the Soviet territories as outlined in his 1925 manifesto Mein Kampf ('My Struggle'). It marked the beginning of the rapid escalation of the war, both geographically and in the formation of the Allied coalition."
        }
      ]
    }
  }
]

console.log(commandLineUsage(sections))
