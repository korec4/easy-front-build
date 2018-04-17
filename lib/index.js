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
                    Promise.all([WriteFile(HTMLFile,'text/html','html'), WriteFile(javaScriptFile,'Javascript','js'), WriteFile(CSSFile,'CSS','css')])
                    .then((values) => {
                        console.log(chalk.green('Create Templates Successfull'));
                    }).catch((error) => {
                        console.log(chalk.red('Did not create the templates'));
                    });  
                }else if(argv.ui){
                    Promise.all([WriteFile(HTMLFile,'text/html','html'), WriteFile(CSSFile,'CSS','css')])
                    .then((values) => {
                        console.log(chalk.green('Create Templates Successfull'));
                    }).catch((error) => {
                        console.log(chalk.red('Did not create the templates'));
                    });  
                }else if(argv.logic){
                    Promise.all([WriteFile(javaScriptFile,'Javascript','js')])
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

const ReadFile = (nameFile) => {
    return  new Promise((resolve, reject) => {
        filesSystem.readFile(`./templates/${nameFile}.txt`, 'utf8', function (err,data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

const WriteFile = (contentFile, contentType, abbreviation) => {
    return  new Promise((resolve, reject) => {
        filesSystem.writeFile(`./front_modules/${argv.name}/${argv.name}.${abbreviation}`, contentFile, { 'Content-type': `${contentType}` },function (error,data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

const createDirectory = () =>{

    let {HTMLFile, javaScriptFile, CSSFile} = '';

    Promise.all([ReadFile('templateHTML'), ReadFile('templateJS'), ReadFile('templateCSS')])
    .then((values) => {
        createFiles(values[0],values[1],values[2]);
    }).catch((error) => {
        console.log(chalk.red('Did not read the templates'));
    });    
};

module.exports = createDirectory;

