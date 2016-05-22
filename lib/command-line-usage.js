'use strict'
const tableLayout = require('table-layout')
const ansi = require('ansi-escape-sequences')
const os = require('os')
const t = require('typical')
const arrayify = require('array-back')

/**
 * @module command-line-usage
 */
module.exports = getUsage

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

  return tableLayout.lines(columns, {
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

function renderSection (header, content) {
  const lines = new Lines()

  if (header) {
    lines.header(header)
  }

  if (!content) {
    return lines.list
  } else {

    const defaultPadding = { left: '  ', right: ' ' }

    /* string content */
    if (t.isString(content)) {
      lines.add(tableLayout.lines({ column: ansi.format(content) }, {
        padding: defaultPadding,
        maxWidth: 80
      }))

    /* array of strings */
    } else if (Array.isArray(content) && content.every(t.isString)) {
      const rows = content.map(string => ({ column: ansi.format(string) }))
      lines.add(tableLayout.lines(rows, {
        padding: defaultPadding,
        maxWidth: 80
      }))
      lines.add()

    /* array of objects (use column layout) */
    } else if (Array.isArray(content) && content.every(t.isPlainObject)) {
      lines.add(tableLayout.lines(content, {
        padding: defaultPadding
      }))

    /* { options: object, content: object[] } */
    } else if (t.isPlainObject(content)) {
      if (!content.options || !content.data) {
        throw new Error('must have an "options" or "data" property\n' + JSON.stringify(content))
      }
      Object.assign(
        { padding: defaultPadding },
        content.options
      )
      lines.add(tableLayout.lines(
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

function ansiFormatRow (row) {
  for (const key in row) {
    row[key] = ansi.format(row[key])
  }
  return row
}
