'use strict'
const OptionList = require('./option-list')
const Content = require('./content')
const Banner = require('./banner')
const arrayify = require('array-back')

/**
 * @module command-line-usage
 */
module.exports = getUsage

/**
 * @param {Section|Section[]} - one of more section objects.
 * @returns {string}
 * @alias module:command-line-usage
 */
function getUsage (sections) {
  sections = arrayify(sections)
  if (sections.length) {
    const output = sections.map(section => {
      if (section.optionList) {
        return new OptionList(section)
      } else if (section.content) {
        return new Content(section)
      } else if (section.banner) {
        return new Banner(section)
      }
    })
    return '\n' + output.join('\n')
  }
}

/**
 * A Content section comprises a header and one or more lines of text.
 * @typedef content
 * @property header {string} - The section header.
 * @property content {string|string[]|object[]} - One or more lines of text. Pass a recordset array for tabulated content.
 * @example
 * {
 *   header: 'A typical app',
 *   content: 'Generates something [italic]{very} important.'
 * }
 * @example
 * {
 *   header: 'A typical app',
 *   content: [
 *     'First line.',
 *     'Second line.'
 *   ]
 * }
 * @example
 * {
 *   header: 'A typical app',
 *   content: [
 *     { colA: 'First row, first column.', colB: 'First row, second column.'},
 *     { colA: 'Second row, first column.', colB: 'Second row, second column.'}
 *   ]
 * }
 */

 /**
  * A OptionList section adds a table displaying details of the available options.
  * @typedef optionList
  * @property header {string} - The section header.
  * @property optionList {OptionDefinition[]} - an array of [option definition](https://github.com/75lb/command-line-args#exp_module_definition--OptionDefinition) objects. In addition to the regular definition properties, command-line-usage will look for:
  *
  * - `description` - a string describing the option.
  * - `typeLabel` - a string to replace the default type string (e.g. `<string>`). It's often more useful to set a more descriptive type label, like `<ms>`, `<files>`, `<command>` etc.
  *
  * @example
  * {
  *   header: 'Options',
  *   optionList: [
  *     {
  *       name: 'help', description: 'Display this usage guide.',
  *       alias: 'h', type: Boolean
  *     },
  *     {
  *       name: 'src', description: 'The input files to process',
  *       type: String, multiple: true, defaultOption: true, typeLabel: '[underline]{file} ...'
  *     },
  *     {
  *       name: 'timeout', description: 'Timeout value in ms. This description is needlessly long unless you count testing of the description column maxWidth useful.',
  *       alias: 't', type: Number, typeLabel: '[underline]{ms}'
  *     }
  *   ]
  * }
  */
