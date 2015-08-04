"use strict";
var arrayify = require("array-back");

/**
@module usage-options
*/
module.exports = UsageOptions;

/**
@class
@alias module:usage-options
*/
function UsageOptions(options){
    options = options || {};
    
    /**
    The title line at the top of the usage, typically the name of the app. 
    @type {string}
    */
    this.title = options.title;
    
    /**
    A description to go underneath the title. For example, some words about what the app is for.
    @type {string}
    */
    this.description = options.description;
    
    /**
    An array of strings highlighting the main usage forms of the app.
    @type {string|string[]}
    @example 
    [
        "$ my-app <options> <files>",
        "$ my-app [-cvh]"
    ]
    */
    this.forms = options.forms;
    
    /**
    Specify a property per group to be displayed. 
    @type {object}
    @example
    {
        main: { 
            title: "Main options",
            description: "This group contains the most important options."
        },
        misc: "Miscellaneous"
    }
    */
    this.groups = options.groups;
    /**
    @type {string}
    */
    this.footer = options.footer;
    /**
    @type {string|string[]}
    */
    this.hide = arrayify(options.hide);
}
