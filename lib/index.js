#! /usr/bin/env node

'use sctrict';
const filesSystem = require('fs');
const path = require('path');

const chalk = require('chalk');
const argv = require('yargs').argv;
const callerPath = require('caller-path');

/**
 * @param HTMLFile the html file that is created
 * @param javaSciptFile the javascript file that is created
 * @param CSSFile the css file that is created
 * @description This method create the files that are required by the user by using the flags --ui or --logic
 */
const createFiles = (argv, HTMLFile, javaScriptFile, CSSFile) => {
    try {
        if (argv.name) {
            if (argv.logic && argv.ui) {
                Promise.all([WriteFile(HTMLFile, 'text/html', 'html'), WriteFile(javaScriptFile, 'Javascript', 'js'), WriteFile(CSSFile, 'CSS', 'css')])
                    .then((values) => {
                        console.log(chalk.green('Create Templates Successfull'));
                    }).catch((error) => {
                        console.log(chalk.red('Did not create the templates'));
                    });
            } else if (argv.ui) {
                Promise.all([WriteFile(HTMLFile, 'text/html', 'html'), WriteFile(CSSFile, 'CSS', 'css')])
                    .then((values) => {
                        console.log(chalk.green('Create Templates Successfull'));
                    }).catch((error) => {
                        console.log(chalk.red('Did not create the templates'));
                    });
            } else if (argv.logic) {
                Promise.all([WriteFile(javaScriptFile, 'Javascript', 'js')])
                    .then((values) => {
                        console.log(chalk.green('Create Templates Successfull'));
                    }).catch((error) => {
                        console.log(chalk.red('Did not create the templates'));
                    });
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
 * @param nameFile it's the name of the file, it's assigned by the user
 * @description  method that allow read the data of the templates to create the files
 * @returns a promise, if reject returns the error otherwise returns resolve and read the files
 */

const ReadFile = (nameFile) => {
    const parseDirectory = path.parse(callerPath());
    return new Promise((resolve, reject) => {
        filesSystem.readFile(`${parseDirectory.dir}/../templates/${nameFile}.txt`, 'utf8', function (err, data) {
            if (err) {  
                //filesSystem.readFile(`./templates/${nameFile}.txt`, 'utf8', function (err, data) {
                //    if (err) {
                        reject(err);
                //    }
                //    resolve(data);
                //});
            }
            resolve(data);
        });
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
        filesSystem.writeFile(`${process.cwd()}/front_modules/${argv.name}/service-${argv.name}.${abbreviation}`, contentFile, { 'Content-type': `${contentType}` }, function (error, data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

/**
 * @description method that create a directory inside of front_modules directory
 * @returns a reject if something bad happen, if everything is ok returns a resolve and create a empty directory
 */

const WriteDirectory = (name) => {
    return new Promise((resolve, reject) => {
        try {
            if (!filesSystem.exists(`${process.cwd()}/front_modules/${name}`)) {
                filesSystem.mkdir(`${process.cwd()}/front_modules`, (error, data) => {
                });
                filesSystem.mkdir(`${process.cwd()}/front_modules/` + name, (error, data) => {
                    resolve(data);
                });
            }
        } catch (error) { reject(error) }
    });
};

/**
 * @description method that allow to create all the logic,
 * @returns a promise, if something is wrong show an error otherwise create the files and the directory
 */

const createDirectory = (argv) => {

    let { HTMLFile, javaScriptFile, CSSFile } = '';

    Promise.all([ReadFile('templateHTML'), ReadFile('templateJS'), ReadFile('templateCSS'), WriteDirectory(argv.name)])
        .then((values) => {
            createFiles(argv, values[0], values[1], values[2]);
        }).catch((error) => {
            console.log(chalk.red(error));
        });
};

module.exports = { createDirectory };

