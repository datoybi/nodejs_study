var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url; // _url=query string. ex) /?id=HTML
    var queryData = url.parse(_url, true).query; // queayData = { id: 'HTML', string: 'CSS' }
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    if(pathname === '/') {  // 404에러시 not found 출력
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){ //template literal 주의
            var template = `
              <!doctype html>
              <html>
              <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
              </head>
              <body>
                <h1><a href="/">WEB</a></h1>
                <ul>
                  <li><a href="/?id=HTML">HTML</a></li>
                  <li><a href="/?id=CSS">CSS</a></li>
                  <li><a href="/?id=JavaScript">JavaScript</a></li>
                </ul>
                <h2>${title}</h2>
                <p>${description}</p>
              </body>
              </html>
              `;
            response.writeHead(200);  // 200 성공적으로 파일 열림
            response.end(template);
          });
    } else {
      response.writeHead(404);  // 에러
      response.end('Not found');
    }

});
app.listen(3000);
