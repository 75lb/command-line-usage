'use strict'
const Section = require('./section')
const tableLayout = require('table-layout')
const ansi = require('ansi-escape-sequences')
const t = require('typical')
const arrayify = require('array-back')

class OptionList extends Section {
  constructor (data) {
    super()
    /* filter out hidden definitions */
    if (data.hide && data.hide.length) {
      data.optionList = data.optionList.filter(definition => {
        return data.hide.indexOf(definition.name) === -1
      })
    }
    this.header(data.header)
    this.add(optionList(data.optionList, data.group))
    this.emptyLine()
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

module.exports = OptionList
