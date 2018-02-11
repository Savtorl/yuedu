var yanzhengma="";
function changeXHR(type,url,bcd){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.status==200 &&  xhr.readyState==4){
            console.log(xhr.responseText);  
            var json=eval("("+xhr.responseText+")");
            console.log(json.captcha); 
            yanzhengma=json.captcha;
            if(json.code=="SUCCESS"){
                console.log(json.code);
            }else if(json.code=="account_token_invalid"){
                alert("身份已失效,请重新登陆");
            }else if(json.code=="sms_captcha_fail"){
                alert("短信验证码错误");
            }else if(json.code=="sms_captcha_overdue"){
                alert("短信验证码已过期");
            }else if(json.code=="account_not_found"){
                alert("用户不存在,请重新输入");
            }else if(json.code=="phone_format_error"){
                alert("手机号输入有误,请重新输入");
            } 
        }
    }

    xhr.open(type,url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(bcd);
}
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

    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.status==200 &&  xhr.readyState==4){
            console.log(xhr.responseText); 
            var json=eval("("+xhr.responseText+")");
            yanzhengma=json.captcha;
            alert("您的验证码为："+json.captcha); 
            
        }
    }
    // var url='https://dev.apis.sh/nBmWNkg$9O/captcha?type=register&phone='+uPhone;
    // ajaxXHR('GET',url);

    xhr.open("get",'https://dev.apis.sh/nBmWNkg$9O/captcha?type=reset&phone='+uPhone);
    xhr.send();
}

document.getElementById('changeSubmit').onclick=function(){     
    var uPhone=document.getElementById('userPhone').value;
    var uPwd=document.getElementById('userPwd').value;
    var uPwd2=document.getElementById('userPwd2').value;
    var getCode=document.getElementById('note').value;
    
    if(uPhone==""){
        alert('手机号不能为空');
        return;
    }else if(!(/^1[34578]\d{9}$/.test(uPhone))){
        alert("手机号码有误，请重填");  
        return false; 
    }

    if(getCode==""){
        alert('请输入验证码！');
        return;
    }else if(getCode!=yanzhengma){
        alert("验证码有误");
        return false;
    }

    if(uPwd==""){
        alert('密码不能为空');
    }else if(uPwd.length<6){
        alert('密码长度要在6~32位以内');
    }else if(uPwd.length>32){
        alert('密码长度要在6~32位以内');
    }else if(uPwd==uPwd2){
        console.log('两次密码一致');
        //button type=button 
        // document.forms[0].submit();
        var token=localStorage.name;
        var url="https://dev.apis.sh/nBmWNkg$9O/account/reset";
        var bcd="password="+uPwd+"&token="+localStorage.token+"&captcha="+getCode+"&phone="+uPhone;
        // alert(bcd);
        changeXHR('POST',url,bcd);
        window.location.href="sign.html";
    }else{
        alert('两次密码不一致');
    }    
}