const http = require("http");

const server = http.createServer((req,res)=>{
console.log('requesr made');
});

server.listen(3000,'localhost',()=>{
    console.log('listening for requests on port 3000')
})