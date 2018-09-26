function single(fn){
    var elm;
    return function(){
        return elm||(elm = fn.apply(this,arguments));
    }
}