'use strict'
const tableLayout = require('table-layout')
const ansi = require('ansi-escape-sequences')
const t = require('typical')
const Section = require('./section')

class Content extends Section {
  constructor (section) {
    super()
    const defaultPadding = { left: '  ', right: ' ' }
    const content = section.content
    const raw = section.raw
    this.header(section.header)

    if (content) {
      /* add content without indentation or wrapping */
      if (raw) {
        this.add(content)

      /* string content */
      } else if (t.isString(content)) {
        this.add(tableLayout.lines({ column: ansi.format(content) }, {
          padding: defaultPadding,
          maxWidth: 80
        }))

      /* array of strings */
      } else if (Array.isArray(content) && content.every(t.isString)) {
        const rows = content.map(string => ({ column: ansi.format(string) }))
        this.add(tableLayout.lines(rows, {
          padding: defaultPadding,
          maxWidth: 80
        }))
        this.add()

      /* array of objects (use table-layout) */
      } else if (Array.isArray(content) && content.every(t.isPlainObject)) {
        this.add(tableLayout.lines(content, {
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
        this.add(tableLayout.lines(
          content.data.map(row => ansiFormatRow(row)),
          content.options
        ))
      } else {
        const message = `invalid input - 'content' must be a string, array of strings, or array of plain objects:\n\n${JSON.stringify(content)}`
        throw new Error(message)
      }

      this.emptyLine()
    }
  }
}

function ansiFormatRow (row) {
  for (const key in row) {
    row[key] = ansi.format(row[key])
  }
  return row
}

module.exports = Content
