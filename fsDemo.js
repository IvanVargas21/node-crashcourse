// import fs from 'fs';
import fs from 'fs/promises';

// readFile() - callback
// read
// fs.readFile('./text.txt', 'utf8', (err, data)=>{
//     if(err) throw err;
//     console.log(data)
// });

// readFileSync() - Synchronous version
// const data = fs.readFileSync('./text.txt', 'utf8');
// console.log(data)

// readFile() - Promise .then()
// fs.readFile('./text.txt', 'utf8')
//     .then((data)=> console.log(data))
//     .catch((err)=> console.log(err));

// readFile() - async/await
const readFile = async () => {
    try {
        const data = await fs.readFileSync('./text.txt', 'utf8');
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

// writeFile
// writeFile()

const writeFile = async () => {
    try {
      await fs.writeFile('./test.txt', 'Hello, I am writing to this file');
      console.log('File written to...');
    } catch (error) {
      console.log(error);
    }
  };
  
  // appendFile()
  const appendFile = async () => {
    try {
      await fs.appendFile('./test.txt', '\nThis is appended text');
      console.log('File appended to...');
    } catch (error) {
      console.log(error);
    }
  };
  
  writeFile();
  appendFile();
  readFile();