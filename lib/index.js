'use sctrict';
const filesSystem = require('fs');

const chalk = require('chalk');

/**
 * This method review if exist a module with the same name module if not
 * exist creates a new module with files (js,html && css)
 */
const createFiles = (HTMLFile,javaScriptFile,CSSFile, nameDirectory) => {
    try{
        if (!filesSystem.existsSync(nameDirectory)){
            filesSystem.mkdirSync('./front_modules/' + nameDirectory, error => {
                if (error){
                    console.log(chalk.red('Did not created the directory'));
                }
            });
            try{
                filesSystem.writeFileSync(`./front_modules/${nameDirectory}/${nameDirectory}.html`, HTMLFile, { 'Content-Type': 'text/html' });
                filesSystem.writeFileSync(`./front_modules/${nameDirectory}/${nameDirectory}.js`, javaScriptFile, { 'Content-type': 'Javascript' });
                filesSystem.writeFileSync(`./front_modules/${nameDirectory}/${nameDirectory}.css`, CSSFile, { 'Content-type': 'CSS' });
            }catch(error){
                console.log(chalk.red('Did not created the file'));
            }
        } 
    }catch(error){
        console.log(chalk.red('Did not created the directory because is already exist'));
    }
}

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

    const readHTML = new Promise((resolve, reject) => {
    filesSystem.readFile('./templates/templateHTML.txt', 'utf8', function (err,data) {
        if (err) {
            reject(err);
        }
        resolve(data);
        });
    });

    const readJS = new Promise((resolve, reject) => {
        filesSystem.readFile('./templates/templateJS.txt', 'utf8', function (err,data) {
        if (err) {
            reject(err);
        }
        resolve(data);
        });
    });

    const readCSS = new Promise((resolve, reject) => {
        filesSystem.readFile('./templates/templateCSS.txt', 'utf8', function (err,data) {
        if (err) {
            reject(err);
        }
        resolve(data);
        });
    });
    
    let {HTMLFile, javaScriptFile, CSSFile} = '';

    Promise.all([readHTML, readJS, readCSS])
    .then((values) => {
        HTMLFile = values[0];
        javaScriptFile = values[1];
        CSSFile = values[2];
        createFiles(HTMLFile,javaScriptFile,CSSFile, nameDirectory);
    }).catch((error) => {
        console.log(chalk.red('Did not read the templates'));
    });


};

module.exports = createDirectory;

