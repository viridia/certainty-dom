var subjectFactory = require('certainty').subjectFactory;
var ElementSubject = require('./lib/elementSubject');
var NodeSubject = require('./lib/nodeSubject');

subjectFactory.addType(
  function (v) { return v instanceof Node },
  NodeSubject
);

subjectFactory.addType(
  function (v) { return v instanceof Element },
  ElementSubject
);
