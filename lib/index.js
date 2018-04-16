'use sctrict';
const filesSystem = require('fs');

const createDirectory = () =>{
    let name = '';
    
    process.argv.forEach ((value, index) => {
        if(index === 2){
            name = value;
        }
    });

    const HTML = `<!DOCTYPE html>\n<html lang = "en" >\n<head>\n<meta charset="utf-8">\n<title>Example of Fetch</title>\n</head>\n<body>\n<h1></h1></body><script type="text/javascript" src="${name}.js"></script></html>`;
    const CSS = `${name}{\n}`;
    const JS = `(function ${name} () {\n\t}();`;

    if (!filesSystem.existsSync(name)){
        filesSystem.mkdirSync('./front_modules/' + name, error => {
            if (error){
                throw Error({
                    type: 'Error',
                    message: 'An error has ocurred'
                });
            }
        });
        filesSystem.writeFileSync(`./front_modules/${name}/${name}.html`, HTML, { 'Content-Type': 'text/html' });
        filesSystem.writeFileSync(`./front_modules/${name}/${name}.js`, JS, { 'Content-type': 'Javascript' });
        filesSystem.writeFileSync(`./front_modules/${name}/${name}.css`, CSS, { 'Content-type': 'CSS' });
    }

}

module.exports = createDir();