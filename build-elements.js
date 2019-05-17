const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/demo/runtime.js',
    './dist/demo/polyfills.js',
    './dist/demo/main.js',
  ]
  await fs.ensureDir('preview')
  await concat(files, 'preview/demo.js');
  await fs.copyFile('./dist/demo/styles.css', 'preview/styles.css')

})()