var context = require.context('./resources/assets/tests', true, /-test\.js$/);
context.keys().forEach(context);
