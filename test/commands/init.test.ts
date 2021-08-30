import {expect, test} from '@oclif/test';
import * as enquirer from 'enquirer';

import {DEFAULT_LABORATORY_NAME, CONTROLS} from '../constants';
import {removeTestingFolder} from '../helpers';

const fs = require('fs');
const figlet = require('figlet');

const wait = (ms = 10) => new Promise(resolve => setTimeout(resolve, ms));

describe('Command [init]', () => {
    test.timeout(13000)
        .stub(enquirer, 'prompt', () => async () => ({name: DEFAULT_LABORATORY_NAME}))
        .stdin(`${CONTROLS.Space}${CONTROLS.Down}${CONTROLS.Space}${CONTROLS.Enter}`, 5000) // MultiSelect prompt ([install] command) selecting modules mocking
        .stdout({print: true, stripColor: true})
        .command(['init'])
        .it('greeting, creating laboratory folder and updating dependencies', async (ctx, done) => {
            const title = figlet.textSync('Tagil', {
                font: 'Graffiti',
                horizontalLayout: 'full',
                verticalLayout: 'full'
            });

            expect(ctx.stdout).to.contain(title);
            expect(fs.existsSync(DEFAULT_LABORATORY_NAME)).to.be.equal(true);
            expect(ctx.stdout).to.contain(`✅ ${DEFAULT_LABORATORY_NAME} created!`);

            await wait(1000);
            expect(fs.existsSync(`${DEFAULT_LABORATORY_NAME}/.meta`)).to.be.equal(true);
            expect(ctx.stdout).to.contain('✅ .meta file updated!');

            await wait(1000);
            expect(ctx.stdout).to.contain('✅ Tagion modules updated!');

            await removeTestingFolder(DEFAULT_LABORATORY_NAME, () => done());
        });

    test.timeout(10000)
        .stdin(`${CONTROLS.Space}${CONTROLS.Down}${CONTROLS.Space}${CONTROLS.Enter}`, 4000) // MultiSelect prompt ([install] command) selecting modules mocking
        .stdout({print: false, stripColor: true})
        .command(['init', DEFAULT_LABORATORY_NAME])
        .it(`creates laboratory by predefined name [${DEFAULT_LABORATORY_NAME}]`, async (ctx, done) => {
            expect(fs.existsSync(DEFAULT_LABORATORY_NAME)).to.be.equal(true);
            expect(ctx.stdout).to.contain(`✅ ${DEFAULT_LABORATORY_NAME} created!`);

            await removeTestingFolder(DEFAULT_LABORATORY_NAME, () => done());
        });
});
