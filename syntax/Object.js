// array
var member = ['egoing', 'dasom', 'bora'];
console.log(member[1]); // dasom

var i = 0;
while(i <member.length) {
  console.log('array loop ', member[i]);
  i = i + 1;
}

// object
var roles = {'programmer' : 'egoing',
              'desginer' : 'dasom' ,
              'manager' : 'bora'};
console.log(roles.desginer);
console.log(roles['desginer']);

for(var name in roles) {
  console.log('object=>', name, 'value=>', roles[name]);
}
