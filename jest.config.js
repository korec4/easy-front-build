'use strict';

module.exports = {
    verbose: true,
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50
        }
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'lib/index.js'
    ],
    coverageReporters: ['text-summary', 'html']
};

