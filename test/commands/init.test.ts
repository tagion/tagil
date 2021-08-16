import {expect, test, command} from '@oclif/test';
import * as enquirer from 'enquirer';

import {CONTROLS} from '../../src/constants';

const fs = require('fs');
const figlet = require('figlet');
const chalk = require('chalk');

const wait = (ms = 10) => new Promise(resolve => setTimeout(resolve, ms));
const defaultLaboratoryName = 'laba';

const removeTestingFolder = (path: string, cb: () => void) => {
    if (!fs.existsSync(path)) {
        throw new Error('❌ Folder not founded!');
    }

    fs.rm(path, {recursive: true}, (error: any) => {
        if (error) {
            console.log(error);
        }

        console.log(chalk.green`✅ Testing folder deleted!`);
        cb();
    });
};

describe('Command [init]', () => {
    test.timeout(13000)
        .stub(enquirer, `prompt`, () => async () => ({name: defaultLaboratoryName}))
        .stdin(`${CONTROLS.Space}${CONTROLS.Down}${CONTROLS.Space}${CONTROLS.Enter}`, 5000)
        .stdout({print: true, stripColor: true})
        .command(['init'])
        .it('greeeting, creating laboratory folder and updating dependencies', async (ctx, done) => {
            const title = figlet.textSync('Tagil', {
                font: 'Graffiti',
                horizontalLayout: 'full',
                verticalLayout: 'full'
            });

            expect(ctx.stdout).to.contain(title);
            expect(fs.existsSync(`../${defaultLaboratoryName}`)).to.be.equal(true);
            expect(ctx.stdout).to.contain(`✅ ${defaultLaboratoryName} created!`);

            await wait(1000);
            expect(fs.existsSync(`.meta`)).to.be.equal(true);
            expect(ctx.stdout).to.contain(`✅ .meta file updated!`);

            await wait(1000);
            expect(ctx.stdout).to.contain(`✅ Tagion modules updated!`);

            done();
        });

    test.timeout(10000)
        .stdin(`${CONTROLS.Space}${CONTROLS.Down}${CONTROLS.Space}${CONTROLS.Enter}`, 4000)
        .stdout({print: true, stripColor: true})
        .command(['init', defaultLaboratoryName])
        .it(`creates laboratory by predefined name [${defaultLaboratoryName}]`, (ctx, done) => {
            expect(fs.existsSync(`../${defaultLaboratoryName}`)).to.be.equal(true);
            expect(ctx.stdout).to.contain(`✅ ${defaultLaboratoryName} created!`);

            removeTestingFolder(`../${defaultLaboratoryName}`, () => done());
        });
});
