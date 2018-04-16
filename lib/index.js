'use sctrict';
const filesSystem = require('fs');

const createDirectory = () =>{
    let nameDirectory = '';
    
    process.argv.forEach ((value, index) => {
        if(index === 2){
            nameDirectory = value;
        }
    });

    const HTMLFile = `<!DOCTYPE html>\n<html lang = "en" >\n\t<head>\n\t\t<meta charset="utf-8">\n\t\t<title>${nameDirectory}</title>\n\t</head>\n\t<body>\n\t\t<h1></h1>\n\t\t<script type="text/javascript" src="${nameDirectory}.js"></script>\n\t</body>\n</html>`;
    const JavaScriptFile = `'use strict'\n(function ${nameDirectory}(){\n\n}());`;
    const CSSFile = `${nameDirectory}{\n}`;

    if (!filesSystem.existsSync(nameDirectory)){
        filesSystem.mkdirSync('./front_modules/' + nameDirectory, error => {
            if (error){
                throw Error({
                    type: 'Error',
                    message: 'An error has ocurred'
                });
            }
        });
        filesSystem.writeFileSync(`./front_modules/${nameDirectory}/${nameDirectory}.html`, HTMLFile, { 'Content-Type': 'text/html' });
        filesSystem.writeFileSync(`./front_modules/${nameDirectory}/${nameDirectory}.js`, JavaScriptFile, { 'Content-type': 'Javascript' });
        filesSystem.writeFileSync(`./front_modules/${nameDirectory}/${nameDirectory}.css`, CSSFile, { 'Content-type': 'CSS' });
    }

}

module.exports = createDirectory();