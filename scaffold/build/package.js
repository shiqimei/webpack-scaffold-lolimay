const fs = require('fs')
const path = require('path')

fs.readFile(path.join('../package.json'), 'utf8', (err, pkg) => {
    if(err) throw err

    pkg = JSON.parse(pkg)
    const scripts = pkg.scripts

    delete scripts.test
    scripts.start = 'NODE_ENV=development webpack-dev-server --open --hot'
    scripts.build = 'NODE_ENV=production webpack'

    fs.writeFile('../package.json', JSON.stringify(pkg, null, 4), (err) => {
        if(err) throw err
    })
})