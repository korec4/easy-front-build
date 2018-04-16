'use sctrict';
const filesSystem = require('fs');

const createDir = () =>{
    let name = '';
    
    process.argv.forEach((val, index) => {
        if(index === 2){
            name = val;
        }
    });

    const HTML = '<!DOCTYPE html>\n<html lang = "en" >\n<head>\n<meta charset="utf-8">\n<title>Example of Fetch</title>\n</head>\n<body>\n<h1></h1></body><script type="text/javascript" src="${name}.js"></script></html>';
    const CSS = '${name}{\n}';
    const JS = '(function ${name} () {\n\t}();';

    if (!filesSystem.existsSync(name)){
        filesSystem.mkdirSync('./front_modules/' + name, error => {
            if (error){
                throw Error({
                    type: 'Error',
                    message: 'An error has ocurred'
                });
            }
            filesSystem.writeFileSync(`./front_modules/${name}/${name}.html`, HTML,{'Content-Type': 'text/html'});
            filesSystem.writeFileSync(`./front_modules/${name}/${name}.js`, JS,{'Content-type': 'Javascript'});
            filesSystem.writeFileSync(`./front_modules/${name}/${name}.css`, CSS, {'Content-type': 'CSS'});
        });
    }

    
        //import fileSystem from "fs";
    /*const filesSystem = require('fs');
    const dir = './test/';

    if (!filesSystem.existsSync(dir)){
        filesSystem.mkdirSync(dir);
        filesSystem.writeFileSync('js.txt', 'Hello Node.js', (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
        filesSystem.writeFileSync('html.txt', 'Hello Node.js', (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
        filesSystem.writeFileSync('css.txt', 'Hello Node.js', (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
    }else
    {
        console.log("Directory already exist");
    }*/
}

module.exports = createDir();
//export function createDir();
