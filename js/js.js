var abc="";
// 登录/注册切换
function logIn(){
    var login=document.getElementById('log-in');
    login.className="sign-in";
    var classVal = document.getElementById("sign-in").getAttribute("class");
    classVal = classVal.replace("sign-in","");
    document.getElementById("sign-in").setAttribute("class",classVal);
    document.querySelector('#SignIn').style.display="none";
    document.querySelector('#LogIn').style.display="block";
} 
function signIn(){    
    var signin=document.getElementById('sign-in');
    signin.className="sign-in";
    var classVal = document.getElementById("log-in").getAttribute("class");
    classVal = classVal.replace("sign-in","");
    document.getElementById("log-in").setAttribute("class",classVal);
    document.querySelector('#LogIn').style.display="none";
    document.querySelector('#SignIn').style.display="block";
}
// 获取验证码
document.getElementById('getCode').onclick=function(){
    var getCode=document.getElementById('note').value;
    var uPhone=document.getElementById('userPhone').value;
    if(uPhone==""){
        alert('手机号不能为空');
        return;
    }else if(!(/^1[34578]\d{9}$/.test(uPhone))){
        alert("手机号码有误，请重填");  
        return false; 
    }
    ajaxXHR('GET',url+'nBmWNkg$9O/captcha?type=register&phone='+uPhone,function(data){
        abc=data.captcha;
        if(data.code=="SUCCESS"){
            alert("您的验证码为："+data.captcha);
        }else if(data.code=="account_has_registered"){
            alert("手机号已被注册");
        }else if(data.code=="phone_format_error"){
            alert("手机号格式错误");
        }else if(data.code=="param_type_error"){
            alert("验证码类型错误");
        }
    })
}

// 注册按钮
document.getElementById('btnSubmit').onclick=function(){
    var uPhone=document.getElementById('userPhone').value;
    var uPwd=document.getElementById('userPwd').value;
    var uPwd2=document.getElementById('userPwd2').value;
    var getCode=document.getElementById('note').value;
    console.log("验证码为:"+abc);
    //验证 手机号
    if(uPhone==""){
        alert('手机号不能为空');
        return;
    }else if(!(/^1[34578]\d{9}$/.test(uPhone))){
        alert("手机号码有误，请重填");  
        return false; 
    }
    //验证   验证码
    if(getCode==""){
        alert('请输入验证码！');
        return;
    }else if(getCode!=abc){
        alert("验证码有误");
        return false;
    }
    //验证   密码
    if(uPwd==""){
        alert('密码不能为空');
    }else if(uPwd.length<6){
        alert('密码长度要在6~32位以内');
    }else if(uPwd.length>32){
        alert('密码长度要在6~32位以内');
    }else if(uPwd==uPwd2){
        console.log('两次密码一致');
        // var url="https://dev.apis.sh/nBmWNkg$9O/account/register";
        // var bcd="account="+uPhone+"&password="+uPwd+"&captcha="+getCode;
        //button type=button 
        // document.forms[0].submit();
        // signXHR('POST',url,bcd);
    }else{
        alert('两次密码不一致');
    }    
    ajaxXHR('POST',url+'nBmWNkg$9O/account/register',function(data){
        if(data.code=="SUCCESS"){
            var login=document.getElementById('log-in');
            login.className="sign-in"; 
            var classVal = document.getElementById("sign-in").getAttribute("class");
            classVal = classVal.replace("sign-in","");
            document.getElementById("sign-in").setAttribute("class",classVal);
            document.querySelector('#LogIn').style.display="block";
            document.querySelector('#SignIn').style.display="none";
            alert("注册成功，请登录！");
        }else if(data.code=="account_has_registered"){
            alert("该用户已注册");
        }else if(data.code=="sms_captcha_fail"){
            alert("短信验证码错误");
        }else if(data.code="sms_captcha_overdue"){
            alert("短信验证码已过期");
        }else if(data.code="param_incomplete"){
            alert("输入信息有误");
        }else if(data.code="phone_format_error"){
            alert("手机号格式不正确");
        }
    },"account="+uPhone+"&password="+uPwd+"&captcha="+getCode)  
}

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
    }else if(LogPwd==LogPwd2){
        console.log('两次密码一致');
        
        // loginXHR('POST',url,bcd);
        //button type=button 
        // document.forms[0].submit();
        ajaxXHR('POST',url+'nBmWNkg$9O/account/login',function(data){
            console.log(data);

            if(data.code=="SUCCESS"){
                // 本地存储用户基本信息
                localStorage.token=data.data.user.token;
                localStorage.account=data.data.user.account;
                localStorage.avatar=data.data.user.avatar;
                localStorage.name=data.data.user.name;
                localStorage.userId=data.data.user._id;
                // 登录成功跳转至首页
                var uName=data.data.user.name;
                // alert(data.data.user.name);
                userName=uName;
                localStorage.pwd=LogPwd;
                // localStorage.token = data.data.user.token;
                // localStorage.account = data.data.user.account;
                // localStorage.name = data.data.user.name;
                // localStorage.userimg=data.data.user.background;
                // window.location.href="ArticleList.html";
            }else{
                alert("用户名或密码错误");
            }
        },'account='+LogPhone+'&password='+LogPwd);
        
    }else{
        alert('两次密码不一致');
    }    
}