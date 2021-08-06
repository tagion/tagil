import {Command, flags} from '@oclif/command';
import {prompt} from 'enquirer';
import chalk from 'chalk';
import * as gradient from 'gradient-string';
import * as figlet from 'figlet';

import {throwError, createFolder} from '../helpers';
import {PromptMessages, UserMessages} from '../constants';

import Install from './install';

export interface Question {
    type: string;
    name: string;
    message?: string;
}

export default class Init extends Command {
    laboratory: string | null = null;

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

    async greetings() {
        const title = figlet.textSync('Tagil', {
            font: 'Graffiti',
            horizontalLayout: 'full',
            verticalLayout: 'full'
        });

        this.log(gradient('red', 'blue').multiline(title, {interpolation: 'hsv', hsvSpin: 'long'}));
        this.log(chalk.cyan`-------------------------------------------------`);
        this.log(chalk.bold(UserMessages.welcomeSubtitle));
        this.log(chalk.cyan`-------------------------------------------------`);
    }

    private async initializeLaboratory() {
        const question: any = {
            type: 'input',
            name: 'name',
            message: PromptMessages.pickLaboratoryName
        };

        try {
            if (!this.laboratory) {
                const answer: {name: string} = await prompt(question);

                this.laboratory = answer.name;
            }

            createFolder(this.laboratory);

            this.log(`Go to ${chalk.cyanBright(this.laboratory)}`);
            process.chdir(this.laboratory);

            await this.install();
        } catch (error) {
            throwError(error);
        }
    }

    private async install() {
        try {
            const installCommand = new Install(this.argv, this.config);

            const stdout: any = await installCommand.installMaker();
            this.log(stdout);

            await installCommand.run();
        } catch (error) {
            throwError(error);
        }
    }

    async run() {
        const {args} = this.parse(Init);

        this.laboratory = args.laboratory;

        this.greetings();
        await this.initializeLaboratory();
    }
}
