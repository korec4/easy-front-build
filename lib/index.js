'use sctrict';
const filesSystem = require('fs');

const chalk = require('chalk');
const argv = require('yargs').argv;

/**
 * This method review if exist a module with the same name module if not
 * exist creates a new module with files (js,html && css)
 */
const createFiles = (HTMLFile,javaScriptFile,CSSFile) => {
    try{
        if (!filesSystem.existsSync(argv.name)){
            filesSystem.mkdirSync('./front_modules/' + argv.name, error => {
                if (error){
                    console.log(chalk.red('Did not created the directory'));
                }
            });
            if(argv.name){
                if (argv.logic && argv.ui) {
                    filesSystem.writeFileSync(`./front_modules/${argv.name}/${argv.name}.js`, javaScriptFile, { 'Content-type': 'Javascript' });
                    filesSystem.writeFileSync(`./front_modules/${argv.name}/${argv.name}.html`, HTMLFile, { 'Content-Type': 'text/html' });
                    filesSystem.writeFileSync(`./front_modules/${argv.name}/${argv.name}.css`, CSSFile, { 'Content-type': 'CSS' });
                }else if(argv.ui){
                    filesSystem.writeFileSync(`./front_modules/${argv.name}/${argv.name}.html`, HTMLFile, { 'Content-Type': 'text/html' });
                    filesSystem.writeFileSync(`./front_modules/${argv.name}/${argv.name}.css`, CSSFile, { 'Content-type': 'CSS' });
                }
                else if(argv.logic){
                    filesSystem.writeFileSync(`./front_modules/${argv.name}/${argv.name}.js`, javaScriptFile, { 'Content-type': 'Javascript' });
                }else{
                    console.log(chalk.red('Not param received'));
                }
            }else{
                console.log(chalk.red('Not File name assigned'));                
            }
        } 
    }catch(error){
        console.log(chalk.red('Did not created the directory because is already exist'));
    }
}

const createDirectory = () =>{
    let nameFile = '';

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
        createFiles(HTMLFile,javaScriptFile,CSSFile);
    }).catch((error) => {
        console.log(chalk.red('Did not read the templates'));
    });    
};

module.exports = createDirectory;

