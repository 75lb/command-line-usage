[![view on npm](http://img.shields.io/npm/v/command-line-usage.svg)](https://www.npmjs.org/package/command-line-usage)
[![npm module downloads per month](http://img.shields.io/npm/dm/command-line-usage.svg)](https://www.npmjs.org/package/command-line-usage)
[![Build Status](https://travis-ci.org/75lb/command-line-usage.svg?branch=master)](https://travis-ci.org/75lb/command-line-usage)
[![Dependency Status](https://david-dm.org/75lb/command-line-usage.svg)](https://david-dm.org/75lb/command-line-usage)

<a name="module_command-line-usage"></a>
## command-line-usage
Generates [column-layout](http://github.com/75lb/column-layout) usage information for a command-line parser (e.g. [command-line-args](http://github.com/75lb/command-line-args)).

<a name="exp_module_command-line-usage--getUsage"></a>
### getUsage(definitions, options) ⇒ <code>string</code> ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| definitions | <code>Array.&lt;optionDefinition&gt;</code> | the option definitions |
| options | <code>[usage-options](#module_usage-options)</code> | Options |

**Example**  
To get `usage` looking like this:
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

some example code:
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
**Kind**: Exported class  
* [UsageOptions](#exp_module_usage-options--UsageOptions) ⏏
  * [.title](#module_usage-options--UsageOptions+title) : <code>string</code> &#124; <code>object</code>
  * [.description](#module_usage-options--UsageOptions+description) : <code>string</code>
  * [.forms](#module_usage-options--UsageOptions+forms) : <code>string</code> &#124; <code>Array.&lt;string&gt;</code>
  * [.groups](#module_usage-options--UsageOptions+groups) : <code>object</code> &#124; <code>string</code>
  * [.footer](#module_usage-options--UsageOptions+footer) : <code>string</code>
  * [.hide](#module_usage-options--UsageOptions+hide) : <code>string</code> &#124; <code>Array.&lt;string&gt;</code>

<a name="module_usage-options--UsageOptions+title"></a>
### options.title : <code>string</code> &#124; <code>object</code>
The title line at the top of the usage, typically the name of the app. Alternatively supply an object containing `title` and `style`.

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
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
<a name="module_usage-options--UsageOptions+forms"></a>
### options.forms : <code>string</code> &#124; <code>Array.&lt;string&gt;</code>
An array of strings highlighting the main usage forms of the app.

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
**Example**  
```js
[
    "$ my-app <options> <files>",
    "$ my-app [-cvh]"
]
```
<a name="module_usage-options--UsageOptions+groups"></a>
### options.groups : <code>object</code> &#124; <code>string</code>
Specify which groups to display in the output. If the value is a string it is used as the group title. Alternatively supply an object containing a `title` and `description` string.

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
### options.footer : <code>string</code>
Displayed at the foot of the usage output.

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
<a name="module_usage-options--UsageOptions+hide"></a>
### options.hide : <code>string</code> &#124; <code>Array.&lt;string&gt;</code>
If you want to hide certain options from the output, specify their names here.

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  


* * *

&copy; 2015 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown).
