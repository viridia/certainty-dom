/* eslint-env node, mocha */
var ensure = require('certainty').ensure;
require('../index');

function assertThrows(f, msg) {
  try {
    f();
  } catch (e) {
    ensure(e + '').named('message').equals('Error: ' + msg);
    return;
  }
  throw new Error('expected assertion failure with message: \'' + msg + '\'');
}

describe('ensure.element', function () {
  var el = document.createElement('div');
  el.innerHTML = '<span id="0" class="test-class other-class">Sample <i>Text</i></span>';

  it('should recognize elements', function () {
    ensure(document.body).isElement();
    ensure(el).isElement();
  });

  it('should recognize element tag names', function () {
    ensure(document.body).hasTagName('body');
    ensure(el).hasTagName('div');
  });

  it('should ensure the correct child count', function () {
    ensure(el).hasChildCount(1);
    assertThrows(function () { ensure(el).hasChildCount(0); },
      "Expected [object HTMLDivElement] to have 0 children, actual number was 1.");
  });

  it('should test for matching descendants', function () {
    ensure(el).hasDescendantMatching('span');
    ensure(el).hasDescendantMatching('i');
    ensure(el).hasDescendantMatching('.test-class');
    ensure(el).hasDescendantMatching('.test-class.other-class');
    assertThrows(function () { ensure(el).hasDescendantMatching('div'); },
      "Expected [object HTMLDivElement] to have a descendant matching the query 'div'.");
    assertThrows(function () { ensure(el).hasDescendantMatching('.absent'); },
      "Expected [object HTMLDivElement] to have a descendant matching the query '.absent'.");
  });
});
