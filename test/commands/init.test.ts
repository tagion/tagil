import {expect, test} from '@oclif/test';

describe('[init] command ', () => {
    test.stdout()
        .command(['init'])
        .it('prints default greetings', ctx => {
            expect(ctx.stdout).to.contain('Hello, World!');
        });
});
