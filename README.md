tagil
=====



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/tagil.svg)](https://npmjs.org/package/tagil)
[![Downloads/week](https://img.shields.io/npm/dw/tagil.svg)](https://npmjs.org/package/tagil)
[![License](https://img.shields.io/npm/l/tagil.svg)](https://github.com/tini2n/tagil/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g tagil
$ tagil COMMAND
running command...
$ tagil (-v|--version|version)
tagil/0.0.0 darwin-x64 node-v16.4.2
$ tagil --help [COMMAND]
USAGE
  $ tagil COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tagil help [COMMAND]`](#tagil-help-command)
* [`tagil init [LABNAME]`](#tagil-init-labname)
* [`tagil install [FILE]`](#tagil-install-file)
* [`tagil update`](#tagil-update)

## `tagil help [COMMAND]`

display help for tagil

```
USAGE
  $ tagil help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `tagil init [LABNAME]`

Init command

```
USAGE
  $ tagil init [LABNAME]

ARGUMENTS
  LABNAME  Tagion laboratory folder name

EXAMPLE
  $ tagil init -n=[lab-name]
           Initialization 🍊🍊🍊
```

_See code: [src/commands/init.ts](https://github.com/tini2n/tagil/blob/v0.0.0/src/commands/init.ts)_

## `tagil install [FILE]`

describe the command here

```
USAGE
  $ tagil install [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/install.ts](https://github.com/tini2n/tagil/blob/v0.0.0/src/commands/install.ts)_

## `tagil update`

Installing Tagion dependencies.

```
USAGE
  $ tagil update
```

_See code: [src/commands/update.ts](https://github.com/tini2n/tagil/blob/v0.0.0/src/commands/update.ts)_
<!-- commandsstop -->
