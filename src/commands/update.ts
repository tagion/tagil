import {Command, flags} from '@oclif/command';
import {exec} from 'child_process';
import chalk from 'chalk';
import * as path from 'path';
import {Spinner} from 'clui';

import {PromptMessages, ErrorMessages, SPINNERS} from '../constants';

import {throwError, isFileExist} from '../helpers';

export default class MetaUpdate extends Command {
    static description = 'Updating laboratory modules.';

    static flags = {
        help: flags.help({char: 'h'}),
        path: flags.string({char: 'p', description: PromptMessages.updatePathArgDesc, default: '.'})
    };

    static examples = ['$ tagil update', '$ tagil update ./laba'];

    static args = [{name: 'path', description: PromptMessages.updatePathArgDesc, default: '.'}];

    async updateExec(cwdPath = '') {
        const spinner = new Spinner('Updating Tagion projects', SPINNERS.dots12);

        spinner.start();
        return new Promise(resolve => {
            exec('meta git update', {cwd: cwdPath}, (error, stdout, stderr) => {
                if (error) {
                    throwError(stderr);
                }

                spinner.stop();
                resolve(chalk.cyan(stdout));
                this.log(chalk.cyanBright`✅ Tagion modules updated!`);
            });
        });
    }

    async run() {
        const {args, flags} = this.parse(MetaUpdate);
        const cwdPath = args.path || flags.path;

        if (!isFileExist('.meta')) {
            throwError(ErrorMessages.notInLaboratory);
        }

        await this.updateExec();
    }
}
