'use strict'

const fs = require('fs');

let name = '';

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
    if(index === 2){
        name = val;
        console.log('el name es: '+name);
    }
});

fs.mkdirSync('./' + name, error =>{
    throw Error({
        type: 'Error',
        message: 'An error has ocurred'
    })
});

fs.writeFileSync('./'+name+'/test.html', '<!DOCTYPE html>\n<html lang = "en" ><head><meta charset="utf-8"><title>Example of Fetch</title></head><body><h1>This is a example of the fetch funtion to make request for an API JSON</h1><table><thead><tr><th><h2>Key</h2></th><th></th><th><h2>Values</h2></th></tr></thead><tbody><tr><th id="key"></th><th></th><th id="value"></th></tr></tbody></table></body><script type="text/javascript" src="myJS.js"></script></html>',{'Content-Type': 'text/html'});
fs.writeFileSync('./'+name+'/test.js', "const http = require('http');\nconst url = require('url');\nconst fs = require('fs');\n",{'Content-type': 'Javascript'});
fs.writeFileSync('./'+name+'/test.css', ' body {color: purple;background - color: #d8da3d }',{'Content-type': 'CSS'});


