[![view on npm](http://img.shields.io/npm/v/command-line-usage.svg)](https://www.npmjs.org/package/command-line-usage)
[![npm module downloads](http://img.shields.io/npm/dt/command-line-usage.svg)](https://www.npmjs.org/package/command-line-usage)
[![Build Status](https://travis-ci.org/75lb/command-line-usage.svg?branch=master)](https://travis-ci.org/75lb/command-line-usage)
[![Dependency Status](https://david-dm.org/75lb/command-line-usage.svg)](https://david-dm.org/75lb/command-line-usage)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# command-line-usage
A simple module for creating a usage guide.

## Synopis
A usage guide is built from an arbitrary number of sections, e.g. a description section, synopsis, option list, examples, footer etc. Each section has a bold, underlined header and some content (a paragraph, table, option list, banner etc.)

The <code><a href="#commandlineusagesections--string-">commandLineUsage()</a></code> function takes one or more `section` objects (<code><a href="#commandlineusagecontent">content</a></code> or <code><a href="#commandlineusageoptionlist">optionList</a></code>) as input.

Inline ansi formatting can be used anywhere within section content using the formatting syntax described [here](https://github.com/75lb/ansi-escape-sequences#module_ansi-escape-sequences.format).

This script:
```js
const getUsage = require('command-line-usage')

const sections = [
  {
    header: 'A typical app',
    content: 'Generates something [italic]{very} important.'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'input',
        typeLabel: '[underline]{file}',
        description: 'The input to process.'
      },
      {
        name: 'help',
        description: 'Print this usage guide.'
      }
    ]
  }
]
const usage = getUsage(sections)
console.log(usage)
```

Outputs this guide:

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/synopsis.png)

## Examples

### Simple
A fairly typical usage guide with three sections - description, option list and footer. [Code](https://github.com/75lb/command-line-usage/blob/master/example/simple.js).

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/simple.png)

### Option List groups
Demonstrates breaking the option list up into groups. [Code](https://github.com/75lb/command-line-usage/blob/master/example/groups.js).

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/groups.png)

### Banners
A banner is created by adding the `raw: true` property to your `content`. This flag disables any formatting on the content, displaying it raw as supplied.

#### Header
Demonstrates a banner at the top. This example also adds a `synopsis` section. [Code](https://github.com/75lb/command-line-usage/blob/master/example/header.js).

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/header.png)

#### Footer
Demonstrates a footer banner. [Code](https://github.com/75lb/command-line-usage/blob/master/example/footer.js).

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/footer.png)

### Examples section (table layout)
An examples section is added. To achieve this table layout, supply the `content` as an array of objects. The property names of each object are not important, so long as they are consistent throughout the array. [Code](https://github.com/75lb/command-line-usage/blob/master/example/examples.js).

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/example-columns.png)

### Command list
Useful if your app is [command-driven](https://github.com/75lb/command-line-commands), like git or npm. [Code](https://github.com/75lb/command-line-usage/blob/master/example/command-list.js).

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/command-list.png)

### Description section (table layout)
Demonstrates use of table layout in the description. In this case the second column (containing the hammer and sickle) has `nowrap` enabled, as the input is already formatted as desired. [Code](https://github.com/75lb/command-line-usage/blob/master/example/description-columns.js).

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/description-columns.png)

## API Reference


* [command-line-usage](#module_command-line-usage)
    * [commandLineUsage(sections)](#exp_module_command-line-usage--commandLineUsage) ⇒ <code>string</code> ⏏
        * [~content](#module_command-line-usage--commandLineUsage..content)
        * [~optionList](#module_command-line-usage--commandLineUsage..optionList)

<a name="exp_module_command-line-usage--commandLineUsage"></a>

### commandLineUsage(sections) ⇒ <code>string</code> ⏏
Generates a usage guide suitable for a command-line app.

**Kind**: Exported function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>sections</td><td><code>Section</code> | <code>Array.&lt;Section&gt;</code></td><td><p>One of more section objects (<a href="#module_command-line-usage--commandLineUsage..content">content</a> or <a href="#module_command-line-usage--commandLineUsage..optionList">optionList</a>).</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_command-line-usage--commandLineUsage..content"></a>

#### commandLineUsage~content
A Content section comprises a header and one or more lines of content.

**Kind**: inner typedef of <code>[commandLineUsage](#exp_module_command-line-usage--commandLineUsage)</code>  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>header</td><td><code>string</code></td><td><p>The section header, always bold and underlined.</p>
</td>
    </tr><tr>
    <td>content</td><td><code>string</code> | <code>Array.&lt;string&gt;</code> | <code>Array.&lt;object&gt;</code></td><td><p>One or more lines of text. For table layout, supply the content as an array of objects. The property names of each object are not important, so long as they are consistent throughout the array.</p>
</td>
    </tr><tr>
    <td>raw</td><td><code>boolean</code></td><td><p>Set to true to avoid indentation and wrapping. Useful for banners.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
Simple string of content. The syntax for ansi formatting is documented [here](https://github.com/75lb/ansi-escape-sequences#module_ansi-escape-sequences.format).
```js
{
  header: 'A typical app',
  content: 'Generates something [italic]{very} important.'
}
```

An array of strings is interpreted as lines, to be joined by the system newline character.
```js
{
  header: 'A typical app',
  content: [
    'First line.',
    'Second line.'
  ]
}
```

An array of recordset-style objects are rendered in table layout.
```js
{
  header: 'A typical app',
  content: [
    { colA: 'First row, first column.', colB: 'First row, second column.'},
    { colA: 'Second row, first column.', colB: 'Second row, second column.'}
  ]
}
```
<a name="module_command-line-usage--commandLineUsage..optionList"></a>

#### commandLineUsage~optionList
A OptionList section adds a table displaying details of the available options.

**Kind**: inner typedef of <code>[commandLineUsage](#exp_module_command-line-usage--commandLineUsage)</code>  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>header</td><td><code>string</code></td><td><p>The section header, always bold and underlined.</p>
</td>
    </tr><tr>
    <td>optionList</td><td><code>Array.&lt;OptionDefinition&gt;</code></td><td><p>an array of <a href="https://github.com/75lb/command-line-args#optiondefinition-">option definition</a> objects. In addition to the regular definition properties, command-line-usage will look for:</p>
<ul>
<li><code>description</code> - a string describing the option.</li>
<li><code>typeLabel</code> - a string to replace the default type string (e.g. <code>&lt;string&gt;</code>). It&#39;s often more useful to set a more descriptive type label, like <code>&lt;ms&gt;</code>, <code>&lt;files&gt;</code>, <code>&lt;command&gt;</code> etc.</li>
</ul>
</td>
    </tr><tr>
    <td>group</td><td><code>string</code> | <code>Array.&lt;string&gt;</code></td><td><p>If specified, only options from this particular group will be printed. <a href="https://github.com/75lb/command-line-usage/blob/master/example/groups.js">Example</a>.</p>
</td>
    </tr><tr>
    <td>hide</td><td><code>string</code> | <code>Array.&lt;string&gt;</code></td><td><p>The names of one of more option definitions to hide from the option list. <a href="https://github.com/75lb/command-line-usage/blob/master/example/hide.js">Example</a>.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
{
  header: 'Options',
  optionList: [
    {
      name: 'help', alias: 'h', description: 'Display this usage guide.'
    },
    {
      name: 'src', description: 'The input files to process',
      multiple: true, defaultOption: true, typeLabel: '[underline]{file} ...'
    },
    {
      name: 'timeout', description: 'Timeout value in ms. This description is needlessly long unless you count testing of the description column maxWidth useful.',
      alias: 't', typeLabel: '[underline]{ms}'
    }
  ]
}
```

* * *

&copy; 2015-16 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown).
