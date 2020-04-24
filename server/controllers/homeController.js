const path = require('path')
const fs = require('fs');

const getRoot = path.join(__dirname, '..', 'views');
// const mainPage = fs.readFileSync(`${getRoot}/index.html`, 'utf-8');

exports.index = function (req, res) {

    fs.readFile(`${getRoot}/index.html`, 'utf-8', (err, data)=>{
        if(err) {
            res.writeHead(404, {'Content-type': 'text/html'});
            res.end('Page not found');
        }
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(data);
    })

}
