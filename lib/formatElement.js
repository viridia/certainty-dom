/** Convert an array value to a printable string representation.
    @param {Element} value The value to format.
    @param {Object} options Formatting options.
    @protected
*/
function formatElement(value, _options) {
  var parts = ['<', value.tagName.toLowerCase()];
  if (value.hasAttribute('id')) {
    parts.push(' id="');
    parts.push(value.getAttribute('id'));
    parts.push('"');
  }
  if (value.hasAttribute('class')) {
    parts.push(' class="');
    parts.push(value.getAttribute('class'));
    parts.push('"');
  }
  parts.push('>');
  return parts.join('');
}

module.exports = formatElement;
