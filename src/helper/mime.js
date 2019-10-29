const path = require('path')
const mimeTypes = { 
"css": "text/css",
"gif": "image/gif",
"html": "text/html",
"ico": "image/x-icon",
"jpeg": "image/jpeg",
"jpg": "image/jpeg",
"js": "text/javascript",
"json": "application/json",
"pdf": "application/pdf",
"png": "image/png",
"svg": "image/svg+xml",
"swf": "application/x-shockwave-flash",
"swfl":"application/x-shockwave-flash",
"txt": "text/plain",
"xml": "application/xml"
}
module.exports = (filePath) => {
    let ext = path.extname(filePath)
    .split('.')
    .pop()
    .toLocaleLowerCase()
    if(!ext) {
        ext = filePath
    }
    return mimeTypes[ext] || mimeTypes['txt']
}