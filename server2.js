//Simple API

import { createServer } from 'http';

const PORT = process.env.PORT;
//hardcoded data, usually comes from a databas
const users = [
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Jane Doe'},
    {id: 3, name: 'Jim Doe'},
]

//logger Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

// JSON Middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application.json');
    next();
}

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users))
    res.end()
}

// Route hanlder for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find((user)=> user.id === parseInt(id));

    if(user){
        res.write(JSON.stringify(user));
    }else{
        res.statusCode = 404;
        res.write(JSON.stringify({message: 'User not found.'}))
    }
    res.end()
}

// Not found handler
const notFoundHandler = (req, res) =>{
    res.statusCode = 404;
    res.write(JSON.stringify({message: 'Route not found.'}))
    res.end()
}

// Route handler for POST /api/users
const createUserHandler = (req, res )=>{
    //{"id": 4,"name": "ivan"}
    let body = '';
    // event listener
    // fires whenever new data is received from the request.
    req.on('data', (chunk) =>{
        // each converted, appended to body
        //JSON string
        body += chunk.toString();
    });
    // event listener
    // fires when all the data from request has be received.
    req.on('end', () => {
        // to js object
        const newUser = JSON.parse(body);
        users.push(newUser);
        // (Created)
        res.statusCode = 201;
        // json format
        // sends it in res body
        res.write(JSON.stringify(newUser));
        // Ends the response and sends it back to the client.
        res.end();
    })
}

const server = createServer((req, res) => {
    logger(req, res, ()=>{
        jsonMiddleware(req, res, () => {
            if(req.url === '/api/users' && req.method === 'GET') {
                getUsersHandler(req, res)
            }else if(
                req.url.match(/\/api\/users\/([0-9]+)/) && 
                req.method==='GET'){
                getUserByIdHandler(req, res);
            }else if(
                req.url === '/api/users' &&
                req.method === 'POST'
            ){
                createUserHandler(req, res);
            }else{
                notFoundHandler(req, res);
            }
        }) 
    })
})

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
})