#! /usr/bin/env node

'use sctrict';
const filesSystem = require('fs');
const path = require('path');

const chalk = require('chalk');
const argv = require('yargs').argv;
const callerPath = require('caller-path');

/**
 * @param arrayPromise array of promises
 * @description This method create eject all the array of promises
 */
const PromiseWriteFile = (arrayPromise) => {
    Promise.all(arrayPromise)
        .then((values) => {
            console.log(chalk.green('Create Templates Successfull'));
        }).catch((error) => {
        console.log(chalk.red('Did not create the templates'));
    });
};

/**
 * @param HTMLFile the html file that is created
 * @param javaSciptFile the javascript file that is created
 * @param CSSFile the css file that is created
 * @description This method create the files that are required by the user by using the flags --ui or --logic
 */
const CreateFiles = (argv, HTMLFile, javaScriptFile, CSSFile, testFile, testFileSinon) => {
    try {
        if (argv.name) {
            if (argv.logic && argv.ui) {
                PromiseWriteFile([WriteFile(HTMLFile, 'text/html', 'html'), WriteFile(javaScriptFile, 'Javascript', 'js'), WriteFile(CSSFile, 'CSS', 'css'), WriteFileTest(testFile, 'Javascript', 'test.js'), WriteFileTestSinon(testFileSinon, 'Javascript', 'sinon.js')]);
            } else if (argv.ui) {
                PromiseWriteFile([WriteFile(HTMLFile, 'text/html', 'html'), WriteFile(CSSFile, 'CSS', 'css')]);
            } else if (argv.logic) {
                PromiseWriteFile([WriteFile(javaScriptFile, 'Javascript', 'js'), WriteFileTest(testFile, 'Javascript', 'test.js'), WriteFileTestSinon(testFileSinon, 'Javascript', 'sinon.js')]);
            } else {
                console.log(chalk.red('Not param received'));
            }
        } else {
            console.log(chalk.red('Not File name assigned'));
        }
    } catch (error) {
        console.log(chalk.red(error));
    }
};

/**
 * @param string string to analice
 * @param substring String to search and be replace
 * @param nameArgv String to replace substring
 * @description  replace a get substring to nameArgv in a string
 * @returns treat string
 */
const ReplaceString = (string, substring, nameArgv) => {
    while (string.search(substring) != -1) {
        string = string.replace(substring, nameArgv);
    }
    return string;
};

/**
 * @param nameFile it's the name of the file, it's assigned by the user
 * @description  method that allow read the data of the templates to create the files
 * @returns a promise, if reject returns the error otherwise returns resolve and read the files
 */
const ReadFile = (nameFile, nameArgv) => {
    const parseDirectory = path.parse(callerPath());
    return new Promise((resolve, reject) => {
        try {
            const  data = filesSystem.readFileSync(`${parseDirectory.dir}/../templates/${nameFile}.txt`, 'utf8');
            resolve(ReplaceString(data, '<name>', nameArgv));
        }catch (error) {
            reject(error);
        }
    });
};

/**
 * @param contentFile it's the content inside the file
 * @param contentType it's the type of the content
 * @param abbrevation it's the file extension of the file
 * @description method that create the files that are requerid
 * @returns a reject if something bad happen, if everything is ok retunrs a resolve and create all the files that are required
 */
const WriteFile = (contentFile, contentType, abbreviation) => {
    return new Promise((resolve, reject) => {
        try {
            filesSystem.writeFileSync(`${process.cwd()}/front_modules/${argv.name}/service-${argv.name}.${abbreviation}`, contentFile, {'Content-type': `${contentType}`});
            resolve(true);
        }catch (error) {
            reject(error);
        }
    });
};

/**
 * @param contentFile it's the content inside the file
 * @param contentType it's the type of the content
 * @param abbrevation it's the file extension of the file
 * @description method that create the files to make the test with extension .test.js
 * @returns a reject if something bad happen, if everything is ok retunrs a resolve and create all the files that are required
 */
const WriteFileTest = (contentFile, contentType, abbreviation) => {
    return new Promise((resolve, reject) => {
        try {
            filesSystem.writeFileSync(`${process.cwd()}/test/${argv.name}.${abbreviation}`, contentFile, {'Content-type': `${contentType}`});
            resolve(true)
        }catch (error) {
            reject(error)
        }
    });
};


/**
 * @param contentFile it's the content inside the file
 * @param contentType it's the type of the content
 * @param abbrevation it's the file extension of the file
 * @description method that create the files to make the test with extension .sinon.js
 * @returns a reject if something bad happen, if everything is ok retunrs a resolve and create all the files that are required
 */
const WriteFileTestSinon = (contentFile, contentType, abbreviation) => {
    return new Promise((resolve, reject) => {
        filesSystem.writeFile(`${process.cwd()}/test/sinonObjects/${argv.name}.${abbreviation}`, contentFile, {'Content-type': `${contentType}`}, function (error, data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

/**
 * @description method that create a directory inside of front_modules directory
 * @param firstDir this directive is the front_modules
 * @param name is the name to module (directory) to created
 * @returns a reject if something bad happen, if everything is ok returns a resolve and create a empty directory
 */
const WriteDirectory = (firstDir, name) => {
    return new Promise((resolve, reject) => {
        try {
            filesSystem.mkdirSync(`${process.cwd()}/${firstDir}/${name}`);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

const WriteDirectories = (name, firstDir) => {
    return new Promise((resolve, reject) => {
        try {
            if (!filesSystem.exists(`${process.cwd()}/${firstDir}`)) {
                filesSystem.mkdir(`${process.cwd()}/${firstDir}`, (error, data) => {
                    if (error) {
                        reject(error);
                    }
                });
            }
            WriteDirectory(firstDir, name)
                .then(data => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (error) {
            reject(error)
        }
    });
};

/**
 * @description method that allow to create all the logic,
 * @returns a promise, if something is wrong show an error otherwise create the files and the directory
 */

const ReadAllFiles = (name) => {
    templateHTML = ReadFile('templateHTML', name);
    templateJS = ReadFile('templateJS', name);
    templateCSS = ReadFile('templateCSS', name);
    templateTEST = ReadFile('templateTEST', name);
    templateSINON = ReadFile('templateSINON', name);

    return [templateHTML, templateJS, templateCSS, templateTEST, templateSINON];
};

const CreateDirectory = (argv) => {
    let {HTMLFile, javaScriptFile, CSSFile} = '';

    let arrayPromises = ReadAllFiles(argv.name);
    arrayPromises.push(WriteDirectories(argv.name, 'front_modules'));
    //arrayPromises.push(WriteDirectories('sinonObjects', 'test'));
    Promise.all(arrayPromises)
        .then((values) => {
            CreateFiles(argv, values[0], values[1], values[2], values[3], values[4]);
        }).catch((error) => {
        console.log(chalk.red(error));
    });
};


module.exports = {
    CreateDirectory,
    WriteFile,
    WriteDirectory,
    ReadFile,
    WriteFileTest,
    WriteFileTestSinon,
    ReplaceString
};
