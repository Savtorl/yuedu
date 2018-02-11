// 登录按钮
document.getElementById('LoginSubmit').onclick=function(){    
    var LogPhone=document.getElementById('LogPhone').value;
    var LogPwd=document.getElementById('LogPwd').value;
    var LogPwd2=document.getElementById('LogPwd2').value;
    if(LogPhone==""){
        return;
        alert('手机号不能为空');
    }else if(!(/^1[34578]\d{9}$/.test(LogPhone))){
        alert("手机号码有误，请重填");  
        return false;
    }
    if(LogPwd==""){
        alert('密码不能为空');
    }else if(LogPwd.length<6){
        alert('密码长度要在6~32位以内');
    }else if(LogPwd.length>32){
        alert('密码长度要在6~32位以内');
    }else if(LogPwd==LogPwd2){
        console.log('两次密码一致');
        ajaxXHR('POST',url+'nBmWNkg$9O/account/login',function(data){
            if(data.code=="SUCCESS"){
                // 本地存储用户基本信息
                localStorage.token=data.data.user.token;
                localStorage.account=data.data.user.account;
                localStorage.avatar=data.data.user.avatar;
                localStorage.name=data.data.user.name;
                // 登录成功跳转至首页
                // console.log(data);
                window.location.href="ArticleList.html";
            }else{
                alert("用户名或密码错误");
            }
        },'account='+LogPhone+'&password='+LogPwd);     
    }else{
        alert('两次密码不一致');
    }    
}
