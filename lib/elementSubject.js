/** @module certainty */
var format = require('certainty/lib/format');
var NodeSubject = require('./nodeSubject');
var ProxyBase = require('certainty/lib/subject/proxy');

/** A fluent context object containing the value of the field that was just tested. Used for
    additional assertions about a field.
    @constructor
  */
function AttributeValue(subject, name) {
  this.subject = subject;
  this.name = name;
  this.value = subject.value[name];
}

/** Ensure that the field has the expected value.
    @param {*} value The expected value of the field.
*/
AttributeValue.prototype.withValue = function (expected) {
  if (this.value != expected) {
    this.subject.fail('Expected ' + this.subject.describe() + ' to have an attribute \'' +
      this.name + '\' with value ' + format(expected) + ', actual value was ' + this.value + '.');
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



/** Ensure that the object being tested has a property (either its own or inherited) with the
    specified field name.
    @param {string} fieldName The name of the property.
    @return {AttributeValue} AttributeValue for additional assertions on the field value.
*/
ElementSubject.prototype.hasField = function (fieldName) {
  if (!(fieldName in this.value)) {
    this.failureStrategy.fail('Expected ' + this.describe() + ' to have a field named \'' +
      fieldName + '\'.');
  }
  return new AttributeValue(this, fieldName);
};

/** Ensure that the object has a property with the given field name. The property must be one
    of the object's own properties, not one inherited from a prototype.
    @param {string} fieldName The name of the property.
    @return {AttributeValue} AttributeValue for additional assertions on the field value.
*/
ElementSubject.prototype.hasOwnField = function (fieldName) {
  if (!(fieldName in this.value)) {
    this.failureStrategy.fail('Expected ' + this.describe() + ' to have own field named \'' +
      fieldName + '\'.');
  }
  return new AttributeValue(this, fieldName);
};

module.exports = ElementSubject;
