import {Command, flags} from '@oclif/command';
import * as prompts from 'prompts';

import {throwError, createFolder} from '../helpers';
import {PromptMessages} from '../constants';

import {Install} from './install';

const chalk = require('chalk');

export interface Question {
    type: string;
    name: string;
    message?: string;
}

export class Init extends Command {
    static description = 'Command for laboratory initialization. Installing Maker and desirable Tagion modules.';

    static examples = ['$ tagil init -l=laba', '$ tagil init laba'];

    static args = [
        {
            name: 'laboratory',
            type: 'string',
            description: PromptMessages.laboratoryArgDesc
        }
    ];

    static flags = {
        help: flags.help({char: 'h'}),
        laboratory: flags.string({char: 'l', description: PromptMessages.laboratoryArgDesc})
    };

    private async initializeLaboratory(predefinedLaboratory: string = '') {
        const question: any = {
            type: 'text',
            name: 'name',
            message: PromptMessages.pickLaboratoryName
        };

        let laboratory: string = predefinedLaboratory;

        try {
            if (!laboratory) {
                const response: {name: string} = await prompts(question);

                laboratory = response.name;
            }

            this.log('laboratory name:');
            this.log(laboratory);

            createFolder(laboratory);

            this.log(`Going to ${chalk.cyanBright(laboratory)}`);
            process.chdir(laboratory);

            await this.installDependencies();
        } catch (error) {
            throwError(error);
        }
    }

    private async installDependencies() {
        try {
            const installCommand = new Install(this.argv, this.config);

            const stdout: any = await installCommand.installMaker();
            this.log(stdout);

            await installCommand.run();
        } catch (error) {
            this.error(error);
        }
    }

    async run() {
        const {args, flags} = this.parse(Init),
            laboratoryName = args.laboratory || flags.laboratory;

        await this.config.runHook('greetings', {withTitle: true});

        await this.initializeLaboratory(laboratoryName);
    }
}
