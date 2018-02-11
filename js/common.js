//接口统一地址
var url="https://dev.apis.sh/";

//静态资源地址需在服务器地址后面添加static前缀 
var url_file="https://dev.apis.sh/nBmWNkg$9O/static/"

var userName="";
/**
 * 封装一个原生的AJAX请求
 * @param {*} type 请求类型 
 * @param {*} url  接口地址
 * @param {*} cb   请求成功的回调函数
 * @param {*} params  请求参数（POST）
 */
function ajaxXHR(type,url,cb,params){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            var data=JSON.parse(xhr.response);
            cb(data);
            //执行调用方法
            // cb(xhr.response);
        }
    }
    xhr.open(type,url);
    // xhr.responseType="json";
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
}

function postXHR(type,url,cb,params){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            var data=JSON.parse(xhr.response);
            cb(data);
            //执行调用方法
            // cb(xhr.response);
        }
    }
    xhr.open(type,url);    
    xhr.withCredentials=true;
    // xhr.responseType="json";
    xhr.send(params);
}

function formdataXHR(type,url,cb,params){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            var data=JSON.parse(xhr.response);
            cb(data);
            //执行调用方法
            // cb(xhr.response);
        }
    }
    xhr.open(type,url);    
    xhr.withCredentials=true;
    // xhr.responseType="json";
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.send(params);
}