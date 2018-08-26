var M = {
  v : 'v',
  f : function(){
    console.log(this.v);
  }
}

var N = {
  a1 : 'piper',
  a2 : 'alex'
}

module.exports = M; // M객체를 이 모듈 바깥에서 사용할 수 있도록 만듦.,
