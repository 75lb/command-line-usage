[![view on npm](http://img.shields.io/npm/v/command-line-usage.svg)](https://www.npmjs.org/package/command-line-usage)
[![npm module downloads per month](http://img.shields.io/npm/dm/command-line-usage.svg)](https://www.npmjs.org/package/command-line-usage)
[![Build Status](https://travis-ci.org/75lb/command-line-usage.svg?branch=master)](https://travis-ci.org/75lb/command-line-usage)
[![Dependency Status](https://david-dm.org/75lb/command-line-usage.svg)](https://david-dm.org/75lb/command-line-usage)

# command-line-usage
Generates [column-layout](http://github.com/75lb/column-layout) usage information for a command-line parser (e.g. [command-line-args](http://github.com/75lb/command-line-args)).

## Synopsis
Where `example/my-app.js` looks like this
```js
module.exports = {
    options: {
        title: "my-app",
        description: "Generates something useful",
        forms: [
            "$ cat input.json | my-app [<options>]",
            "$ my-app <files>"
        ],
        groups: {
            main: { 
                title: "Main options",
                description: "This group contains the most important options."
            },
            misc: "Miscellaneous"
        },
        footer: "Project home: https://github.com/me/my-app"
    },
    data: [
        { name: "one", alias: "a", type: String, group: "main",
          description: "The first option"
        },
        { name: "two", type: Number, alias: "b", group: "main",
          description: "The second option"
        },
        { name: "three", alias: "c", type: String, group: "misc",
          description: "The third option"
        },
        { name: "four", type: Number, alias: "d", group: "misc",
          description: "The fourth option"
        }
    ]
};
```
This command:
```sh
$ command-line-usage example/my-app.js
```

Outputs this:
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

## Modules
<dl>
<dt><a href="#module_command-line-usage">command-line-usage</a></dt>
<dd></dd>
<dt><a href="#module_usage-options">usage-options</a></dt>
<dd></dd>
</dl>
<a name="module_command-line-usage"></a>
## command-line-usage
<a name="exp_module_command-line-usage--usage"></a>
### usage(cliOptions, options) ⇒ <code>string</code> ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| cliOptions | <code>Array.&lt;cliOption&gt;</code> | the CLI options |
| options | <code>[usage-options](#module_usage-options)</code> | Options |

<a name="module_usage-options"></a>
## usage-options

* [usage-options](#module_usage-options)
  * [UsageOptions](#exp_module_usage-options--UsageOptions) ⏏
    * [.title](#module_usage-options--UsageOptions+title) : <code>string</code>
    * [.description](#module_usage-options--UsageOptions+description) : <code>string</code>
    * [.forms](#module_usage-options--UsageOptions+forms) : <code>string</code> &#124; <code>Array.&lt;string&gt;</code>
    * [.groups](#module_usage-options--UsageOptions+groups) : <code>object</code>
    * [.footer](#module_usage-options--UsageOptions+footer) : <code>string</code>
    * [.hide](#module_usage-options--UsageOptions+hide) : <code>string</code> &#124; <code>Array.&lt;string&gt;</code>

<a name="exp_module_usage-options--UsageOptions"></a>
### UsageOptions ⏏
**Kind**: Exported class  
<a name="module_usage-options--UsageOptions+title"></a>
#### usageOptions.title : <code>string</code>
**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
<a name="module_usage-options--UsageOptions+description"></a>
#### usageOptions.description : <code>string</code>
**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
<a name="module_usage-options--UsageOptions+forms"></a>
#### usageOptions.forms : <code>string</code> &#124; <code>Array.&lt;string&gt;</code>
**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
<a name="module_usage-options--UsageOptions+groups"></a>
#### usageOptions.groups : <code>object</code>
if you have groups, only names specified here will appear in the output

**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
<a name="module_usage-options--UsageOptions+footer"></a>
#### usageOptions.footer : <code>string</code>
**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  
<a name="module_usage-options--UsageOptions+hide"></a>
#### usageOptions.hide : <code>string</code> &#124; <code>Array.&lt;string&gt;</code>
**Kind**: instance property of <code>[UsageOptions](#exp_module_usage-options--UsageOptions)</code>  

* * *

&copy; 2015 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown).
