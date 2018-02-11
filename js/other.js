var page = 1;
var limit = 3;
var user = localStorage.author_id;
window.onload=function(){
    //获取用户资料
    if(localStorage.token !=undefined){
        document.querySelector(".user").style.display="inline-block";
        document.querySelector(".not_login").style.display="none";
        document.getElementsByClassName('userName')[0].textContent = localStorage.name;
        var avatar= document.getElementsByClassName('userHead');
        //获取用户修改后的头像
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
    other();
    ajaxXHR('GET',url+"nBmWNkg$9O/posts/list?page="+page+"&limit="+limit+"&user="+user,function(data){
        var articles=data.data.articles;
        if(data.code=="SUCCESS"){
            // console.log(articles);
            document.querySelector('.list_sum').innerHTML=data.count;
            console.log(data);
            for(i=0;i<articles.length;i++){
                art(articles);
            }
        }
    })
}
//动态添加文章详情  作者头像需要修改<img src="images/3.jpg">
function art(articles){
    //将发表时间戳转换为正常格式
    // var timestamp=articles[i].create_time;
    // var newDate=new Date();
    // newDate.setTime(timestamp);
    // var time = newDate.toLocaleString();
    //动态拼接文章详情
    var str='<div class="article_content clearfix">';
            // str+='<a href="" class="article_img lf"><img src="'+"https://dev.apis.sh/nBmWNkg$9O/static/"+articles[i].cover+'" style="width:100%;height:100%"></a>';
            str+='<a href="" class="article_img lf"><img src="" style="width:100%;height:100%"></a>';
            str+='<div class="article_subject gt">';
                str+='<a data-id="'+articles[i]._id+'" onclick="localStorage.title_id = this.dataset.id;" href="articleDetails.html">';
                str+='<div class="article_subject_title">'+articles[i].title+'</div>';
                str+='<div class="article_subject_main">'+articles[i].abstract+'</div></a>';
                str+='<div class="article_subject_bottom clearfix">';
                    str+='<div class="art_sub_btm_user lf"><a href="">';
                        str+='<img src="" class="userhead"><span>'+articles[i].author.name+'</span></a>';
                        // str+='<img src="'+"https://dev.apis.sh/nBmWNkg$9O/static/"+articles[i].author.avatar+'" class="userhead"><span>'+articles[i].author.name+'</span></a>';
                        str+='<span class="pubdate">'+moment(articles[i].create_time).format('YYYY-MM-DD HH:mm')+'<span></div>';
                    str+='<div class="art_sub_btm_views gt">';
                        str+='<span><a href=""><img src="images/icon_thumb_up.png"></a>'+articles[i].praise_sum+'</span>';
                    str+='<span><a href=""><img src="images/icon_saw.png"></a>'+articles[i].look_sum+'</span></div></div></div></div>';
    document.querySelector('#BigDiv').insertAdjacentHTML('afterbegin',str);   
}
//动态添加作者信息  
function other(){
    var str="";
    if(localStorage.author_gender=="woman"){
        authorSex="images/icon_girl.png";
    }else{
        authorSex="images/icon_boy.png";
    }
    str+='<div class="userHead_center" id="otherProfiles">';
        str+='<a href=""><img src="'+url_file+localStorage.author_avatar+'" style="width:100%;height:100%"></a><img src="'+authorSex+'" class="sex"></div>';
    str+='<p class="userName">'+localStorage.author_name+'</p>';
    str+='<h6>'+localStorage.author_city+'&nbsp&nbsp&nbsp&nbsp'+localStorage.author_xingzuo+'</h6>';
    document.getElementById("per_bg_center").insertAdjacentHTML('afterbegin',str);       
}