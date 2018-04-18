#! /usr/bin/env node

'use strict';

const argv = require('yargs').argv;

const core = require('../lib/index');

core.createDirectory(argv);