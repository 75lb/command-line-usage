'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tableLayout = require('table-layout');
var ansi = require('ansi-escape-sequences');
var t = require('typical');
var Section = require('./section');

var Content = function (_Section) {
  _inherits(Content, _Section);

  function Content(section) {
    _classCallCheck(this, Content);

    var _this = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this));

    var defaultPadding = { left: '  ', right: ' ' };
    var content = section.content;
    var raw = section.raw;
    _this.header(section.header);

    if (content) {
      if (raw) {
        _this.add(content);
      } else if (t.isString(content)) {
        _this.add(tableLayout.lines({ column: ansi.format(content) }, {
          padding: defaultPadding,
          maxWidth: 80
        }));
      } else if (Array.isArray(content) && content.every(t.isString)) {
        var rows = content.map(function (string) {
          return { column: ansi.format(string) };
        });
        _this.add(tableLayout.lines(rows, {
          padding: defaultPadding,
          maxWidth: 80
        }));
        _this.add();
      } else if (Array.isArray(content) && content.every(t.isPlainObject)) {
        _this.add(tableLayout.lines(content, {
          padding: defaultPadding
        }));
      } else if (t.isPlainObject(content)) {
        if (!content.options || !content.data) {
          throw new Error('must have an "options" or "data" property\n' + JSON.stringify(content));
        }
        Object.assign({ padding: defaultPadding }, content.options);
        _this.add(tableLayout.lines(content.data.map(function (row) {
          return ansiFormatRow(row);
        }), content.options));
      } else {
        var message = 'invalid input - \'content\' must be a string, array of strings, or array of plain objects:\n\n' + JSON.stringify(content);
        throw new Error(message);
      }

      _this.emptyLine();
    }
    return _this;
  }

  return Content;
}(Section);

function ansiFormatRow(row) {
  for (var key in row) {
    row[key] = ansi.format(row[key]);
  }
  return row;
}

module.exports = Content;