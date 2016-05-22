'use strict'
const Section = require('./section')

class Banner extends Section {
  constructor (data) {
    super()
    this.header(data.header)
    this.add(data.banner)
    this.emptyLine()
  }
}

module.exports = Banner
