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
* [`tagil init [LABORATORY]`](#tagil-init-laboratory)
* [`tagil install [PATH]`](#tagil-install-path)
* [`tagil update [PATH]`](#tagil-update-path)
* [`tagil watch [FILE]`](#tagil-watch-file)

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

## `tagil init [LABORATORY]`

Command for laboratory initialization. Installing Maker and desirable Tagion modules.

```
USAGE
  $ tagil init [LABORATORY]

ARGUMENTS
  LABORATORY  Tagion laboratory folder name

OPTIONS
  -h, --help                   show CLI help
  -l, --laboratory=laboratory  Tagion laboratory folder name

EXAMPLES
  $ tagil init -l=laba
  $ tagil init laba
```

_See code: [src/commands/init.ts](https://github.com/tini2n/tagil/blob/v0.0.0/src/commands/init.ts)_

## `tagil install [PATH]`

Installing Tagion modules.

```
USAGE
  $ tagil install [PATH]

ARGUMENTS
  PATH  [default: .] Path for installing modules

OPTIONS
  -h, --help       show CLI help
  -p, --path=path  [default: .] Path for installing modules

EXAMPLES
  $ tagil install
  $ tagil install ./laba
```

_See code: [src/commands/install.ts](https://github.com/tini2n/tagil/blob/v0.0.0/src/commands/install.ts)_

## `tagil update [PATH]`

Updating laboratory modules.

```
USAGE
  $ tagil update [PATH]

ARGUMENTS
  PATH  [default: .] Path for updating modules

OPTIONS
  -h, --help       show CLI help
  -p, --path=path  [default: .] Path for updating modules

EXAMPLES
  $ tagil update
  $ tagil update ./laba
```

_See code: [src/commands/update.ts](https://github.com/tini2n/tagil/blob/v0.0.0/src/commands/update.ts)_

## `tagil watch [FILE]`

describe the command here

```
USAGE
  $ tagil watch [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/watch.ts](https://github.com/tini2n/tagil/blob/v0.0.0/src/commands/watch.ts)_
<!-- commandsstop -->
