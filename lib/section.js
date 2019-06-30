class Section {
  constructor () {
    this.lines = []
  }

  add (lines) {
    if (lines) {
      const chalkFormat = require('./chalk-format')
      const arrayify = require('array-back')
      arrayify(lines).forEach(line => this.lines.push(line))
    } else {
      this.lines.push('')
    }
  }

  toString () {
    const os = require('os')
    return this.lines.join(os.EOL)
  }

  header (text) {
    const chalk = require('chalk')
    if (text) {
      this.add(chalk.underline.bold(text))
      this.add()
    }
  }
}

module.exports = Section
