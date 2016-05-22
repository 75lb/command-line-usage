'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = require('./section');

var Banner = function (_Section) {
  _inherits(Banner, _Section);

  function Banner(data) {
    _classCallCheck(this, Banner);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Banner).call(this));

    _this.header(data.header);
    _this.add(data.banner);
    _this.emptyLine();
    return _this;
  }

  return Banner;
}(Section);

module.exports = Banner;