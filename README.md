# Certainty-DOM

**Certainty-DOM** extends the [Certainty](https://github.com/viridia/certainty-dom) assertion
library with assertion methods for HTML DOM elements and other HTML Node types.

Example:

```javascript
import { ensure } from 'certainty';
import `certainty-dom`;

// Assert that the body element has the expected tag name.
ensure(document.body).hasTagName('body');
```
