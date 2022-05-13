const path = require('path');
//Получим адрес файла text.txt
const address = path.join(__dirname, 'text.txt');
const fs = require('fs');
//считать информацию
let info = fs.createReadStream(address);
//вывод через консоль
info.on('data', text => console.log(text.toString()));
// или info.on('data', text => console.log(`${text}`));