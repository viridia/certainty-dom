/** Convert an array value to a printable string representation.
    @param {Node} value The value to format.
    @param {Object} options Formatting options.
    @protected
*/
function formatNode(value, _options) {
  return value.toString();
}

module.exports = formatNode;
