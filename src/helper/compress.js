// 压缩方法
const {createGzip, createDeflate} = require('zlib')
module.exports = (rs, req, res)=> {
  const acceptEncoding = req.headers['accept-encoding']
  if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
    return rs
  }else if(acceptEncoding.match(/\bgzip\b/)) { //开启gzip压缩
    res.setHeader('Content-Type', 'gzip')
    return rs.pipe(createGzip())
  }else if(acceptEncoding.match(/\bdeflate\b/)) { //开启deflate压缩
    res.setHeader('Content-Type', 'deflate')
    return rs.pipe(createDeflate())
  }
}   