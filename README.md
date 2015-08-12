[![view on npm](http://img.shields.io/npm/v/command-line-usage.svg)](https://www.npmjs.org/package/command-line-usage)
[![npm module downloads per month](http://img.shields.io/npm/dm/command-line-usage.svg)](https://www.npmjs.org/package/command-line-usage)
[![Build Status](https://travis-ci.org/75lb/command-line-usage.svg?branch=master)](https://travis-ci.org/75lb/command-line-usage)
[![Dependency Status](https://david-dm.org/75lb/command-line-usage.svg)](https://david-dm.org/75lb/command-line-usage)

<a name="module_command-line-usage"></a>
## command-line-usage
Exports a single function to generate a usage guide using [column-layout](http://github.com/75lb/column-layout).

<a name="exp_module_command-line-usage--getUsage"></a>
### getUsage(definitions, options) ⇒ <code>string</code> ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| definitions | <code>Array.&lt;optionDefinition&gt;</code> | an array of [option definition](https://github.com/75lb/command-line-args/tree/rewrite#exp_module_definition--OptionDefinition) objects. |
| options | <code>[usage-options](#module_usage-options)</code> | see [UsageOptions](#exp_module_usage-options--UsageOptions). |

**Example**  
Some example usage output: 
```

  my-app
  Generates something useful

  Usage
  $ cat input.json | my-app [<options>]
  $ my-app <files>

  Main options
  This group contains the most important options.

  -a, --one <string>     The first option
  -b, --two <number>     The second option

  Miscellaneous
  -c, --three <string>   The third option
  -d, --four <number>    The fourth option

  Project home: https://github.com/me/my-app

```

..and the code to create it:
```js
var getUsage = require("command-line-usage");

var optionDefinitions = [
    { name: "help", alias: "h", type: Boolean, description: "Display this usage guide.", group: "main" },
    { name: "files", alias: "f", type: String, multiple: true, defaultOption: true, description: "The input files to process", group: "main" },
    { name: "timeout", alias: "t", type: Number, description: "Timeout value in ms", group: "main" },
    { name: "custom", type: Custom, description: "A custom class instance"}
];

var options = {
    title: "%bold{a typical app}",
    description: "Generates something %yellow bg-black{wild and crazy}",
    forms: [
        "$ cat input.json | my-app [<options>]",
        "$ my-app <files>"
    ],
    groups: {
        main: {
            title: "Main options",
            description: "This group contains the most important options."
        },
        _none: "No group"
    },
    footer: "Project home: https://github.com/me/my-app",
    hide: [ "files" ]
};

var usage = getUsage(optionDefinitions, options);
```


<a name="exp_module_usage-options--UsageOptions"></a>
## UsageOptions ⏏
The class describes all valid options for the `getUsage` function. Inline formatting can be used within any text string supplied using valid [ansi-escape-sequences formatting syntax](https://github.com/75lb/ansi-escape-sequences#module_ansi-escape-sequences.format).

**Kind**: Exported class  
* [UsageOptions](#exp_module_usage-options--UsageOptions) ⏏
  * _instance_
    * [.title](#module_usage-options--UsageOptions+title) : <code>string</code> &#124; <code>[textObject](#module_usage-options--UsageOptions..textObject)</code>
    * [.description](#module_usage-options--UsageOptions+description) : <code>string</code> &#124; <code>[textObject](#module_usage-options--UsageOptions..textObject)</code>
    * [.usage](#module_usage-options--UsageOptions+usage) : <code>object</code>
    * [.groups](#module_usage-options--UsageOptions+groups) : <code>object</code>
    * [.footer](#module_usage-options--UsageOptions+footer) : <code>string</code> &#124; <code>[textObject](#module_usage-options--UsageOptions..textObject)</code>
    * [.hide](#module_usage-options--UsageOptions+hide) : <code>string</code> &#124; <code>Array.&lt;string&gt;</code>
  * _inner_
    * [~textObject](#module_usage-options--UsageOptions..textObject)

<a name="module_usage-options--UsageOptions+title"></a>
### options.title : <code>string</code> &#124; <code>[textObject](#module_usage-options--UsageOptions..textObject)</code>
The title line at the top of the usage, typically the name of the app. By default it is underlined but this formatting can be overridden by passing a [textObject](#module_usage-options--UsageOptions..textObject).

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
### options.description : <code>string</code> &#124; <code>[textObject](#module_usage-options--UsageOptions..textObject)</code>
A description to go underneath the title. For example, some words about what the app is for.

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
<a name="module_usage-options--UsageOptions+usage"></a>
### options.usage : <code>object</code>
An array of strings highlighting the main usage forms of the app.

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | <code>string</code> &#124; <code>[textObject](#module_usage-options--UsageOptions..textObject)</code> | <code>&quot;Usage&quot;</code> | The title text for this section |
| forms | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> |  | An array of lines describing the various usage forms. |

**Example**  
```js
{
    usage: {
        title: "Synopsis",
        forms: [
            "$ my-app <options> <files>",
            "$ my-app [-cvh]"
        ]
    }
}
```
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
<a name="module_usage-options--UsageOptions+footer"></a>
### options.footer : <code>string</code> &#124; <code>[textObject](#module_usage-options--UsageOptions..textObject)</code>
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
<a name="module_usage-options--UsageOptions..textObject"></a>
### options~textObject
Contains text and formatting information.

**Kind**: inner typedef of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | the text to display |
| format | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | one or more ansi style names from [this list](https://github.com/75lb/ansi-escape-sequences#module_ansi-escape-sequences.style). |



* * *

&copy; 2015 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown).
