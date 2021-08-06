import {expect, test} from '@oclif/test';

describe('[hello] command ', () => {
    test.stdout()
        .command(['hello'])
        .it('prints default greetings', ctx => {
            expect(ctx.stdout).to.contain('Hello, World!');
        });
});
