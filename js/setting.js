var formData=new FormData();

var xingzuo="";

var sheng="";
var shi="";
var qu="";
window.onload=function(){

    if(localStorage.token !=undefined){
        document.querySelector(".user").style.display="inline-block";
        document.querySelector(".not_login").style.display="none";
        document.getElementsByClassName('userName')[0].textContent = localStorage.name;
        //获取用户修改后的头像
        var avatar= document.getElementsByClassName('userHead');
        document.getElementsByClassName('userHead')[0].src = "https://dev.apis.sh/nBmWNkg$9O/static/"+localStorage.avatar;
        // 图片填充(接口返回的图片地址需要前加上服务器地址，如果图片带有http则不需要拼接。)
        // 判断图片地址是否含有http
        // if (avatar.indexOf('http') === -1) {
        //     // indexOf用于判断字符串是否还有指定字段，如果没有则返回-1
        //     document.getElementsByClassName('userHead')[0].src = 'http://localhost:8080/nBmWNkg$9O/'+ avatar;
        //  } else {
        //     document.getElementsByClassName('userHead')[0].src = avatar;
        //  }
        
    }else{
        document.querySelector(".not_login").style.display="inline-block";
        document.querySelector(".user").style.display="none";
    }
    if(localStorage.name != undefined){
        document.getElementById("uName").setAttribute("placeholder",localStorage.name);
    }
    if(localStorage.gender == "man"){

    }

    // 星座
    ajaxXHR('GET',url+'nBmWNkg$9O/constellations/query',function(data){
        var constellation=document.getElementById('constellation');
        var star=data.data.constellations;
        // console.log(star);
        for(var i=0;i<star.length;i++){
            constellation.options.add(new Option(star[i],star[i]));
            // var abc=parseInt(document.getElementById("selectProvince").options[document.getElementById("selectProvince").selectedIndex].value);
        }
    })

    // 获取省份
    ajaxXHR('GET',url+'nBmWNkg$9O/city/province',function(data){        
        var province=data.data.province;
        // console.log(province);
        for(var i=0;i<province.length;i++){            
            //给每个option的文本添加province[i].name,给value添加成ID值
            document.getElementById('selectProvince').options.add(new Option(province[i].name,province[i].ProID));
            // console.log(selectProvince.options);           
            
        }
    });
}
    
    // 获取用户选中的星座
    document.getElementById('constellation').onchange=function(){
        console.log(constellation.value);
        xingzuo=document.getElementById('constellation').value;
    }

//市级联动菜单
document.querySelector('#selectProvince').onchange=function(){
    var selectCity=document.getElementById('selectCity');
    //每次省级菜单onchange时，都清空市级菜单里面的option，再加入onchange之后的市级菜单
    selectCity.options.length=0;
    selectCity.style.display="inline-block";
    //document.getElementById("selectProvince").selectedIndex 获取select的下标
    //document.getElementById("selectProvince").options  获取select下options的value 获取到的值是字符串
    //将字符串转为整数类型赋给abc
    var abc=parseInt(document.getElementById("selectProvince").options[document.getElementById("selectProvince").selectedIndex].value);
    //abc为选中省份的下标  abc=ProID
    console.log(abc);
    // 获取市级
    ajaxXHR('GET',url+'nBmWNkg$9O/city/city?ProID='+abc,function(data){
        //给包裹select的div 追加一个select        
        var city_city=data.data.city;
        console.log(city_city);
        selectCity.add(new Option("——请选择——",0));
        for(var i=0;i<city_city.length;i++){
            //给每个option的文本添加province[i].name,给value添加成ID值
            document.getElementById('selectCity').options.add(new Option(city_city[i].name,city_city[i].CityID));
            // console.log(selectProvince.options);
        }
        // if(data.code=="param_incomplete"){
        //     alert("请选择您所在的城市");
        // }else{
        //     return;
        // }
    })
    sheng =parseInt(document.getElementById("selectProvince").options[document.getElementById("selectProvince").selectedIndex].value);
    sheng1=document.getElementById("selectProvince").options[document.getElementById("selectProvince").selectedIndex].innerHTML;
}
//区级联动菜单
document.getElementById("selectCity").onchange=function(){
    var selectArea=document.getElementById('selectarea');
    //每次省级菜单onchange时，都清空市级菜单里面的option，再加入onchange之后的市级菜单
    selectArea.options.length=0;
    selectArea.style.display="inline-block";
    //document.getElementById("selectCity").selectedIndex 获取select的下标
    //document.getElementById("selectCity").options  获取select下options的value 获取到的值是字符串
    //将字符串转为整数类型赋给abc
    var abc=parseInt(document.getElementById("selectCity").options[document.getElementById("selectCity").selectedIndex].value);
    //abc为选中市级ID CityID
    console.log(abc);
    // 获取市级
    ajaxXHR('GET',url+'nBmWNkg$9O/city/area?CityID='+abc,function(data){
        //给包裹select的div 追加一个select        
        var area_area=data.data.area;
        console.log(area_area);
        selectArea.add(new Option("——请选择——",0));
        for(var i=0;i<area_area.length;i++){            
            //给每个option的文本添加province[i].name,给value添加成ID值
            selectArea.options.add(new Option(area_area[i].DisName,area_area[i].Id));
            // console.log(selectProvince.options);
        }
        // if(data.code=="param_incomplete"){
        //     alert("请选择您所在的城市");
        // }else{
        //     return;
        // }
    })
    shi =parseInt(document.getElementById("selectCity").options[document.getElementById("selectCity").selectedIndex].value);
    shi1=document.getElementById("selectCity").options[document.getElementById("selectCity").selectedIndex].innerHTML;
}

//获取选中的区
document.getElementById('selectarea').onchange=function(){
    var abc=parseInt(document.getElementById("selectarea").options[document.getElementById("selectarea").selectedIndex].value);
    
    console.log(abc);
    qu=parseInt(document.getElementById("selectarea").options[document.getElementById("selectarea").selectedIndex].value);
    qu1=document.getElementById("selectarea").options[document.getElementById("selectarea").selectedIndex].innerHTML;
}

//上传用户资料
document.getElementById('SettingBtn').onclick=function(){
    //判断密码输入是否正确
    var upwd=document.querySelector('.userPwd').value;
    if(upwd==""){
        alert("请输入密码");
    }else if( upwd == localStorage.pwd){
        // var Readder=dataURItoBlob(Readder1);
        var choice="";
        // 获取用户选择的性别   *****需要在点击提交时候来判断用户选择
        var getSex = document.querySelectorAll('#create_user_sex_rig input');
        for(var j=0;j<getSex.length;j++){
            if(getSex[j].checked){
                choice=getSex[j].value;
                console.log("选择的性别为："+choice);
            }
        } 
        var formData=new FormData();
        var ssq=["["+sheng,shi,qu+"]"];//获取所选中的省市区
        var ssq2=sheng1+shi1;
        var uName=document.getElementById('uName').value;
        var token=localStorage.token;
        userName=uName;

        formData.append("token",token);
        formData.append("avatar",Readder1); 
        formData.append("gender",choice);
        formData.append("city",ssq);
        formData.append("constellation",xingzuo);
        formData.append("name",uName);
        postXHR('POST',url+'nBmWNkg$9O/account/profile',function(data){
            // var getSex = document.getElementById('create_user_sex_rig');      
            console.log(data);
            //保存用户信息
            localStorage.token=data.data.user.token;
            localStorage.avatar=data.data.user.avatar;
            localStorage.gender=choice;
            localStorage.name=data.data.user.name;
            localStorage.constellation=xingzuo;
            localStorage.city=ssq;
            localStorage.province=ssq2;
            window.location.href="ArticleList.html";
            
        },formData);
    }else{
        alert("密码错误");
        return false;
    }

}
