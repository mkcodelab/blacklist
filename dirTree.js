// uses directory tree module to save dir to json

// "type": "module" insert that in package.json if using fetch

const path = 'C:/kody/10.2021';

const fs = require('fs');
const dirTree = require('directory-tree');

const tree = dirTree(path);
const json = JSON.stringify(tree);


// const fetch = require('node-fetch');
// // import fetch from 'node-fetch';

// if (!globalThis.fetch) {
// 	globalThis.fetch = fetch;
// }

fs.writeFile('files.json', json, function (err) {
  if (err) return console.log(err);
  console.log('saving the file...');
});

// const url = 'http://mkcodelab.pl/blacklist/save.php';
// //posting the data to server
// // daj tu url
// fetch(url, {
//   method: 'post',
//   body: json
// });

// zamiast zapisywać do jsona, zastosuj fetch i POST request
// potem czytaj w ... PHP ten request i zapisuj tam do jsona.