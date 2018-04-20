'use strict';
const core = require('../lib/index');
const fs = require('fs');
const sinon = require('sinon');
//const helper = require('./sinonObjects/index.sinon.js');

test('writeDirectory', (done) => {

    const stub = sinon.stub(fs, 'mkdir').callsFake(() => {
        Promise.resolve('peanut butter');
    });

    const promise = core.WriteDirectory('front_modules', 'test');


    return expect(promise).resolves.toBe('peanut butter');

});

