import * as fs from 'fs'
import chalk from 'chalk'

export const createFolder = (name: string) => {
  if (fs.existsSync(name)) {
    throw new Error('❌ Folder already exist')
  }

  fs.mkdirSync(name)
  console.log(`✅ ${chalk.bgCyan.bold(name)} ${chalk.cyanBright('created!')}`)
}

export const isFileExist = (path = '.') => fs.existsSync(path)

export const createMetaFile = async (content = '', path = '.') => {
  fs.appendFile(`${path}/.meta`, content, () => {
    console.log(chalk.cyanBright`✅ .meta file created!`)
  })
}

export const writeMetaFileContent = async (content = '') => {
  fs.writeFile('.meta', content, 'utf-8', () => {
    console.log(chalk.cyanBright`✅ .meta file updated!`)
  })
}
