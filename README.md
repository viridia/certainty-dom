# Certainty-DOM

**Certainty-DOM** extends the Certainty assertion library with assertion methods for HTML DOM
elements and other node types.

Example:

```javascript
import { ensure } from 'certainty';
import `certainty-dom`;

ensure(document.body).hasTagName('body');
```
