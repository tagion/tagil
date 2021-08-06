import {Command, flags} from '@oclif/command'

export default class Hello extends Command {
    static description = 'Hello, World! Testing';

    async run() {
      this.log('Hello, World!')
    }
}
