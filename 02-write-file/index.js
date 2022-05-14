const fs = require('fs');
const path = require('path');
const readline = require('readline');

const address = path.join(__dirname, 'text.txt');
const info = fs.createWriteStream(address);

const input = process.stdin;
const output = process.stdout;


output.write('Hey! Enter something\n');

const rl = readline.createInterface({ input, output });
rl.on('line', text => {
  if (text === 'exit' || text === 'Exit') {
    console.log('All the best');
    rl.close();
  }
  info.write(`${text}\n`);
});
rl.on('close', () => {
  console.log('All the best');
  rl.close();
});

