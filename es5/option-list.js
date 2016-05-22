'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = require('./section');
var tableLayout = require('table-layout');
var ansi = require('ansi-escape-sequences');
var os = require('os');
var t = require('typical');
var arrayify = require('array-back');

var OptionList = function (_Section) {
  _inherits(OptionList, _Section);

  function OptionList(data) {
    _classCallCheck(this, OptionList);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OptionList).call(this));

    if (data.hide && data.hide.length) {
      data.optionList = data.optionList.filter(function (definition) {
        return data.hide.indexOf(definition.name) === -1;
      });
    }
    _this.header(data.header);
    _this.add(optionList(data.optionList, data.group));
    _this.emptyLine();
    return _this;
  }

  return OptionList;
}(Section);

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

  return tableLayout.lines(columns, {
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

module.exports = OptionList;