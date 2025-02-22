//module include in node
import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT;

// Get current file's directory path
const _filename = url.fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

console.log(`File Name: ${_filename}`);
//File Name: C:\Users\Ivan Vargas\OneDrive\Desktop\RoadToFullStackWebDev\Backend-Development\NodeJS\node-crash-2025\server.js
console.log(`Directory Name: ${_dirname}`);
// Directory Name: C:\Users\Ivan Vargas\OneDrive\Desktop\RoadToFullStackWebDev\Backend-Development\NodeJS\node-crash-2025

//req - request object 
//res - response object
//create a server object
const server = http.createServer( async (req, res) => {
    // console.log(`Request Object: ${req}`)
    // req is a large object that contains many props.
    // string interpolation tries to convert it into string.
    console.log(req); // Prints the whole request object correctly
    console.log(`Request URL : ${req.url}`);
    console.log(`Request Headers: ${req.headers}`);
    console.log(`Request Method: ${req.method}`)
    try {
        if(req.method === 'GET'){
            let filePath;
            if(req.url === '/'){
                filePath = path.join(_dirname, 'public', 'index.html');
                console.log(`Current File Path: ${filePath}`);
            }else if(req.url === '/about') {
                filePath = path.join(_dirname, 'public', 'about.html');
                console.log(`Current File Path: ${filePath}`);
            }else{
                throw new Error ('Not Found');
            }
            const data =  await fs.readFile(filePath);
            res.setHeader('Content-Type', 'index/html');
            res.write(data);
            res.end();
        }else {
            throw new Error ('Method not allowed')
        }
    }catch(error){
            res.writeHead(500, {'content-type':'text/plain'});
            res.end('Server Error');
    }
});

// Listen on port 3000
server.listen(3000, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
})