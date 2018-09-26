function person(name,age){
    var o=new Object();
    o.name=name;
    o.age=age;
    o.getName=function(){
        console.log(this.name);
    }
    return o;
}
var person1 = person("xiaoming",11); 