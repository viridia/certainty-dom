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

describe('ensure.textNode', function () {
  var textNode = document.createTextNode('some text');

  it('should recognize a text node as not being an element', function () {
    assertThrows(function () { ensure(textNode).isElement(); },
      "Expected [object Text] to be an element.");
  });
});
