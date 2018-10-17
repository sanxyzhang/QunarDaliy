function evenListen(element,type,handle){
    if(element.addEvenListener){
        element.addEvenLIstener(type,handle,false);
    }
    else if(element.attachEvent){
        element.attachEvent("on"+type,handle)
    }
    else{
        element["on"+type] = handle;
    }
}