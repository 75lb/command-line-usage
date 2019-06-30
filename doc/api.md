<a name="module_command-line-usage"></a>

## command-line-usage

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
    <td>sections</td><td><code>Section</code> | <code>Array.&lt;Section&gt;</code></td><td><p>One or more section objects (<a href="#module_command-line-usage--commandLineUsage..content">content</a> or <a href="#module_command-line-usage--commandLineUsage..optionList">optionList</a>).</p>
</td>
    </tr>  </tbody>
</table>

<a name="module_command-line-usage--commandLineUsage..content"></a>

#### commandLineUsage~content
A Content section comprises a header and one or more lines of content.

**Kind**: inner typedef of [<code>commandLineUsage</code>](#exp_module_command-line-usage--commandLineUsage)  
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
    <td>content</td><td><code>string</code> | <code>Array.&lt;string&gt;</code> | <code>Array.&lt;object&gt;</code></td><td><p>Overloaded property, accepting data in one of four formats:</p>
<ol>
<li>A single string (one line of text)</li>
<li>An array of strings (multiple lines of text)</li>
<li>An array of objects (recordset-style data). In this case, the data will be rendered in table format. The property names of each object are not important, so long as they are consistent throughout the array.</li>
<li>An object with two properties - <code>data</code> and <code>options</code>. In this case, the data and options will be passed directly to the underlying <a href="https://github.com/75lb/table-layout">table layout</a> module for rendering.</li>
</ol>
</td>
    </tr><tr>
    <td>raw</td><td><code>boolean</code></td><td><p>Set to true to avoid indentation and wrapping. Useful for banners.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
Simple string of content. For ansi formatting, use [chalk template literal syntax](https://github.com/chalk/chalk#tagged-template-literal).
```js
{
  header: 'A typical app',
  content: 'Generates something {rgb(255,200,0).italic very {underline.bgRed important}}.'
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

An object with `data` and `options` properties will be passed directly to the underlying [table layout](https://github.com/75lb/table-layout) module for rendering.
```js
{
  header: 'A typical app',
  content: {
    data: [
     { colA: 'First row, first column.', colB: 'First row, second column.'},
     { colA: 'Second row, first column.', colB: 'Second row, second column.'}
    ],
    options: {
      maxWidth: 60
    }
  }
}
```
<a name="module_command-line-usage--commandLineUsage..optionList"></a>

#### commandLineUsage~optionList
An OptionList section adds a table displaying the supplied option definitions.

**Kind**: inner typedef of [<code>commandLineUsage</code>](#exp_module_command-line-usage--commandLineUsage)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[header]</td><td><code>string</code></td><td><p>The section header, always bold and underlined.</p>
</td>
    </tr><tr>
    <td>optionList</td><td><code>Array.&lt;OptionDefinition&gt;</code></td><td><p>An array of <a href="https://github.com/75lb/command-line-args/blob/master/doc/option-definition.md">option definition</a> objects. In addition to the regular definition properties, command-line-usage will look for:</p>
<ul>
<li><code>description</code> - a string describing the option.</li>
<li><code>typeLabel</code> - a string to replace the default type string (e.g. <code>&lt;string&gt;</code>). It&#39;s often more useful to set a more descriptive type label, like <code>&lt;ms&gt;</code>, <code>&lt;files&gt;</code>, <code>&lt;command&gt;</code> etc.</li>
</ul>
</td>
    </tr><tr>
    <td>[group]</td><td><code>string</code> | <code>Array.&lt;string&gt;</code></td><td><p>If specified, only options from this particular group will be printed. <a href="https://github.com/75lb/command-line-usage/blob/master/example/groups.js">Example</a>.</p>
</td>
    </tr><tr>
    <td>[hide]</td><td><code>string</code> | <code>Array.&lt;string&gt;</code></td><td><p>The names of one of more option definitions to hide from the option list. <a href="https://github.com/75lb/command-line-usage/blob/master/example/hide.js">Example</a>.</p>
</td>
    </tr><tr>
    <td>[reverseNameOrder]</td><td><code>boolean</code></td><td><p>If true, the option alias will be displayed after the name, i.e. <code>--verbose, -v</code> instead of <code>-v, --verbose</code>).</p>
</td>
    </tr><tr>
    <td>[tableOptions]</td><td><code>object</code></td><td><p>An options object suitable for passing into <a href="https://github.com/75lb/table-layout#table-">table-layout</a>. See <a href="https://github.com/75lb/command-line-usage/blob/master/example/option-list-options.js">here for an example</a>.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
{
  header: 'Options',
  optionList: [
    {
      name: 'help',
      alias: 'h',
      description: 'Display this usage guide.'
    },
    {
      name: 'src',
      description: 'The input files to process',
      multiple: true,
      defaultOption: true,
      typeLabel: '{underline file} ...'
    },
    {
      name: 'timeout',
      description: 'Timeout value in ms.',
      alias: 't',
      typeLabel: '{underline ms}'
    }
  ]
}
```
