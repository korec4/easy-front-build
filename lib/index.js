'use sctrict';
const filesSystem = require('fs');

const chalk = require('chalk');
const argv = require('yargs').argv;

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
    let nameFile = '';

    /**
<<<<<<< HEAD
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


=======
     * This method only create a file with extension .html and .css if the flag is --ui
     * if the flag is --logic it'll create a file with extension .js
     */

    if (argv.name && argv.ui) {
        nameFile = argv.name;
        const HTMLFile = `<!DOCTYPE html>\n<html lang = "en" >\n\t<head>\n\t\t<meta charset="utf-8">\n\t\t<title>${nameFile}</title>\n\t</head>\n\t<body>\n\t\t<h1></h1>\n\t\t<script type="text/javascript" src="${nameFile}.js"></script>\n\t</body>\n</html>`;        
        const CSSFile = `${nameFile}{\n}`;
        filesSystem.writeFile(`./${nameFile}.html`, HTMLFile, { 'Content-Type': 'text/html' });
        filesSystem.writeFile(`./${nameFile}.css`, CSSFile, { 'Content-type': 'CSS' });
    }else if(argv.name && argv.logic){
        nameFile = argv.name;
        const JavaScriptFile = `'use strict';\n(function ${nameFile}(){\n\n}());`;
        filesSystem.writeFile(`./${nameFile}.js`, JavaScriptFile, { 'Content-type': 'Javascript' });
    }else{
        console.log(chalk.red('Not File name assigned'));
    }
    
>>>>>>> b01b8c4cea9ecff923728c9f25f03a12b5297fef
};

module.exports = createDirectory;

