'use strict';

var OptionList = require('./option-list');
var Content = require('./content');
var Banner = require('./banner');
var arrayify = require('array-back');

module.exports = getUsage;

function getUsage(sections) {
  sections = arrayify(sections);
  if (sections.length) {
    var output = sections.map(function (section) {
      if (section.optionList) {
        return new OptionList(section);
      } else if (section.content) {
        return new Content(section);
      } else if (section.banner) {
        return new Banner(section);
      }
    });
    return '\n' + output.join('\n');
  }
}