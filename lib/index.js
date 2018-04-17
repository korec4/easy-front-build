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
            const writeJS = createPromiseWriteFile(javaScriptFile,'Javascript','js');
            const writeHTML = createPromiseWriteFile(HTMLFile,'text/html','html');
            const writeCSS = createPromiseWriteFile(CSSFile,'CSS','css');
            if(argv.name){
                if (argv.logic && argv.ui) {
                    Promise.all([writeHTML, writeJS, writeCSS])
                    .then((values) => {
                        console.log(chalk.green('Create Templates Successfull'));
                    }).catch((error) => {
                        console.log(chalk.red('Did not create the templates'));
                    });  
                }else if(argv.ui){
                    Promise.all([writeHTML, writeCSS])
                    .then((values) => {
                        console.log(chalk.green('Create Templates Successfull'));
                    }).catch((error) => {
                        console.log(chalk.red('Did not create the templates'));
                    });  
                }
                else if(argv.logic){
                    Promise.all([writeJS])
                    .then((values) => {
                        console.log(chalk.green('Create Templates Successfull'));
                    }).catch((error) => {
                        console.log(chalk.red('Did not create the templates'));
                    }); 
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

const createPromiseReadFile = (nameFile) => {
    return  readHTML = new Promise((resolve, reject) => {
        filesSystem.readFile(`./templates/${nameFile}.txt`, 'utf8', function (err,data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

const createPromiseWriteFile = (contentFile, contentType, abbreviation) => {
    return  readHTML = new Promise((resolve, reject) => {
        filesSystem.writeFile(`./front_modules/${argv.name}/${argv.name}.${abbreviation}`, contentFile, { 'Content-type': `${contentType}` },function (error,data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
}

const createDirectory = () =>{
    const readHTML = createPromiseReadFile('templateHTML');
    const readJS = createPromiseReadFile('templateJS');
    const readCSS = createPromiseReadFile('templateCSS');

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

