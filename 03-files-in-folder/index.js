const fs = require('fs');
const path = require('path');
const address = path.join(__dirname, 'secret-folder');

fs.readdir(address, { withFileTypes: true }, (err, files) => {
  for (let file of files) {
    if (file.isFile()) {
      let addressFile = path.join(__dirname, 'secret-folder', file.name);
      fs.stat(addressFile, (err, stats) => {
        let fileName = file.name.split('.')[0];
        let FileExtname = path.extname(file.name).split('.')[1];
        let fileSize = (stats.size / 1000).toFixed(3);
        console.log(`${fileName}-${FileExtname}-${fileSize}kb`);
      });
    }
  }
});
