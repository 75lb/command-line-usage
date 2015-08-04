"use strict";
var columnLayout = require("column-layout");
var o = require("object-tools");
var a = require("array-tools");
var util = require("util");
var ansi = require("ansi-escape-sequences");
var t = require("typical");
var UsageOptions = require("./usage-options");
var arrayify = require("array-back");

/**
Generates [column-layout](http://github.com/75lb/column-layout) usage information for a command-line parser (e.g. [command-line-args](http://github.com/75lb/command-line-args)).

@module command-line-usage
*/
module.exports = getUsage;

/**
@param {optionDefinition[]} - the option definitions
@param options {module:usage-options} - Options
@returns {string}
@alias module:command-line-usage
@example
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
*/
function getUsage(definitions, options){
    options = new UsageOptions(options);
    definitions = definitions || [];

    if (!Array.isArray(definitions)){
        if (definitions.options && definitions.data){
            options = o.extend(definitions.options, options);
            definitions = definitions.data;
        }
    }

    /* skip hidden options */
    if (options.hide.length){
        definitions = definitions.filter(function(option){
            return !a(options.hide).contains(option.name);
        });
    }

    var lines = [];
    lines.addLine = function(line){
        this.push("  " + line);
    };
    lines.addRow = function(cliOption){
        lines.push({
            option: getOptionNames(cliOption),
            description: cliOption.description
        });
    };
    lines.addEmpty = function(){
        this.push("");
    };

    lines.addEmpty();
    if (options.title) lines.addLine(ansi.format(options.title, [ "underline" ]));
    if (options.description) lines.addLine(options.description);
    if (options.title || options.description) lines.addEmpty();

    if (options.forms){
        options.forms = arrayify(options.forms);
        lines.addLine(ansi.format("Usage", "underline"));
        options.forms.forEach(function(form){
            lines.addLine(form);
        });
        lines.addEmpty();
    }

    if (definitions.length){
        if (options.groups){
            o.each(options.groups, function(val, group){
                var title, description;
                if (t.isObject(val)){
                    title = val.title;
                    description = val.description;
                } else if (typeof val === "string"){
                    title = val;
                } else {
                    throw ("Unexpected group type");
                }
                lines.addLine(ansi.format(title, "underline"));
                if (description){
                    lines.addLine(description);
                    lines.addEmpty();
                }
                if (group === "_none"){
                    a(definitions).where({ group: undefined }).forEach(lines.addRow);
                } else {
                    a(definitions).where({ "+group": group }).forEach(lines.addRow);
                }
                lines.addEmpty();
            });
        } else {
            definitions.forEach(lines.addRow);
            lines.addEmpty();
        }
    }

    if (options.footer){
        lines.addLine(options.footer);
        lines.addEmpty();
    }

    var output = columnLayout(lines, {
        viewWidth: options.viewWidth || process.stdout.columns,
        padding: {
            left: "  ",
            right: " "
        },
        columns: [
            { name: "option", nowrap: true }
        ]
    });
    output = output.replace(/\n\n$/, "\n");
    return output;
}

function getOptionNames(cliOption){
    var names = [];
    var type = cliOption.type ? cliOption.type.name.toLowerCase() : "";
    var multiple = cliOption.multiple ? "[]" : "";
    if (type) type = type === "boolean" ? "" : " <" + type + multiple + ">";

    if (cliOption.alias) names.push("-" + cliOption.alias);
    names.push("--" + cliOption.name + type);
    return names.join(", ");
}
