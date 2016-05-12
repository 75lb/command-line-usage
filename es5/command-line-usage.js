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
var wrap = require('wordwrapjs');

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
    key: 'toString',
    value: function toString() {
      return this.list.join(os.EOL);
    }
  }]);

  return Lines;
}();

function getUsage(definitions) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var sections = options.sections;
  if (sections && sections.length) {
    var _ret = function () {
      var output = new Lines();
      sections.forEach(function (s) {
        output.add(renderSection(s.header, s.content));
      });
      return {
        v: '\n' + output
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    options = new UsageOptions(options);
    definitions = definitions || [];

    var _output = new Lines();
    _output.emptyLine();

    if (options.hide && options.hide.length) {
      definitions = definitions.filter(function (definition) {
        return options.hide.indexOf(definition.name) === -1;
      });
    }

    if (options.header) {
      _output.add(renderSection('', options.header));
    }

    if (options.title || options.description) {
      _output.add(renderSection(options.title, t.isString(options.description) ? wrap.lines(options.description, { width: 80 }) : options.description));
    }

    if (options.synopsis) {
      _output.add(renderSection('Synopsis', options.synopsis));
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

          _output.add(renderSection(title, description));

          var optionList = getUsage.optionList(definitions, group);
          _output.add(renderSection(null, optionList, true));
        }
      } else {
        _output.add(renderSection('Options', getUsage.optionList(definitions), true));
      }
    }

    if (options.examples) {
      _output.add(renderSection('Examples', options.examples));
    }

    if (options.footer) {
      _output.add(renderSection('', options.footer));
    }

    return '\n' + _output;
  }
}

getUsage.optionList = function (definitions, group) {
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
};

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
    lines.add(ansi.format(header, ['underline', 'bold']));
    lines.emptyLine();
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