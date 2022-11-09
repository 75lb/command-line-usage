const chalk = require('chalk')
const os = require('os')
const arrayify = require('array-back')

class Section {
  constructor (options) {
    this.options = options || {
      useChalk: true
    }
    this.lines = []
  }

  add (lines) {
    if (lines) {
      arrayify(lines).forEach(line => this.lines.push(line))
    } else {
      this.lines.push('')
    }
  }

  toString () {
    return this.lines.join(os.EOL)
  }

  header (text) {
    if (text) {
      const formatted = this.options.useChalk
        ? chalk.underline.bold(text)
        : text
      this.add(formatted)
      this.add()
    }
  }
}

module.exports = Section
