'use sctrict';
const filesSystem = require('fs');

const createDirectory = () =>{
    /**
     * this param gets by user to generate a module inside this creates
     * a js, html and css file
     * @type {string}
     */
    let nameDirectory = '';

    /**
     * This method get the parameter name to creates the module
     */
    process.argv.forEach((value, index) => {
        if(index === 2){
            nameDirectory = value;
        }
    });

        /**
     * constants with file content
     * @type {string}
     */
    const HTMLFile = `<!DOCTYPE html>\n<html lang = "en" >\n\t<head>\n\t\t<meta charset="utf-8">\n\t\t<title>${nameDirectory}</title>\n\t</head>\n\t<body>\n\t\t<h1></h1>\n\t\t<script type="text/javascript" src="${nameDirectory}.js"></script>\n\t</body>\n</html>`;
    const JavaScriptFile = `'use strict';\n(function ${nameDirectory}(){\n\n}());`;
    const CSSFile = `${nameDirectory}{\n}`;

    /**
     * This method review if exist a module with the same name module if not
     * exist creates a new module with files (js,html && css)
     */
    try{
        if (!filesSystem.existsSync(nameDirectory)){
            filesSystem.mkdirSync('./front_modules/' + nameDirectory, error => {
                if (error){
                    console.error("Did not created the directory");
                }
            });
            try{
                filesSystem.writeFileSync(`./front_modules/${nameDirectory}/${nameDirectory}.html`, HTMLFile, { 'Content-Type': 'text/html' });
                filesSystem.writeFileSync(`./front_modules/${nameDirectory}/${nameDirectory}.js`, JavaScriptFile, { 'Content-type': 'Javascript' });
                filesSystem.writeFileSync(`./front_modules/${nameDirectory}/${nameDirectory}.css`, CSSFile, { 'Content-type': 'CSS' });
            }catch(error){
                console.error("Did not created the file");
            }
        } 
    }catch(error){
        console.error("Did not created the directory because is already exist");
    }
};

module.exports = createDirectory();

