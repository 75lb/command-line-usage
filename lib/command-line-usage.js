'use strict'
const OptionList = require('./option-list')
const Content = require('./content')
const arrayify = require('array-back')

/**
 * @module command-line-usage
 */
module.exports = commandLineUsage

/**
 * Generates a usage guide suitable for a command-line app.
 * @param {Section|Section[]} - One of more section objects ({@link module:command-line-usage~content} or {@link module:command-line-usage~optionList}).
 * @returns {string}
 * @alias module:command-line-usage
 */
function commandLineUsage (sections) {
  sections = arrayify(sections)
  if (sections.length) {
    const output = sections.map(section => {
      if (section.optionList) {
        return new OptionList(section)
      } else {
        return new Content(section)
      }
    })
    return '\n' + output.join('\n')
  }
}

/**
 * A Content section comprises a header and one or more lines of content.
 * @typedef content
 * @property header {string} - The section header, always bold and underlined.
 * @property content {string|string[]|object[]} - One or more lines of text. For table layout, supply the content as an array of objects. The property names of each object are not important, so long as they are consistent throughout the array.
 * @property raw {boolean} - Set to true to avoid indentation and wrapping. Useful for banners.
 * @example
 * Simple string of content. The syntax for ansi formatting is documented [here](https://github.com/75lb/ansi-escape-sequences#module_ansi-escape-sequences.format).
 * ```js
 * {
 *   header: 'A typical app',
 *   content: 'Generates something [italic]{very} important.'
 * }
 * ```
 *
 * An array of strings is interpreted as lines, to be joined by the system newline character.
 * ```js
 * {
 *   header: 'A typical app',
 *   content: [
 *     'First line.',
 *     'Second line.'
 *   ]
 * }
 * ```
 *
 * An array of recordset-style objects are rendered in table layout.
 * ```js
 * {
 *   header: 'A typical app',
 *   content: [
 *     { colA: 'First row, first column.', colB: 'First row, second column.'},
 *     { colA: 'Second row, first column.', colB: 'Second row, second column.'}
 *   ]
 * }
 * ```
 */

 /**
  * A OptionList section adds a table displaying details of the available options.
  * @typedef optionList
  * @property [header] {string} - The section header, always bold and underlined.
  * @property optionList {OptionDefinition[]} - an array of [option definition](https://github.com/75lb/command-line-args#optiondefinition-) objects. In addition to the regular definition properties, command-line-usage will look for:
  *
  * - `description` - a string describing the option.
  * - `typeLabel` - a string to replace the default type string (e.g. `<string>`). It's often more useful to set a more descriptive type label, like `<ms>`, `<files>`, `<command>` etc.
  * @property [group] {string|string[]} - If specified, only options from this particular group will be printed. [Example](https://github.com/75lb/command-line-usage/blob/master/example/groups.js).
  * @property [hide] {string|string[]} - The names of one of more option definitions to hide from the option list. [Example](https://github.com/75lb/command-line-usage/blob/master/example/hide.js).
  *
  * @example
  * {
  *   header: 'Options',
  *   optionList: [
  *     {
  *       name: 'help', alias: 'h', description: 'Display this usage guide.'
  *     },
  *     {
  *       name: 'src', description: 'The input files to process',
  *       multiple: true, defaultOption: true, typeLabel: '[underline]{file} ...'
  *     },
  *     {
  *       name: 'timeout', description: 'Timeout value in ms. This description is needlessly long unless you count testing of the description column maxWidth useful.',
  *       alias: 't', typeLabel: '[underline]{ms}'
  *     }
  *   ]
  * }
  */
