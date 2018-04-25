
# Easy-Front-Builder

# Why?

This package help us to generate modules (directories) inside creates the js, html and css files, 
you put your module name, generate and code! 

 # How Install?
 
 - Install locale to your project - not recommended
 
 ```
$ npm install easy-front-build 
 ```
 
 - Install global *recommended
 ```sh
 npm install -g easy-front-build
 ```
  
 # how configure? (option only in local) 
 if you will installed locally in your project you should added the package in your index.js:
 
 index.js
 ```sh
 const web = require('easy-front-module');
 const yargs = require('yargs').yargs;
 
 web.createDirectory(yargs);
 
 ```

# Usage

 - use locale

The case common to  generate a module of logic:

```sh
$ node index.js --name="FileName" [--ui, --logic, --ui --logic]
```

To generate a module of ui:

```sh
$ node index.js --name="FileName" [--ui, --logic, --ui --logic]
or
$ npm run create -- --name="fileName" [--ui, --logic]
```

- use global

```sh
easy-front-build --name="myModule" [--logic, --ui, --logic --ui]
```

This will generate the js if you use the flag **--logic**, in the other hand if you use the flag **--ui**,
So you add the flags --logic --ui you can generate the three file (js, html, css) in you moduleName
will generated a directory, the html and css files in the front_modules directory

 # Directory of project:
```tree
yourProject
├── _package.json
├── _node_modules
|   ├── *<any>
|   └── *<any>
├── _front_modules
|   ├── miModule
        ├── services-iModule.html
        ├── services-miModule.css
        ├── services-miModule.js
 ```

### Collaboration

 - Abraham Espinosa
 - Jorge A. Hernandez
 - A. Alejandro Caravantes

License
----

MIT


**Free Software, Hell Yeah!**

 