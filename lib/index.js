'use sctrict';
const filesSystem = require('fs');

const createDirectory = () =>{
    let name = '';
    
    process.argv.forEach ((value, index) => {
        if(index === 2){
            name = value;
        }
    });

    const HTML = `<!DOCTYPE html>\n<html lang = "en" >\n\t<head>\n\t\t<meta charset="utf-8">\n\t\t<title>Example of Fetch</title>\n\t</head>\n\t<body>\n\t\t<h1></h1>\n\t\t<script type="text/javascript" src="${name}.js"></script>\n\t</body>\n</html>`;
    const JS = `'use strict'\n(function ${name}(){\n\n}());`;
    const CSS = `${name}{\n}`;

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

module.exports = createDirectory();