#!/usr/bin/env node
'use strict';

const { program } = require('commander');
const { init } = require('../src/commands/init');
const { create } = require('../src/commands/create');
const { version } = require('../package.json');

program
    .name('df-cc')
    .description('DataFlex Custom Component CLI — scaffold and generate components for DataFlex webapps')
    .version(version);

program
    .command('init')
    .alias('i')
    .description('Initialise the custom component build setup in the current DataFlex workspace')
    .option('--name <namespace>', 'IIFE global namespace for all component classes', 'DFCC')
    .action((options) => init(options));

program
    .command('create <ComponentName>')
    .alias('c')
    .description('Generate a new component (JS class, CSS file, and DataFlex .pkg)')
    .action((name) => create(name));

program.parse(process.argv);
