'use strict';

module.exports = {
    verbose: true,
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 30,
            lines: 30,
            statements: 30
        }
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'lib/index.js'
    ],
    coverageReporters: ['text-summary', 'html']
};

