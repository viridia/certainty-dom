# Certainty-DOM

## Introduction

**Certainty-DOM** extends the [Certainty](https://github.com/viridia/certainty-dom) assertion
library with assertion methods for HTML DOM elements and other HTML Node types.

Example:

```javascript
import { ensure } from 'certainty';
import 'certainty-dom';

// Assert that the body element has the expected tag name.
ensure(document.body).hasTagName('body');
```

## Element assertions

```javascript
ensure(someElement).isElement();  // is an element
ensure(someElement).hasTagName(tagName);
ensure(someElement).hasChildCount(count);
ensure(someElement).hasDescendantMatching(query); // uses querySelector()
ensure(someElement).hasAttribute(attrName).withValue(value);
ensure(someElement).hasClass(clsName);
ensure(someElement).doesNotHaveClass(clsName);

// Apply an assertion to all child elements.
ensure(someElement).eachChildElement().hasTagName(tagName);
```
