/** @module certainty */
var Subject = require('certainty/lib/subject/subject');

/** Subclass of Subject which provides assertions methods for object types.
    @param {FailureStrategy} failureStrategy The failure strategy to use when an assertion fails.
    @param {object} value The value being checked.
    @constructor
    @extends Subject
*/
function NodeSubject(failureStrategy, value) {
  Subject.call(this, failureStrategy, value);
}
NodeSubject.prototype = Object.create(Subject.prototype);
NodeSubject.prototype.constructor = NodeSubject;

/** Ensure that the subject value is an element.
    @return {NodeSubject} `this` for chaining.
*/
NodeSubject.prototype.isElement = function () {
  this.failureStrategy.fail('Expected ' + this.describe() + ' to be an element.');
  return this;
};

module.exports = NodeSubject;
