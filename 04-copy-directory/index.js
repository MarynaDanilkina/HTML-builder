const fs = require('fs');
const path = require('path');

const addressCopy = path.join(__dirname, 'files-copy');
const addressFiles = path.join(__dirname, 'files');
fs.readdir(addressCopy, (err, file) => {
  if (file) {
    file.forEach(el => {
      fs.unlink(path.join(addressCopy, el), () => {
      });
    });
  }
});

fs.mkdir(addressCopy, () => {
  console.log('Папка создана');
});

fs.readdir(addressFiles, (err, file) => {
  file.forEach(el => {
    fs.readFile(path.join(__dirname, 'files', el), 'utf8', (error, data) => {
      fs.copyFile(path.join(__dirname, 'files', el), path.join(__dirname, 'files-copy', el), () => {
      });
    });
  });
  console.log('Файлы скопированны');
});