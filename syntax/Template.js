var a = '1'; // 리터럴  : 정보를 표현하는 방법 . 정보를 표현하는 기호
/* template Literal
  : 개행시(\n)을 사용하지 않아도 됌, ${변수} 하면 바로 변수를 찾아줌
  사용법 처음과 끝을  ``로 묶는다.
*/
var name = 'dasomyun';
var letter = 'Dear '+name+'\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '+name+' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa egoing qui officia deserunt mollit anim id est laborum. '+name;

var letter = `Dear ${name}

Lorem ipsum dolor sit amet, consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ${1+1}
${name} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa egoing qui
officia deserunt mollit anim id est laborum. ${name}`;

console.log(letter);
