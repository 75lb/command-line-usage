"use strict";
var arrayify = require("array-back");

/**
@module usage-options
*/
module.exports = UsageOptions;

/**
@class
@classDesc The class describes all valid options for the `getUsage` function. Inline formatting can be used within any text string supplied using valid [ansi-escape-sequences formatting syntax](https://github.com/75lb/ansi-escape-sequences#module_ansi-escape-sequences.format). 
@alias module:usage-options
@typicalname options
*/
function UsageOptions(options){
    options = options || {};
    
    /**
    * The title line at the top of the usage, typically the name of the app. By default it is underlined but this formatting can be overridden by passing a {@link module:usage-options~textObject}.
    * 
    * @type {string|module:usage-options~textObject}
    * @example
    * {
    *     title: "my-app"
    * }
    * @example
    * {
    *     title: {
    *        text: "my-app",
    *        format: [ "bold", "underline" ]
    *     }
    * }
    */
    this.title = options.title;
    
    /**
    A description to go underneath the title. For example, some words about what the app is for.
    @type {string|module:usage-options~textObject}
    */
    this.description = options.description;
    
    /**
    * An array of strings highlighting the main usage forms of the app.
    * @type {object}
    * @property [title=Usage] {string | module:usage-options~textObject} - The title text for this section
    * @property forms {string | string[]} - An array of lines describing the various usage forms. 
    * @example 
    * {
    *     usage: {
    *         title: "Synopsis",
    *         forms: [
    *             "$ my-app <options> <files>",
    *             "$ my-app [-cvh]"
    *         ]
    *     }
    * }
    */
    this.usage = options.usage;
    this.forms = options.forms;
    
    /**
    * Specify which groups to display in the output by supplying an object of key/value pairs, where the key is the name of the group to include and the value is a string or textObject. If the value is a string it is used as the group title. Alternatively supply an object containing a `title` and `description` string. 
    * @type {object}
    * @example
    * {
    *     main: { 
    *         title: "Main options",
    *         description: "This group contains the most important options."
    *     },
    *     misc: "Miscellaneous"
    * }
    */
    this.groups = options.groups;
    
    /**
    * Displayed at the foot of the usage output.
    * @type {string|module:usage-options~textObject}
    * @example
    * {
    *     footer: "Project home: [underline]{https://github.com/me/my-app}"
    * }
    */
    this.footer = options.footer;
    
    /**
    * If you want to hide certain options from the output, specify their names here. This is sometimes used to hide the `defaultOption`.
    * @type {string|string[]}
    * @example
    * {
    *     hide: "files"
    * }
    */
    this.hide = arrayify(options.hide);
}

/**
Contains text and formatting information. 

@typedef textObject 
@property text {string} - the text to display
@property format {string | string[]} - one or more ansi style names from [this list](https://github.com/75lb/ansi-escape-sequences#module_ansi-escape-sequences.style).
*/
