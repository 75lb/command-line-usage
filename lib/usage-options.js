"use strict";
var arrayify = require("array-back");

/**
@module usage-options
*/
module.exports = UsageOptions;

/**
@class
@alias module:usage-options
@typicalname options
*/
function UsageOptions(options){
    options = options || {};
    
    /**
    * The title line at the top of the usage, typically the name of the app. Alternatively supply an object containing `title` and `style`.
    * @type {string|object}
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
    @type {string}
    */
    this.description = options.description;
    
    /**
    * An array of strings highlighting the main usage forms of the app.
    * @type {string|string[]}
    * @example 
    * [
    *     "$ my-app <options> <files>",
    *     "$ my-app [-cvh]"
    * ]
    */
    this.forms = options.forms;
    
    /**
    * Specify which groups to display in the output. If the value is a string it is used as the group title. Alternatively supply an object containing a `title` and `description` string. 
    * @type {object | string}
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
    Displayed at the foot of the usage output.
    @type {string}
    */
    this.footer = options.footer;
    
    /**
    If you want to hide certain options from the output, specify their names here. 
    @type {string|string[]}
    */
    this.hide = arrayify(options.hide);
}
