const Quiz = require('./quiz');
const UI = require('./ui');
const HTML = require('./html');
const Canvas = require('./canvas');

Quiz(UI(HTML('app')), $.getJSON).run();