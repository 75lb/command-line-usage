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
Exports a single function to generate a usage guide using [column-layout](http://github.com/75lb/column-layout).

@module command-line-usage
*/
module.exports = getUsage;

/**
@param {optionDefinition[]} - an array of [option definition](https://github.com/75lb/command-line-args/tree/rewrite#exp_module_definition--OptionDefinition) objects. In addition to the regular definition properties, command-line-usage will look for:

- `description` - a string describing the option.
- `typeLabel` - a string to replace the default type string (e.g. `<string>`). It's often more useful to set a more descriptive type label, like `<ms>`, `<files>`, `<command>` etc. 

@param options {module:usage-options} - see [UsageOptions](#exp_module_usage-options--UsageOptions).
@returns {string}
@alias module:command-line-usage
@example @lang off
Some example usage output: 

![usage](https://raw.githubusercontent.com/75lb/command-line-usage/master/example/screens/typical.png)

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
    if (options.hide && options.hide.length){
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
            description: getText(cliOption.description)
        });
    };
    lines.addEmpty = function(){
        this.push("");
    };

    lines.addEmpty();
    if (options.title) lines.addLine(getText(options.title, [ "underline", "bold" ]));
    if (options.description) lines.addLine(getText(options.description));
    if (options.title || options.description) lines.addEmpty();

    if (!options.usage && options.forms){
        options.usage = {
            forms: options.forms
        };
    }

    if (options.usage){
        options.usage.forms = arrayify(options.usage.forms);
        lines.addLine(getText(options.usage.title || "Usage", [ "underline", "bold" ]));
        options.usage.forms.forEach(function(form){
            lines.addLine(getText(form));
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
                lines.addLine(getText(title, [ "underline", "bold" ]));
                if (description){
                    lines.addLine(getText(description));
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
        lines.addLine(getText(options.footer));
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
    if (type) type = type === "boolean" ? "" : "<" + type + multiple + ">";
    type = cliOption.typeLabel || type;

    if (cliOption.alias) names.push("-" + cliOption.alias);
    names.push("--" + cliOption.name + " " + type);
    return names.join(", ");
}

function getText(text, styleArray){
    if (t.isString(text)){
        return ansi.format(text, styleArray)
    } else if (t.isPlainObject(text)){
        return ansi.format(text.text, text.format || styleArray);
    }
}
