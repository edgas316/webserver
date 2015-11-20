var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs') // file system
    //arrey of mime types
var mimeTypes = {
        "html": "text/html",
        "jpeg":"image/jpeg",
        "jpg":"image/jpeg",
        "png":"image/png",
        "js":"text/javascript",
        "css":"text/css"
    }
// Create Server
http.createServer(function(req, res){
    var uri = url.parse(req.url).pathname,
        fileName = path.join(process.cwd(),unescape(uri))
    console.log('loading '+ uri)
    var stats;
    try{
        stats = fs.lstatSync(fileName)
    }catch(e){
        res.writeHead(404, {'content-type':'text/plain'})
        res.write('404 Nor Found\n')
        res.end()
        return
    }
    
    //Check if file/directory
    if(stats.isFile()){
        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]]
        res.writeHead(200, {'Content-type': mimeType})
        var fileStream = fs.createReadStream(fileName)
        fileStream.pipe(res)
    }else if (stats.isDirectory()){
        res.writeHead(302, {
            'location':'index.html'
        })
        res.end()
    }else{
        res.writeHead(500, {'Content-Type':'test/plain'})
        res.write('500 Internal Error\n')
        res.end()
    }
    
}).listen(3000)


//http.createServer(function(req, res){
//    res.writeHead(200, {'Content-Type':'text/plain'})
//    res.end('Hello There\n')
//}).listen(1337, '127.0.0.1')
//console.log('Server responded at http;//127.0.0.1:1337')