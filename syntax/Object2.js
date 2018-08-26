// array, object
// 함수 자체가 값이 될 수 있다
var f = function() {
  console.log(1+1);
  console.log(1+2);
}

var a = [f];  // 함수를 배열에 담을 수 있다
a[0]();

var o = { // 함수를 객체에 담을 수 있다
  func:f
}
o.func();   // 결과값 : 2 3
console.log(o['func']); // 결과값 : function() { console.log(1+1)...} 

f();

// var i = if(true){ console.log(1); } error
// while(true){ console.log(1) } error
