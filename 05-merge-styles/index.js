const fs = require('fs');
const path = require('path');

const addressStyles = path.join(__dirname, 'styles');
const addressFinish = path.join(__dirname, 'project-dist', 'bundle.css');
let str = '';

fs.readdir(addressStyles, { withFileTypes: true }, (err, files) => {
  for (let file of files) {
    if (file.isFile()) {
      let addressFile = path.join(__dirname, 'styles', file.name);

      fs.stat(addressFile, (err) => {
        if (err) {
          throw err;
        }
        let FileExtname = path.extname(file.name);
        if (FileExtname === '.css') {
          fs.readFile(addressFile, 'utf8', (error, data) => {
            str += data;
            fs.writeFile(addressFinish, str, (err) => {
              if (err) {
                throw err;
              }
            });
          });
        }
      });
    }
  }
});

