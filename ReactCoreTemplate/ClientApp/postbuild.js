const fse = require('fs-extra');

const fromArg = process.argv.find(x => x.startsWith('--from'));
const toArg = process.argv.find(x => x.startsWith('--to'));
const cleanArg = process.argv.find(x => x.startsWith('--clean'));

if (!fromArg && !toArg && !cleanArg) 
  return;

const from = fromArg && fromArg.substring(7).trim();
const to = toArg && toArg.substring(5).trim();
const clean = cleanArg ? cleanArg.substring(8).trim() : to;

if (from && to)
{
  console.log(`Post build cleaning ${clean} ...`);
  fse.remove(clean).then(() => {
    console.log(`Post build file copying ${from} to ${to} ...`);
    fse.copy(from, to).then(() => {
      console.log('Copy completed')
    });
  })
} else {
  console.log(`Post build cleaning ${clean} ...`);
  fse.remove(clean).then(() => {
    console.log('Clean completed');
  })
}