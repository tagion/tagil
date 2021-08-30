import {expect, test} from '@oclif/test';

import {DEFAULT_LABORATORY_NAME, CONTROLS} from '../constants';
import {removeTestingFolder, createTestingFolder} from '../helpers';

describe('Command [install]', () => {
    test.timeout(10000)
        .do(async () => {
            await createTestingFolder(DEFAULT_LABORATORY_NAME);
            await createTestingFolder(`${DEFAULT_LABORATORY_NAME}/tub`); // Mocking maker
            process.chdir(DEFAULT_LABORATORY_NAME);
        })
        .stdin(`${CONTROLS.Space}${CONTROLS.Down}${CONTROLS.Space}${CONTROLS.Enter}`, 1000) // MultiSelect prompt ([install] command) selecting modules mocking
        .stdout({print: true, stripColor: true})
        .command(['install'])
        .it('installing tagion dependencies', async (ctx, done) => {
            expect(ctx.stdout).to.contain('Pick Tagion utils to install (press space to select)');
            expect(ctx.stdout).to.contain('✅ .meta file updated!');
            expect(ctx.stdout).to.contain('✅ Tagion modules updated!');

            await removeTestingFolder(`../${DEFAULT_LABORATORY_NAME}`, () => done());
        });
});
