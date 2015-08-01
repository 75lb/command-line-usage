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
    @type {string}
    */
    this.title = options.title;
    
    /**
    @type {string}
    */
    this.description = options.description;
    
    /**
    @type {string|string[]}
    */
    this.forms = options.forms;
    
    /**
    if you have groups, only names specified here will appear in the output
    @type {object}
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
