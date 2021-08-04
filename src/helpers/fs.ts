import * as fs from 'fs';
import chalk from 'chalk';

export const createFolder = (name: string) => {
    if (fs.existsSync(name)) {
        throw new Error('❌ Folder already exist');
    }

    fs.mkdirSync(name);
    console.log(`✅ ${chalk.bgCyan.bold(name)} ${chalk.cyanBright('created!')}`);
};

export const isFileExist = (path: string = '.') => fs.existsSync(path);

export const createMetaFile = async (content: string = '', path: string = '.') => {
    fs.appendFile(`${path}/.meta`, content, () => {
        console.log(chalk.cyanBright`✅ .meta file created!`);
    });
};

export const writeMetaFileContent = async (content: string = '', path: string = '.') => {
    fs.writeFile(`${path}/.meta`, content, 'utf-8', () => {
        console.log(chalk.cyanBright`✅ .meta file updated!`);
    });
};
