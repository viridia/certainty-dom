var subjectFactory = require('certainty').subjectFactory;
var ElementSubject = require('./lib/elementSubject');
var NodeSubject = require('./lib/nodeSubject');
var formatElement = require('./lib/formatElement');
var formatNode = require('./lib/formatNode');
var registry = require('certainty/lib/format/registry');

// Subject types
subjectFactory.addType(
  function (v) { return v instanceof Node },
  NodeSubject
);

subjectFactory.addType(
  function (v) { return v instanceof Element },
  ElementSubject
);

// Formatter types
registry.addType(function(v) { return v instanceof Node; }, formatNode);
registry.addType(function(v) { return v instanceof Element; }, formatElement);
