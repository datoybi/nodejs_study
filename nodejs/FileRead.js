var fs = require('fs');
fs.readFile('sample.txt', 'utf-8', function(err, data){ // 상위폴더에서 파일을 읽기 떄문에 Sample.txt위치를 찾지 못하니까 cmd에서 cd nodejs로 들어가서 실행해야 한다.  // 나오는 방법 cd ..
  console.log(data);
});
