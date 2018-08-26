var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url; // _url=query string. ex) /?id=HTML
    var queryData = url.parse(_url, true).query; // queayData = { id: 'HTML', string: 'CSS' }
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/') {  // 404에러시 not found 출력
      if(queryData.id === undefined) {
        fs.readdir('./data', function(error, fileList) {
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(fileList);
          var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
          response.writeHead(200);  // 200 성공적으로 파일 열림
          response.end(html);
        });
      } else {
        fs.readdir('./data', function(error, fileList) {
          var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){ //template literal 주의
          var title = queryData.id;
          var sanitizedTile = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description, {
            allowedTags:['h1']
          });
          var list = template.list(fileList);
          var html =  template.HTML(sanitizedTile, list, `<h2>${sanitizedTile}</h2>${sanitizedDescription}`,
            `<a href="/create">create</a> <a href="/update?id=${sanitizedTile}">update</a>
            <form action="delete_process" method="post" onsubmit="">
              <input type="hidden" name="id" value="${sanitizedTile}">
              <input type="submit" value="delete" style="">
            </form>`,);
          response.writeHead(200);  // 200 성공적으로 파일 열림
          response.end(html);
        });
      });
      }
    } else if(pathname === '/create'){
      fs.readdir('./data', function(error, fileList) {
        var title = 'WEB - create';
        var list = template.list(fileList);
        var html = template.HTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,'');
        response.writeHead(200);  // 200 성공적으로 파일 열림
        response.end(html);
      });
    } else if(pathname === '/create_process') {
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});  // 302 : 페이지를 REDIRECT
          response.end();
        });
      });
    } else if(pathname === '/update') {
      fs.readdir('./data', function(error, fileList) {
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){ //template literal 주의
        var title = queryData.id;
        var list = template.list(fileList);
        var html =  template.HTML(title, list,
          `
          <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200);  // 200 성공적으로 파일 열림
        response.end(html);
      });
    });
  } else if(pathname =='/update_process'){
    var body = '';
    request.on('data', function(data){
      body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${filteredId}`, `data/${title}`, function(error) {
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});  // 302 : 페이지를 REDIRECT
          response.end();
        });
      });
    });
  } else if(pathname =='/delete_process'){
    var body = '';
    request.on('data', function(data){
      body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`, function(error){
        response.writeHead(302, {Location: `/`});  // 302 : 페이지를 REDIRECT
        response.end();
      });
    });
  } else {
      response.writeHead(404);  // 에러
      response.end('Not found');
    }
});
app.listen(3000);
