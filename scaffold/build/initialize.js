const chalk = require('chalk')
const readline = require('readline')
const fs = require('fs')

const log = {
    info: (text) => {
        console.log(chalk.bold.green(text))
    },
    error: (text) => {
        console.log(chalk.bold.red(text))
    }
}
const rl =readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

log.info('请输入项目名')

rl.on('line', (AppName) => {
    const template = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${AppName}</title>
      </head>
      <body></body>
    </html>`.trim()

    rl.close()

    fs.writeFile('index.html', template, (error) => {
        if(error) {
            log.error('初始化失败')
        } else {
            log.info('项目创建成功')
        }
    })
})