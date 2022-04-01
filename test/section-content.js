const Tom = require('test-runner').Tom
const commandLineUsage = require('../')
const a = require('assert')

const tom = module.exports = new Tom('section-content')

tom.test('header only, no content', function () {
  const sections = [
    { header: 'header' }
  ]
  const result = commandLineUsage(sections)
  a.ok(/header/.test(result))
})

tom.test('content: array of strings', function () {
  const sections = [{
    content: ['one', 'two']
  }]

  const result = commandLineUsage(sections)
  a.ok(/one\s+\n\s+two/.test(result))
})

tom.test('content: array of objects', function () {
  const sections = [{
    content: [
      { one: 'one', two: 'two' },
      { one: 'one', two: 'two' }
    ]
  }]

  const result = commandLineUsage(sections)
  a.ok(/one\s+two\s+\n\s+one\s+two/.test(result))
})

tom.test('content: { options: object, data: section[] }', function () {
  const sections = [{
    content: {
      options: {
        padding: {
          left: 'test'
        }
      },
      data: [
        { one: 'one', two: 'two' },
        { one: 'one', two: 'two' }
      ]
    }
  }]

  const result = commandLineUsage(sections)
  a.ok(/testone\s+testtwo\s+testone\s+testtwo/.test(result))
})

tom.test('content: { options: object, data: section[] }, with column options', function () {
  const sections = [{
    content: {
      options: {
        padding: {
          left: 'test'
        },
        columns: [
          { name: 'one', nowrap: true }
        ]
      },
      data: [
        { one: 'one', two: 'two' },
        { one: 'one', two: 'two' }
      ]
    }
  }]

  const result = commandLineUsage(sections)
  a.ok(/testone\s+testtwo\s+testone\s+testtwo/.test(result))
})

tom.test('content: raw', function () {
  const sections = [{
    content: 'user-defined\nnew\nlines',
    raw: true
  }]

  const result = commandLineUsage(sections)
  a.strictEqual(result, '\nuser-defined\nnew\nlines\n')
})

tom.test('content: { options: object, data: section[] }, invalid', function () {
  const sections = [{
    content: {
      broken: true
    }
  }]

  a.throws(
    () => commandLineUsage(sections),
    /must have an "options" or "data" property/
  )
})

tom.test('content: invalid', function () {
  const sections = [{
    content: true
  }]

  a.throws(
    () => commandLineUsage(sections),
    /invalid input/
  )
})
