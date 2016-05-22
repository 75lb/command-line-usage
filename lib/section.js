'use strict'
const tableLayout = require('table-layout')
const ansi = require('ansi-escape-sequences')
const os = require('os')
const t = require('typical')
const arrayify = require('array-back')

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

class Section extends Lines {
  constructor () {
    super()
  }
}

module.exports = Section
