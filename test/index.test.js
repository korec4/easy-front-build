'use strict';
const core = require('../lib/index');
const fs = require('fs');
const sinon = require('sinon');

test('writeDirectory', (done) => {

    const stub = sinon.stub(fs, 'mkdirSync').callsFake(() => {
        return undefined;
    });

    const promise = core.WriteDirectory('front_modules', 'petter');

    expect.assertions(1);
    return promise.then(data => {
        expect(data).toBe(false);
        done();
    });
});

