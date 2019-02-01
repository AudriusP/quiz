const Quiz = require('./quiz');
const UI = require('./ui');
const HTML = require('./html')

Quiz(UI(HTML('app')), $.getJSON).run();