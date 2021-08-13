import {expect, test, command} from '@oclif/test';

const fs = require('fs');
const prompts = require('prompts');

describe('[init] command', () => {
    // .stub(prompts, '', () => async () => ({name: 'laba'}))
    test
        .stdout({print: true, stripColor: false})
        .command(['init'])
        .it('creating laboratory folder', async (ctx, done) => {
            // expect(ctx.stdout).to.contain('Hello, World!');
            process.chdir('..');
            fs.rm('./laba', {recursive: true}, (error: any) => {
                if (error) {
                    console.log(error);
                }

                console.log('Testing folder deleted');
                done();
            });
        });
});
