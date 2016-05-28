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
 * @typedef ContentSection
 * @property header {string} - The section header.
 * @property content {string|string[]|object[]} - One or more lines of text. Pass a recordset array for tabulated content.
 * @example
 * {
 *   header: 'A typical app',
 *   content: 'Generates something [italic]{very} important. This is a rather long, but ultimately inconsequential description intended solely to demonstrate description appearance. '
 * }
 */
