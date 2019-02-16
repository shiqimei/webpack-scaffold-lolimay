const chalk = require('chalk')
const readline = require('readline')
const fs = require('fs')
const path = require('path')

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

fs.readFile(path.join(__dirname, '../package.json'), 'utf8', (err, pkg) => {
    if(err) throw err

    pkg = JSON.parse(pkg)
    const scripts = pkg.scripts

    delete scripts.test
    scripts.start = 'NODE_ENV=development webpack-dev-server --host 0.0.0.0 --open --hot --config build/webpack.config.js'
    scripts.build = 'NODE_ENV=production webpack --config build/webpack.config.js'

    fs.writeFile(path.join(__dirname, '../package.json'), JSON.stringify(pkg, null, 4), (err) => {
        if(err) throw err
    })
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