import {Command, flags} from '@oclif/command';
import * as enquirer from 'enquirer';
import {exec} from 'child_process';
import {Spinner} from 'clui';
import chalk from 'chalk';

import {ErrorMessages, GitRepos, PromptMessages, SPINNERS} from '../constants';

import {writeMetaFileContent, isFileExist, throwError} from '../helpers';
import git from '../services/git';

import MetaUpdate from './update';

const {MultiSelect} = enquirer as any;

export default class Install extends Command {
    static description = 'Installing Tagion modules.';

    static examples = ['$ tagil install', '$ tagil install ./laba'];

    static flags = {
        help: flags.help({char: 'h'}),
        path: flags.string({char: 'p', description: PromptMessages.installPathArgDesc, default: '.'})
    };

    static args = [{name: 'path', description: PromptMessages.installPathArgDesc, default: '.'}];

    installMaker(path = '') {
        const spinner = new Spinner('Installing maker', SPINNERS.dots12);

        spinner.start();

        return new Promise(resolve => {
            exec(`git clone ${GitRepos.Roots} . && make`, {cwd: path || './'}, (error, stdout: string) => {
                spinner.stop();

                if (error) {
                    throwError(`Install error:\n ${error}`);
                }

                resolve(chalk.cyan(stdout));
            });
        });
    }

    async run() {
        const {args, flags} = this.parse(Install);
        const spinner = new Spinner('Fetching Tagion library', SPINNERS.dots12);

        if (!isFileExist('maker')) {
            throwError(ErrorMessages.notInLaboratory);
        }

        try {
            spinner.start();
            const library = await git.fetchTubLibrary();
            spinner.stop();

            const normalizedLibrary = Object.entries(library).map(([name, value]) => ({name, value}));
            const utilsPrompt = new MultiSelect({
                name: 'utils',
                message: 'Pick Tagion utils to install (press space to select)',
                choices: normalizedLibrary,
                result(names: string[]) {
                    return this.map(names);
                }
            });
            const answers = await utilsPrompt.run();
            const metaFileContent = {
                projects: Object.entries(answers).reduce((prev: any, [name, value]) => {
                    prev[`./src/${name}`] = value;

                    return prev;
                }, {})
            };

            writeMetaFileContent(JSON.stringify(metaFileContent));
        } catch (error) {
            throwError(error);
        }

        try {
            const updater = new MetaUpdate(this.argv, this.config);

            await updater.run();
        } catch (error) {
            throwError(error);
        }
    }
}
