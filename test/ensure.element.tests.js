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

  it('.isElement', function () {
    ensure(document.body).isElement();
    ensure(el).isElement();
  });

  it('.hasTagName', function () {
    ensure(document.body).hasTagName('body');
    ensure(el).hasTagName('div');
  });

  it('.hasChildCount', function () {
    ensure(el).hasChildCount(1);
    assertThrows(function () { ensure(el).hasChildCount(0); },
      "Expected [object HTMLDivElement] to have 0 children, actual number was 1.");
  });

  it('.hasDescendantMatching', function () {
    ensure(el).hasDescendantMatching('span');
    ensure(el).hasDescendantMatching('i');
    ensure(el).hasDescendantMatching('.test-class');
    ensure(el).hasDescendantMatching('.test-class.other-class');
    assertThrows(function () { ensure(el).hasDescendantMatching('div'); },
      "Expected [object HTMLDivElement] to have a descendant matching the query 'div'.");
    assertThrows(function () { ensure(el).hasDescendantMatching('.absent'); },
      "Expected [object HTMLDivElement] to have a descendant matching the query '.absent'.");
  });

  it('.hasAttribute', function () {
    ensure(el.firstElementChild).hasAttribute('id');
    ensure(el.firstElementChild).hasAttribute('id').withValue('0');
    assertThrows(function () { ensure(el.firstElementChild).hasAttribute('invalid'); },
      "Expected [object HTMLSpanElement] to have an attribute named 'invalid'.");
    assertThrows(function () { ensure(el.firstElementChild).hasAttribute('id').withValue('2'); },
      "Expected [object HTMLSpanElement] to have an attribute 'id' with value \"2\", " +
      "actual value was \"0\".");
  });

  it('.hasClass', function () {
    ensure(el.firstElementChild).hasClass('test-class');
    ensure(el.firstElementChild).hasClass('other-class');
    assertThrows(function () { ensure(el.firstElementChild).hasClass('invalid'); },
      "Expected [object HTMLSpanElement] to have class 'invalid'.");
  });

  it('.doesNotHaveClass', function () {
    ensure(el.firstElementChild).doesNotHaveClass('invalid');
    assertThrows(function () { ensure(el.firstElementChild).doesNotHaveClass('test-class'); },
      "Expected [object HTMLSpanElement] to not have class 'test-class'.");
  });

  it('.eachChildElement', function () {
    ensure(el).eachChildElement().hasTagName('span');
    assertThrows(function () { ensure(el).eachChildElement().hasTagName('i'); },
      "Expected child 0 of [object HTMLDivElement] to have a tag name of 'I', " +
      "actual tag name was 'SPAN'.");
  });
});
