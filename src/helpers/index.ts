import chalk from 'chalk'

export const throwError = (error: string) => {
  throw new Error(chalk.red(error))
}

export * from './fs'
