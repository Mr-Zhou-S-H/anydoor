const http = require('http')
const chalk = require('chalk')
const path = require('path')
const conf = require('./config/defaultConfig')
const route = require('./helper/route')

const serve = http.createServer((req, res) => {
    const filePath = path.join(conf.root, req.url) //拼接路径
    console.log(filePath)
    // 异步解决
    route(req, res, filePath)
    // 回调解决
    // fs.stat(filePath, (err, stats)=> {
        // if(err) { // 判断路径是否存在
        //     res.statusCode = 404
        //     res.setHeader('Content-Type', 'text/plain')
        //     res.end(`${filePath} is a not found`)
        //     return
        // }
        // if(stats.isFile()){ //判断是 isFile() 文件还是 isDirectory() 文件夹
        //     res.statusCode = 200
        //     res.setHeader('Content-Type', 'text/plain')
        //     // fs.readFile(filePath, (err, data)=> { // 读取文件内容 返回客户端 慢。。
        //     //     res.end(data)
        //     // })
        //     fs.createReadStream(filePath).pipe(res) //通过流的形式读取文件，返回给客户端

        // }else if (stats.isDirectory()){
        //     fs.readdir(filePath, (err, files)=> {
        //         res.statusCode = 200
        //         res.setHeader('Content-Type', 'text/plain')
        //         res.end(files.join(','))
        //     })
        // }
    // })
})

serve.listen(conf.port, conf.hostname, ()=> {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.info(`Server started at ${chalk.green(addr)}`)
})