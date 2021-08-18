import * as rimraf from 'rimraf';
import * as fs from 'fs';
import chalk from 'chalk';

const green = chalk.green;
const bold = chalk.bold;

export const removeTestingFolder = async (path: string, cb?: () => void) => {
    if (!fs.existsSync(path)) {
        console.error('❌ Folder not founded!');
    }

    return new Promise(resolve => {
        rimraf(path, () => {
            console.log(`${green`✅ Testing folder`} ${bold(path)} ${green`deleted!`}`);
            resolve(path);
            cb && cb();
        });
    });
};

export const createTestingFolder = async (path: string, cb?: () => void) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, {recursive: true}, error => {
            if (error) {
                reject(error);
                console.error(error);
            }

            console.log(`${green`✅ Testing folder`} ${bold(path)} ${green`created!`}`);
            resolve(path);
            cb && cb();
        });
    });
};
