# webpack-scaffold-lolimay

Here is lolimay's webpack scaffold. Though there exists a method to initialize your own webpack project by using webpack-cli.
But unfortunately, I can't install @webpack-cli/init correctly. Besides, the configration of webpack-cli is too complex for me.
So I did this to initialize my webpack project easily.

Bellow are the specific steps to initialize my own webpack project:

# Usage
## 1. Create a scaffold project
The first step is to create a scaffold as your webpack project template. As for me, my is scaffold is **scaffold** folder in this repo.Here is the tree structure.
````bash
.
├── build # some scripts for initializing and building
│   ├── initialize.js # init scripts to auto modify package.json file and generate your project name (web app title)
│   └── webpack.config.js # your webpack configration
├── favicon.ico # your web app icon
├── index.html # webpack index.html template (dont modify this)
└── src # source code of your webpack project
    ├── assets # assets resource folder
    └── index.js # entrypoint of your web app
````

## 2. Write a initializing scripts
In the next step, we should create a init script to initialize our project. We can use a init script to initialize our project name, modify the package.json and do some other works. My initialize.js 's content is
````js
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

// auto modify package.json file
fs.readFile(path.join(__dirname, '../package.json'), 'utf8', (err, pkg) => {
    if(err) throw err

    pkg = JSON.parse(pkg)
    const scripts = pkg.scripts

    delete scripts.test
    scripts.start = 'NODE_ENV=development webpack-dev-server --open --hot --config build/webpack.config.js'
    scripts.build = 'NODE_ENV=production webpack --config build/webpack.config.js'

    fs.writeFile(path.join(__dirname, '../package.json'), JSON.stringify(pkg, null, 4), (err) => {
        if(err) throw err
    })
})

// initialize your webpack project name
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

// your can write your own code here to do some other initializing works
````
## 3. Write a Shell script
In order to create a new webpack proejct from the existed template. We should do the following works: 
1. create a new folder to contain you project files
2. copy the template folder to current path
3. execute the initialize.js to initialize the project
I rely on a shell script to do all these work, the content of `scripts/webinit.sh` is:
````bash
#!/bin/bash

mkdir $1 && cd $1
cp /media/lolimay/Code/Web/Template/webpack/scaffold/. . -r # please replace the path to your own webpack template path
npm init -y
npm i -D chalk
node build/initialize.js
npm i -D babel-eslint clean-webpack-plugin css-loader eslint
html-webpack-plugin inline-manifest-webpack-plugin optimize-css-assets-webpack-plugin style-loader uglifyjs-webpack-plugin webpack webpack-cli webpack-dev-server webpack-merge copy-webpack-plugin
````
## 4. Add alias
The last step is to add a alias to short the init operation. Here is my alias:
````bash
# execute webinit
alias webinit='fun() { ~/Scripts/webinit.sh $1; cd $1; code .;}; fun'
````
The recommended way to add alias is add your alias command to `.bashrc ` file. See alias folder in this repo for more info.

# LICENSE
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
