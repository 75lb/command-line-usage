'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var columnLayout = require('column-layout');
var ansi = require('ansi-escape-sequences');
var os = require('os');
var t = require('typical');
var UsageOptions = require('./usage-options');
var arrayify = require('array-back');

var Lines = function () {
  function Lines() {
    _classCallCheck(this, Lines);

    this.list = [];
  }

  _createClass(Lines, [{
    key: 'add',
    value: function add(content) {
      var _this = this;

      arrayify(content).forEach(function (line) {
        return _this.list.push(ansi.format(line));
      });
    }
  }, {
    key: 'emptyLine',
    value: function emptyLine() {
      this.list.push('');
    }
  }, {
    key: 'header',
    value: function header(text) {
      if (text) {
        this.add(ansi.format(text, ['underline', 'bold']));
        this.emptyLine();
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.list.join(os.EOL);
    }
  }]);

  return Lines;
}();

function getUsage(sections) {
  if (arguments.length === 2) {
    return legacyGetUsage.apply(null, arguments);
  } else {
    if (sections && sections.length) {
      var _ret = function () {
        var output = new Lines();
        sections.forEach(function (section) {
          if (section.optionList) {
            if (section.hide && section.hide.length) {
              section.optionList = section.optionList.filter(function (definition) {
                return section.hide.indexOf(definition.name) === -1;
              });
            }
            output.header(section.header);
            output.add(optionList(section.optionList, section.group));
            output.emptyLine();
          } else if (section.content) {
            output.add(renderSection(section.header, section.content));
          } else if (section.banner) {
            output.header(section.header);
            output.add(section.banner);
          }
        });
        return {
          v: '\n' + output
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  }
}

function legacyGetUsage(definitions, options) {
  options = new UsageOptions(options);
  definitions = definitions || [];

  var output = new Lines();
  output.emptyLine();

  if (options.hide && options.hide.length) {
    definitions = definitions.filter(function (definition) {
      return options.hide.indexOf(definition.name) === -1;
    });
  }

  if (options.header) {
    output.add(renderSection('', options.header));
  }

  if (options.title || options.description) {
    output.add(renderSection(options.title, options.description));
  }

  if (options.synopsis) {
    output.add(renderSection('Synopsis', options.synopsis));
  }

  if (definitions.length) {
    if (options.groups) {
      for (var group in options.groups) {
        var val = options.groups[group];
        var title = void 0;
        var description = void 0;
        if (t.isObject(val)) {
          title = val.title;
          description = val.description;
        } else if (t.isString(val)) {
          title = val;
        } else {
          throw new Error('Unexpected group config structure');
        }

        output.add(renderSection(title, description));

        var _optionList = getUsage.optionList(definitions, group);
        output.add(renderSection(null, _optionList, true));
      }
    } else {
      output.add(renderSection('Options', getUsage.optionList(definitions), true));
    }
  }

  if (options.examples) {
    output.add(renderSection('Examples', options.examples));
  }

  if (options.footer) {
    output.add(renderSection('', options.footer));
  }

  return '\n' + output;
}

function optionList(definitions, group) {
  if (!definitions || definitions && !definitions.length) {
    throw new Error('you must pass option definitions to getUsage.optionList()');
  }
  var columns = [];

  if (group === '_none') {
    definitions = definitions.filter(function (def) {
      return !t.isDefined(def.group);
    });
  } else if (group) {
    definitions = definitions.filter(function (def) {
      return arrayify(def.group).indexOf(group) > -1;
    });
  }

  definitions.forEach(function (def) {
    columns.push({
      option: getOptionNames(def, 'bold'),
      description: ansi.format(def.description)
    });
  });

  return columnLayout.lines(columns, {
    padding: { left: '  ', right: ' ' },
    columns: [{ name: 'option', nowrap: true }, { name: 'description', maxWidth: 80 }]
  });
}

function getOptionNames(definition, optionNameStyles) {
  var names = [];
  var type = definition.type ? definition.type.name.toLowerCase() : '';
  var multiple = definition.multiple ? '[]' : '';
  if (type) type = type === 'boolean' ? '' : '[underline]{' + type + multiple + '}';
  type = ansi.format(definition.typeLabel || type);

  if (definition.alias) {
    names.push(ansi.format('-' + definition.alias, optionNameStyles));
  }
  names.push(ansi.format('--' + definition.name, optionNameStyles) + ' ' + type);
  return names.join(', ');
}

function renderSection(header, content, skipIndent) {
  var lines = new Lines();

  if (header) {
    lines.header(header);
  }

  if (!content) {
    return lines.list;
  } else {
    if (t.isString(content)) {
      lines.add(columnLayout.lines({ column: content }, {
        padding: { left: '  ', right: ' ' },
        viewWidth: 80
      }));
    } else if (Array.isArray(content) && content.every(t.isString)) {
        lines.add(skipIndent ? content : indentArray(content));
      } else if (Array.isArray(content) && content.every(t.isPlainObject)) {
          lines.add(columnLayout.lines(content, {
            padding: { left: '  ', right: ' ' }
          }));
        } else if (t.isPlainObject(content)) {
            if (!content.options || !content.data) {
              throw new Error('must have an "options" or "data" property\n' + JSON.stringify(content));
            }
            Object.assign({ padding: { left: '  ', right: ' ' } }, content.options);
            lines.add(columnLayout.lines(content.data.map(function (row) {
              return ansiFormatRow(row);
            }), content.options));
          } else {
            var message = 'invalid input - \'content\' must be a string, array of strings, or array of plain objects:\n\n' + JSON.stringify(content);
            throw new Error(message);
          }

    lines.emptyLine();
    return lines.list;
  }
}

function indentString(string) {
  return '  ' + string;
}
function indentArray(array) {
  return array.map(indentString);
}
function ansiFormatRow(row) {
  for (var key in row) {
    row[key] = ansi.format(row[key]);
  }
  return row;
}

module.exports = getUsage;