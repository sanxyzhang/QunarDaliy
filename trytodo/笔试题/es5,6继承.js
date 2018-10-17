class Parent{
    constructor(a,b){
        this.a=a;
        this.b=b;
    }
    parentMethod(){
        return this.a+this.b;
    }
}
class Child extends Parent{
    constructor(a,b,c){
        super(a,b);
        this.c=c;
    }
    childMethod(){
        return this.c+super.parentMethod();
    }
}
const point = new Child(1,2,3);
console.log(point.childMethod());