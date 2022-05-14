const path = require('path');
const address = path.join(__dirname, 'text.txt');
const fs = require('fs');
let info = fs.createReadStream(address);
info.on('data', text => console.log(text.toString()));
// или info.on('data', text => console.log(`${text}`));