const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars') //编译模版文件为html
const promisify = require('util').promisify; //解决异步回调
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config = require('../config/defaultConfig')

const tplPath = path.join(__dirname, '../template/dir.tpl') //获取绝对路径
const source = fs.readFileSync(tplPath) 
const template = Handlebars.compile(source.toString())
module.exports = async function (req, res, filePath) {
    // 异步解决
    try {
        const stats = await stat(filePath)
        if(stats.isFile()){ //判断是 isFile() 文件还是 isDirectory() 文件夹
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            // fs.readFile(filePath, (err, data)=> { // 读取文件内容 返回客户端 慢。。
            //     res.end(data)
            // })
            fs.createReadStream(filePath).pipe(res) //通过流的形式读取文件，返回给客户端

        }else if (stats.isDirectory()){
            //  改写前
            // fs.readdir(filePath, (err, files)=> {
            //     res.statusCode = 200
            //     res.setHeader('Content-Type', 'text/plain')
            //     res.end(files.join(','))
            // })
            // 改写后
            const files = await readdir(filePath)
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                const dir = path.relative(config.root, filePath)
                const data = {
                    title: path.basename(filePath),
                    dir: dir? `/${dir}` : '',
                    files 
                }
                res.end(template(data))
        }
    } catch (error) {
        console.error(error)
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end(`${filePath} is a not found\n${error.toString()}`)
    }
}