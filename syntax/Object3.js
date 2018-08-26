var q = {   // 객체는 폴더와 같은 기능
  v1 : 'v1',
  v2 : 'v2',
  f1 : function() {
    console.log(this.v1);
  },
  f2 : function() {
    console.log(this.v2);
  }
}

q.f1();
q.f2();
