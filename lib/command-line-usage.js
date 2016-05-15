'use strict'
const columnLayout = require('column-layout')
const ansi = require('ansi-escape-sequences')
const os = require('os')
const t = require('typical')
const UsageOptions = require('./usage-options')
const arrayify = require('array-back')

/**
 * @module command-line-usage
 */

class Lines {
  constructor () {
    this.list = []
  }
  add (content) {
    arrayify(content).forEach(line => this.list.push(ansi.format(line)))
  }
  emptyLine () {
    this.list.push('')
  }
  header (text) {
    if (text) {
      this.add(ansi.format(text, [ 'underline', 'bold' ]))
      this.emptyLine()
    }
  }
  toString () {
    return this.list.join(os.EOL)
  }
}

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
  if (arguments.length === 2) {
    return legacyGetUsage.apply(null, arguments)
  } else {
    if (sections && sections.length) {
      const output = new Lines()
      sections.forEach(section => {
        if (section.optionList) {
          /* filter out hidden definitions */
          if (section.hide && section.hide.length) {
            section.optionList = section.optionList.filter(definition => section.hide.indexOf(definition.name) === -1)
          }
          output.header(section.header)
          output.add(optionList(section.optionList, section.group))
          output.emptyLine()
        } else if (section.content) {
          output.add(renderSection(section.header, section.content))
        } else if (section.banner) {
          output.header(section.header)
          output.add(section.banner)
        }
      })
      return `\n${output}`
    }
  }
}

function legacyGetUsage (definitions, options) {
  options = new UsageOptions(options)
  definitions = definitions || []

  const output = new Lines()
  output.emptyLine()

  /* filter out hidden definitions */
  if (options.hide && options.hide.length) {
    definitions = definitions.filter(definition => options.hide.indexOf(definition.name) === -1)
  }

  if (options.header) {
    output.add(renderSection('', options.header))
  }

  if (options.title || options.description) {
    output.add(renderSection(
      options.title,
      options.description
    ))
  }

  if (options.synopsis) {
    output.add(renderSection('Synopsis', options.synopsis))
  }

  if (definitions.length) {
    if (options.groups) {
      for (const group in options.groups) {
        const val = options.groups[group]
        let title
        let description
        if (t.isObject(val)) {
          title = val.title
          description = val.description
        } else if (t.isString(val)) {
          title = val
        } else {
          throw new Error('Unexpected group config structure')
        }

        output.add(renderSection(title, description))

        let optionList = getUsage.optionList(definitions, group)
        output.add(renderSection(null, optionList, true))
      }
    } else {
      output.add(renderSection('Options', getUsage.optionList(definitions), true))
    }
  }

  if (options.examples) {
    output.add(renderSection('Examples', options.examples))
  }

  if (options.footer) {
    output.add(renderSection('', options.footer))
  }

  return `\n${output}`
}

/**
 * A helper for getting a column-format list of options and descriptions. Useful for inserting into a custom usage template.
 *
 * @param {optionDefinition[]} - the definitions to Display
 * @param [group] {string} - if specified, will output the options in this group. The special group `'_none'` will return options without a group specified.
 * @returns {string[]}
 */
function optionList (definitions, group) {
  if (!definitions || (definitions && !definitions.length)) {
    throw new Error('you must pass option definitions to getUsage.optionList()')
  }
  const columns = []

  if (group === '_none') {
    definitions = definitions.filter(def => !t.isDefined(def.group))
  } else if (group) {
    definitions = definitions.filter(def => arrayify(def.group).indexOf(group) > -1)
  }

  definitions.forEach(def => {
    columns.push({
      option: getOptionNames(def, 'bold'),
      description: ansi.format(def.description)
    })
  })

  return columnLayout.lines(columns, {
    padding: { left: '  ', right: ' ' },
    columns: [
      { name: 'option', nowrap: true },
      { name: 'description', maxWidth: 80 }
    ]
  })
}

function getOptionNames (definition, optionNameStyles) {
  const names = []
  let type = definition.type ? definition.type.name.toLowerCase() : ''
  const multiple = definition.multiple ? '[]' : ''
  if (type) type = type === 'boolean' ? '' : `[underline]{${type}${multiple}}`
  type = ansi.format(definition.typeLabel || type)

  if (definition.alias) {
    names.push(ansi.format('-' + definition.alias, optionNameStyles))
  }
  names.push(ansi.format(`--${definition.name}`, optionNameStyles) + ' ' + type)
  return names.join(', ')
}

function renderSection (header, content, skipIndent) {
  const lines = new Lines()

  if (header) {
    lines.header(header)
  }

  if (!content) {
    return lines.list
  } else {
    /* string content */
    if (t.isString(content)) {
      lines.add(columnLayout.lines({ column: content }, {
        padding: { left: '  ', right: ' ' },
        viewWidth: 80
      }))

    /* array of strings */
    } else if (Array.isArray(content) && content.every(t.isString)) {
      lines.add(skipIndent ? content : indentArray(content))

    /* array of objects (use column layout) */
    } else if (Array.isArray(content) && content.every(t.isPlainObject)) {
      lines.add(columnLayout.lines(content, {
        padding: { left: '  ', right: ' ' }
      }))

    /* { options: object, content: object[] } */
    } else if (t.isPlainObject(content)) {
      if (!content.options || !content.data) {
        throw new Error('must have an "options" or "data" property\n' + JSON.stringify(content))
      }
      Object.assign(
        { padding: { left: '  ', right: ' ' } },
        content.options
      )
      lines.add(columnLayout.lines(
        content.data.map(row => ansiFormatRow(row)),
        content.options
      ))
    } else {
      const message = `invalid input - 'content' must be a string, array of strings, or array of plain objects:\n\n${JSON.stringify(content)}`
      throw new Error(message)
    }

    lines.emptyLine()
    return lines.list
  }
}

function indentString (string) {
  return '  ' + string
}
function indentArray (array) {
  return array.map(indentString)
}
function ansiFormatRow (row) {
  for (const key in row) {
    row[key] = ansi.format(row[key])
  }
  return row
}

module.exports = getUsage
