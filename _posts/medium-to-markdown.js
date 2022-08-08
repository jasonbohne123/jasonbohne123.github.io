const mediumToMarkdown = require('medium-to-markdown');
 
// Enter url here
mediumToMarkdown.convertFromUrl('https://medium.com/@jbohne822/understanding-option-valuation-as-a-dynamical-system-using-pysindy-3c5aef78effd')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});
