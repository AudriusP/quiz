const Quiz = require('./quiz');
const UI = require('./ui');

Quiz(UI(document), $.getJSON).run('app');