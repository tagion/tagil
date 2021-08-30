import {Command, flags} from '@oclif/command';
import * as fs from 'fs';

import {ErrorMessages} from '../constants';
import {throwError, isFileExist, readDirPromise} from '../helpers';

export default class Watch extends Command {
    static description = 'describe the command here';

    static flags = {
        help: flags.help({char: 'h'}),
        // flag with a value (-n, --name=VALUE)
        name: flags.string({char: 'n', description: 'name to print'}),
        // flag with no value (-f, --force)
        force: flags.boolean({char: 'f'})
    };

    static args = [{name: 'file'}];

    async run() {
        const {args, flags} = this.parse(Watch);

        if (!isFileExist('tub')) {
            throwError(ErrorMessages.notInLaboratory);
        }

        if (!isFileExist('src')) {
            throwError(ErrorMessages.modules404);
        }

        process.chdir('src');
        const files = await readDirPromise();
        console.log(files);
        process.chdir('..');

        const name = flags.name ?? 'world';
        this.log(
            `hello ${name} from /Users/vlady/Projects/tagion/tagil-workspace/packages/tagil/src/commands/watch.ts`
        );
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`);
        }
    }
}
