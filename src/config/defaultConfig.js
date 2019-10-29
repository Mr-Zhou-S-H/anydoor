module.exports = {
    hostname: '127.0.0.1', //server地址
    port: 8888, //端口号
    root: process.cwd(), //当前文件夹的路径
    compress: /\.(html|js|css|md)/ // 需要压缩的文件   gzip
}