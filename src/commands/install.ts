import {Command, flags} from '@oclif/command';
import * as prompts from 'prompts';
import {exec} from 'child_process';
import {Spinner} from 'clui';
import chalk from 'chalk';

import {ErrorMessages, GitRaw, PromptMessages, SPINNERS} from '../constants';

import {writeMetaFileContent, isFileExist, throwError} from '../helpers';
import git from '../services/git';
import http from '../models/http';

import MetaUpdate from './update';

export class Install extends Command {
    static description = 'Installing Tagion modules.';

    static examples = ['$ tagil install', '$ tagil install ./laba'];

    static flags = {
        help: flags.help({char: 'h'}),
        path: flags.string({char: 'p', description: PromptMessages.installPathArgDesc, default: '.'})
    };

    static args = [{name: 'path', description: PromptMessages.installPathArgDesc, default: '.'}];

    async installMaker(path = '.') {
        const spinner = new Spinner('Installing maker', SPINNERS.dots12);

        spinner.start();

        const {data} = await http.get(GitRaw.Tub);

        return new Promise(resolve => {
            exec(`${data}`, {cwd: path}, (error, stdout: string) => {
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

        if (!isFileExist('tub')) {
            throwError(ErrorMessages.notInLaboratory);
        }

        try {
            spinner.start();
            const library = await git.fetchTubLibrary();
            spinner.stop();

            const normalizedLibrary = Object.entries(library).map(([name, value]) => ({
                title: name,
                value: {name, link: value}
            }));

            const response = await prompts({
                type: 'multiselect',
                name: 'utils',
                message: 'Pick Tagion utils to install (press space to select)',
                choices: normalizedLibrary
            });

            const metaFileContent = {
                projects: Object.entries(response.utils).reduce((prev: any, [_index, {name, link}]: any) => {
                    prev[`./src/${name}`] = link;

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
