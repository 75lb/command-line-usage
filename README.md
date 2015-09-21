[![view on npm](http://img.shields.io/npm/v/command-line-usage.svg)](https://www.npmjs.org/package/command-line-usage)
[![npm module downloads per month](http://img.shields.io/npm/dm/command-line-usage.svg)](https://www.npmjs.org/package/command-line-usage)
[![Build Status](https://travis-ci.org/75lb/command-line-usage.svg?branch=master)](https://travis-ci.org/75lb/command-line-usage)
[![Dependency Status](https://david-dm.org/75lb/command-line-usage.svg)](https://david-dm.org/75lb/command-line-usage)

# command-line-usage
A library to create a usage guide. It was extracted from  [command-line-args](https://github.com/75lb/command-line-args) to faciliate arbitrary use. Use the built-in template or create something from scratch marking where generated content (e.g. the option definitions) should be placed using tokens.

## Usage
This module exports a single function: .getUsage().

### Simple example

```js
[
    {
        name: "help", description: "Display this usage guide.",
        alias: "h", type: Boolean
    },
    {
        name: "src", description: "The input files to process",
        type: String, multiple: true, defaultOption: true
    },
    {
        name: "timeout", description: "Timeout value in ms",
        alias: "t", type: Number
    }
]
```

```js
{
    title: "a typical app",
    description: "Generates something very important.",
    footer: "Project home: [underline]{https://github.com/me/example}"
}
```

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/simple.png)

### Medium example

```js
[
    {
        name: "help", description: "Display this usage guide.",
        alias: "h", type: Boolean
    },
    {
        name: "src", description: "The input files to process",
        type: String, multiple: true, defaultOption: true, typeLabel: "[underline]{file} ..."
    },
    {
        name: "timeout", description: "Timeout value in ms",
        alias: "t", type: Number, typeLabel: "[underline]{ms}"
    }
]
```

```js
{
    title: "a typical app",
    description: "Generates something very important.",
    forms: [
        "$ example [[bold]{--timeout} [underline]{ms}] [bold]{--src} [underline]{file} ...",
        "$ example [bold]{--help}"
    ],
    examples: [
        { 
            desc: "1. A concise example. ", 
            example: "$ example -t 100 lib/*.js" 
        },
        { 
            desc: "2. A long example. ", 
            example: "$ example --timeout 100 --src lib/*.js" 
        },
        { 
            desc: "3. This example will scan space for unknown things. Take cure when scanning space, it could take some time. ", 
            example: "$ example --src galaxy1.facts galaxy1.facts galaxy2.facts galaxy3.facts galaxy4.facts galaxy5.facts" 
        }
    ],
    footer: "Project home: [underline]{https://github.com/me/example}"
}
```

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/medium.png)

## More examples
You can see output from the examples in the [examples](https://github.com/75lb/command-line-usage/tree/master/example) folder using the test harness. To install: 
```
$ npm install -g command-line-usage
```

Usage: 
```
$ cat example/typical-formatted.js | command-line-usage
```

# API Reference
<a name="module_command-line-usage"></a>
## command-line-usage
<a name="exp_module_command-line-usage--getUsage"></a>
### getUsage(definitions, options) ⇒ <code>string</code> ⏏
**Kind**: Exported function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>definitions</td><td><code>Array.&lt;optionDefinition&gt;</code></td><td><p>an array of <a href="https://github.com/75lb/command-line-args#exp_module_definition--OptionDefinition">option definition</a> objects. In addition to the regular definition properties, command-line-usage will look for:</p>
<ul>
<li><code>description</code> - a string describing the option.</li>
<li><code>typeLabel</code> - a string to replace the default type string (e.g. <code>&lt;string&gt;</code>). It&#39;s often more useful to set a more descriptive type label, like <code>&lt;ms&gt;</code>, <code>&lt;files&gt;</code>, <code>&lt;command&gt;</code> etc.</li>
</ul>
</td>
    </tr><tr>
    <td>options</td><td><code><a href="#module_usage-options">usage-options</a></code></td><td><p>see <a href="#exp_module_usage-options--UsageOptions">UsageOptions</a>.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  


<a name="exp_module_usage-options--UsageOptions"></a>
## UsageOptions ⏏
The class describes all valid options for the `getUsage` function. Inline formatting can be used within any text string supplied using valid [ansi-escape-sequences formatting syntax](https://github.com/75lb/ansi-escape-sequences#module_ansi-escape-sequences.format).

**Kind**: Exported class  
* [UsageOptions](#exp_module_usage-options--UsageOptions) ⏏
  * [.title](#module_usage-options--UsageOptions+title) : <code>string</code>
  * [.description](#module_usage-options--UsageOptions+description) : <code>string</code>
  * [.synopsis](#module_usage-options--UsageOptions+synopsis) : <code>Array.&lt;string&gt;</code>
  * [.groups](#module_usage-options--UsageOptions+groups) : <code>object</code>
  * [.examples](#module_usage-options--UsageOptions+examples) : <code>Array.&lt;string&gt;</code> &#124; <code>Array.&lt;object&gt;</code>
  * [.footer](#module_usage-options--UsageOptions+footer) : <code>string</code>
  * [.hide](#module_usage-options--UsageOptions+hide) : <code>string</code> &#124; <code>Array.&lt;string&gt;</code>

<a name="module_usage-options--UsageOptions+title"></a>
### options.title : <code>string</code>
The title line at the top of the usage, typically the name of the app. By default it is underlined but this formatting can be overridden by passing a [module:usage-options~textObject](module:usage-options~textObject).

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
**Example**  
```js
{
    title: "my-app"
}
```
**Example**  
```js
{
    title: {
       text: "my-app",
       format: [ "bold", "underline" ]
    }
}
```
<a name="module_usage-options--UsageOptions+description"></a>
### options.description : <code>string</code>
A description to go underneath the title. For example, some words about what the app is for.

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
<a name="module_usage-options--UsageOptions+synopsis"></a>
### options.synopsis : <code>Array.&lt;string&gt;</code>
An array of strings highlighting the main usage forms of the app.

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
<a name="module_usage-options--UsageOptions+groups"></a>
### options.groups : <code>object</code>
Specify which groups to display in the output by supplying an object of key/value pairs, where the key is the name of the group to include and the value is a string or textObject. If the value is a string it is used as the group title. Alternatively supply an object containing a `title` and `description` string.

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
**Example**  
```js
{
    main: {
        title: "Main options",
        description: "This group contains the most important options."
    },
    misc: "Miscellaneous"
}
```
<a name="module_usage-options--UsageOptions+examples"></a>
### options.examples : <code>Array.&lt;string&gt;</code> &#124; <code>Array.&lt;object&gt;</code>
Examples

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
<a name="module_usage-options--UsageOptions+footer"></a>
### options.footer : <code>string</code>
Displayed at the foot of the usage output.

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
**Example**  
```js
{
    footer: "Project home: [underline]{https://github.com/me/my-app}"
}
```
<a name="module_usage-options--UsageOptions+hide"></a>
### options.hide : <code>string</code> &#124; <code>Array.&lt;string&gt;</code>
If you want to hide certain options from the output, specify their names here. This is sometimes used to hide the `defaultOption`.

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
**Example**  
```js
{
    hide: "files"
}
```


* * *

&copy; 2015 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown).
