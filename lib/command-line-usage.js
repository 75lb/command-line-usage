'use strict'
const OptionList = require('./option-list')
const Content = require('./content')
const Banner = require('./banner')

/**
 * @module command-line-usage
 */
module.exports = getUsage

/**
 * @param {optionDefinition[]} - an array of [option definition](https://github.com/75lb/command-line-args#exp_module_definition--OptionDefinition) objects. In addition to the regular definition properties, command-line-usage will look for:
 *
 * - `description` - a string describing the option.
 * - `typeLabel` - a string to replace the default type string (e.g. `<string>`). It's often more useful to set a more descriptive type label, like `<ms>`, `<files>`, `<command>` etc.
 *
 * @param options {module:usage-options} - see [UsageOptions](#exp_module_usage-options--UsageOptions).
 * @returns {string}
 * @alias module:command-line-usage
 */
function getUsage (sections) {
  if (sections && sections.length) {
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
