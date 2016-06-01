/** @module certainty */
var format = require('certainty/lib/format');
var NodeSubject = require('./nodeSubject');
var ProxyBase = require('certainty/lib/subject/proxy');
var EachSubject = require('certainty/lib/subject/eachSubject');

/** A fluent context object containing the value of the field that was just tested. Used for
    additional assertions about a field.
    @constructor
  */
function AttributeValue(subject, name) {
  this.subject = subject;
  this.name = name;
  this.value = subject.value.getAttribute(name);
}

/** Ensure that the field has the expected value.
    @param {*} value The expected value of the field.
*/
AttributeValue.prototype.withValue = function (expected) {
  if (this.value != expected) {
    this.subject.fail('Expected ' + this.subject.describe() + ' to have an attribute \'' +
      this.name + '\' with value ' + format(expected) + ', actual value was "' + this.value + '".');
  }
}
ProxyBase.addMethods(AttributeValue);

/** Subclass of Subject which provides assertions methods for object types.
    @param {FailureStrategy} failureStrategy The failure strategy to use when an assertion fails.
    @param {object} value The value being checked.
    @constructor
    @extends Subject
*/
function ElementSubject(failureStrategy, value) {
  NodeSubject.call(this, failureStrategy, value);
}
ElementSubject.prototype = Object.create(NodeSubject.prototype);
ElementSubject.prototype.constructor = ElementSubject;

/** Return a list of class names for the element.
    @return {Array} List of classes.
*/
ElementSubject.prototype.classList = function () {
  var classes = this.value.getAttribute('class');
  if (classes) {
    return classes.split(/\s+/);
  }
  return [];
};

/** Ensure that the subject value is an element.
    @return {ElementSubject} `this` for chaining.
*/
ElementSubject.prototype.isElement = function () {
  return this;
};

/** Ensure that the element has the specified tag name.
    @param {string} tagName The tag name of the element.
    @return {ElementSubject} `this` for chaining.
*/
ElementSubject.prototype.hasTagName = function (tagName) {
  if (this.value.tagName.toUpperCase() != tagName.toUpperCase()) {
    this.failureStrategy.fail('Expected ' + this.describe() + ' to have a tag name of \'' +
      tagName.toUpperCase() + '\', actual tag name was \'' + this.value.tagName.toUpperCase() +
      '\'.');
  }
  return this;
};

/** Ensure that the element has the specified number of children.
    @param {number} count The expected number of children.
    @return {ElementSubject} `this` for chaining.
*/
ElementSubject.prototype.hasChildCount = function (count) {
  if (this.value.children.length != count) {
    this.failureStrategy.fail('Expected ' + this.describe() + ' to have ' + count +
      (count == 1 ? ' child' : ' children') + ', actual number was ' + this.value.children.length +
      '.');
  }
  return this;
};

/** Ensure that the element has at least one descendant matching the given query.
    @param {string} query A query expression passed to Element.querySelector.
    @return {ElementSubject} `this` for chaining.
*/
ElementSubject.prototype.hasDescendantMatching = function (query) {
  if (!this.value.querySelector(query)) {
    this.failureStrategy.fail('Expected ' + this.describe() +
      ' to have a descendant matching the query \'' + query + '\'.');
  }
  return this;
};

/** Ensure that the element has an attribute with the specified name.
    @param {string} attrName The name of the attribute.
    @return {AttributeValue} AttributeValue for additional assertions on the attribute value.
*/
ElementSubject.prototype.hasAttribute = function (attrName) {
  if (!this.value.hasAttribute(attrName)) {
    this.failureStrategy.fail('Expected ' + this.describe() + ' to have an attribute named \'' +
      attrName + '\'.');
  }
  return new AttributeValue(this, attrName);
};

/** Ensure that the element's 'class' attribute contains the specified CSS class name.
    @param {string} clsName The class.
    @return {ElementSubject} `this` for chaining.
*/
ElementSubject.prototype.hasClass = function (clsName) {
  var classes = this.classList();
  if (classes.indexOf(clsName) < 0) {
    this.failureStrategy.fail('Expected ' + this.describe() + ' to have class \'' +
      clsName + '\'.');
  }
  return this;
};

/** Ensure that the element's 'class' attribute does not contain the specified CSS class name.
    @param {string} clsName The class.
    @return {ElementSubject} `this` for chaining.
*/
ElementSubject.prototype.doesNotHaveClass = function (clsName) {
  var classes = this.classList();
  if (classes.indexOf(clsName) >= 0) {
    this.failureStrategy.fail('Expected ' + this.describe() + ' to not have class \'' +
      clsName + '\'.');
  }
  return this;
};

/** Causes any subsequent assertion methods to apply to each member of the set individually.
    @return {EachSubject} Fluent context that applies assertions to set members.
*/
ElementSubject.prototype.eachChildElement = function () {
  return new EachSubject(this, this.value.children, 'child', false);
};

module.exports = ElementSubject;
