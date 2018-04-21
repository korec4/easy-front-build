'use strict';

const templateHTML = "<!DOCTYPE html>\n<html lang = \"en\" >\n<head>\n<meta charset=\"utf-8\">\n<title>Example of Fetch</title>\n</head>\n<body>\n<h1></h1>\n</body>\n<script type=\"text/javascript\" src =\"fileTest.js\" ></script>\n</html>";
const templateCSS = `${name}{\n}`;
const templateJS = `(function ${name} () {\n\t}();`;

module.exports = {templateHTML, templateCSS, templateJS};