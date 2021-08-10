import {Hook} from '@oclif/config';

import {UserMessages} from '../../constants';

const figlet = require('figlet');
const gradient = require('gradient-string');
const chalk = require('chalk');

const hook: Hook<'greetings'> = async function ({withTitle = true}: any) {
    const title = figlet.textSync('Tagil', {
        font: 'Graffiti',
        horizontalLayout: 'full',
        verticalLayout: 'full'
    });

    if (withTitle) {
        this.log(gradient('red', 'blue').multiline(title, {interpolation: 'hsv', hsvSpin: 'long'}));
    }

    this.log(chalk.cyan`-------------------------------------------------`);
    this.log(chalk.bold(UserMessages.welcomeSubtitle));
    this.log(chalk.cyan`-------------------------------------------------`);
};

export default hook;
