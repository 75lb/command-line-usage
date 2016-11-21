'use strict'
const tableLayout = require('table-layout')
const ansi = require('ansi-escape-sequences')
const t = require('typical')

class Content {
  constructor (content) {
    this._content = content
  }

  lines () {
    const content = this._content
    const defaultPadding = { left: '  ', right: ' ' }

    if (content) {
      /* string content */
      if (t.isString(content)) {
        return tableLayout.lines({ column: ansi.format(content) }, {
          padding: defaultPadding,
          maxWidth: 80
        })

      /* array of strings */
      } else if (Array.isArray(content) && content.every(t.isString)) {
        const rows = content.map(string => ({ column: ansi.format(string) }))
        return tableLayout.lines(rows, {
          padding: defaultPadding,
          maxWidth: 80
        })

      /* array of objects (use table-layout) */
      } else if (Array.isArray(content) && content.every(t.isPlainObject)) {
        return tableLayout.lines(content.map(row => ansiFormatRow(row)), {
          padding: defaultPadding
        })

      /* { options: object, data: object[] } */
      } else if (t.isPlainObject(content)) {
        if (!content.options || !content.data) {
          throw new Error('must have an "options" or "data" property\n' + JSON.stringify(content))
        }
        const options = Object.assign(
          { padding: defaultPadding },
          content.options
        )

        /* convert nowrap to noWrap to avoid breaking compatibility */
        if (options.columns) {
          options.columns = options.columns.map(column => {
            if (column.nowrap) {
              column.noWrap = column.nowrap
              delete column.nowrap
            }
            return column
          })
        }

        return tableLayout.lines(
          content.data.map(row => ansiFormatRow(row)),
          options
        )
      } else {
        const message = `invalid input - 'content' must be a string, array of strings, or array of plain objects:\n\n${JSON.stringify(content)}`
        throw new Error(message)
      }
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
