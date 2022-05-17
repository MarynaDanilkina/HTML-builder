/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');

const addressProjectDist = path.join(__dirname, 'project-dist');

const addressStyles = path.join(__dirname, 'styles');
const addressFinish = path.join(__dirname, 'project-dist', 'style.css');

const addressCopy = path.join(__dirname, 'project-dist', 'assets');
const addressFiles = path.join(__dirname, 'assets');

const addressTemplste = path.join(__dirname, 'template.html');
const addressComponents = path.join(__dirname, 'components');
const addressIndex = path.join(__dirname, 'project-dist', 'index.html');

fs.mkdir(addressProjectDist, () => {
  console.log('Папка project-dist создана');
});

fs.mkdir(addressCopy, () => {
});

fs.readdir(addressCopy, (err, file) => {
  if (file) {
    file.forEach(el => {
      fs.readdir(path.join(__dirname, 'project-dist', 'assets', el), (err, files) => {
        if (files) {
          files.forEach(elem => {
            fs.unlink(path.join(__dirname, 'project-dist', 'assets', el, elem), () => {
            });
          });
        }
      });

    });
  }
});

fs.readdir(addressFiles, (err, file) => {
  file.forEach(el => {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', el), () => {
    });
    fs.readdir(path.join(__dirname, 'assets', el), 'utf8', (error, files) => {
      files.forEach(elem => {
        fs.readFile(path.join(__dirname, 'assets', el, elem), (error2, data) => {
          fs.copyFile(path.join(__dirname, 'assets', el, elem), path.join(__dirname, 'project-dist', 'assets', el, elem), () => {
          });
        });
      });
    });
  });
  console.log('Файлы скопированны assets являющаяся точной копией папки assets находящейся в 06-build-page');
});


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
            str += `${data}\n`;
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
  console.log('style.css  содержит стили собранные из файлов папки styles');
});



fs.readFile(addressTemplste, 'utf8', (err, data) => {
  let component = data;
  fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    files.forEach((el, i) => {
      fs.readFile(path.join(__dirname, 'components', el), 'utf8', (err, data2) => {
        component = component.replace(`{{${el.slice(0, el.lastIndexOf('.'))}}}`, data2);
        if (i === 0) {
          fs.open(path.join(__dirname, 'project-dist', 'index.html'), 'w', (err) => {
            fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), component, (err) => {
            });
          });
        }
      });
    });
  });
});
fs.unlink(path.join(__dirname, 'project-dist', 'index.html'), (err) => {
});



