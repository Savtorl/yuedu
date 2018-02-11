//动态添加文章详情
function fill(fillMsg){
    //动态拼接文章详情
    var str='<div class="details_title" id="article_title">'+fillMsg.title;
            str+='<div id="wechatClick" onclick="clickWechat()">';
            str+='<img class="share" src="images/icon_share.png"><span>分享</span>';
            str+='<div class="QR-code" style="display:none">使用微信扫一扫';
            str+='<img src="images/wechat.jpeg" class="weChat"></div></div></div>';  
        str+='<div class="user_details">';
            str+='<a data-author_id='+localStorage.author_id+' data-author_name='+localStorage.author_name+' data-author_gender='+localStorage.author_gender+' data-author_avatar='+localStorage.author_avatar+' data-author_xingzuo='+localStorage.author_xingzuo+' data-author_city='+localStorage.author_city+' onclick="localStorage.author_id=this.dataset.author_id;localStorage.author_name=this.dataset.author_name;localStorage.author_gender=this.dataset.author_gender;localStorage.author_avatar=this.dataset.author_avatar;localStorage.author_xingzuo=this.dataset.author_xingzuo;localStorage.author_city=this.dataset.author_city;"  href="userProfiles-other.html">';
            str+='<img src="'+"https://dev.apis.sh/nBmWNkg$9O/static/"+fillMsg.author.avatar+'" class="user_head">'+fillMsg.author.name+'</a>';
            // str+='<img src="images/3.jpg" class="user_head">'+fillMsg.author.name+'</a>';
            str+='<span>'+moment(fillMsg.create_time).format('YYYY-MM-DD HH:mm')+'</span>';
            str+='<div class="art_sub_btm_views">';
            str+='<span><a><img src="images/icon_thumb_up_like.png"></a>'+fillMsg.praise_sum+'</span>';
            str+='<span><a><img src="images/icon_saw.png"></a>'+fillMsg.look_sum+'</span></div></div>';  
        str+='<div class="details_bg"><img src="'+"https://dev.apis.sh/nBmWNkg$9O/static/"+fillMsg.pic+'" style="width:100%;height:100%"></div>';  
        // str+='<div class="details_bg"><img src="images/didi.png" style="width:100%;height:100%"></div>';  
        str+='<div class="details_txt">'+fillMsg.body+'</div>';

    document.querySelector('.wenzhang').insertAdjacentHTML('afterbegin',str);    
    
}
//动态添加评论列表
function comment(abc,i){
    //将发表时间戳转换为正常格式
    var timestamp=abc[i].create_time;
    var newDate=new Date();
    newDate.setTime(timestamp);
    var time = newDate.toLocaleString();
    var str='<div class="review-content">';
        str+='<div class="art_sub_btm_user">';
        //   str+='<a><img src="'+"http://dev.apis.sh/nBmWNkg$9O/static/"+abc[i].author.avatar+'" class="userhead">';
          str+='<a data-reviews_id='+abc[i].id+' data-reviews_name='+abc[i].author.name+' data-reviews_gender='+abc[i].author.avatar+' onclick="localStorage.reviews_id=this.dataset.reviews_id; localStorage.reviews_name=this.dataset.reviews_name;localStorage.reviews_gender=this.dataset.reviews_gender;" href="userPorfiles-other.html"><img src="'+"http://dev.apis.sh/nBmWNkg$9O/static/"+abc[i].author.avatar+'" class="userhead">';
          str+='<span>'+abc[i].author.name+'</span></a>';
          str+='<span class="pubdate">'+moment(abc[i].create_time).format('YYYY-MM-DD HH:mm')+'</span>';
          str+='<a class="praise"><img src="images/icon_thumb_up_like.png" class="star"></a>'+abc[i].praise_sum+'</div>'; 
        str+='<div class="review-txt">'+abc[i].body+'</div></div>';

    document.querySelector('.review').insertAdjacentHTML('afterbegin',str);
}

//点击分享出现微信二维码
function clickWechat(){
    document.getElementById("wechatClick").onclick=function(event){
        var QRcode=document.querySelector(".QR-code");
        QRcode.style.display=QRcode.style.display=="block"?"none":"block";
        //阻止事件冒泡
        (event || window.event).cancelBubble = true
    }
    document.onclick=function(){
        document.querySelector(".QR-code").style.display="none";
    }
}

var articleID="";
window.onload=function(){
    var url4=url+"nBmWNkg$9O/posts/details?id="+localStorage.title_id;
    //window.onload获取文章详情
    ajaxXHR('GET',url4,function(data){
        var fillMsg=data.data.article;
        console.log(fillMsg);
        console.log("文章详情数据："+data);
        console.log("文章id:"+fillMsg._id);
        articleID=fillMsg._id;
        if(data.code=="SUCCESS"){
            fill(fillMsg);
            console.log(fillMsg);
        }
    })
    var url5=url+"nBmWNkg$9O/comment/list?page=1"+"&limit=5"+"&article="+localStorage.title_id;
    //获取评论列表
    ajaxXHR('GET',url5,function(data){
        console.log(data);  
        var abc=data.data.comments;
        if(data.code=="SUCCESS"){
            for(var i=0;i<abc.length;i++){
                console.log(abc[i]);
                comment(abc,i);
            }
        }
    })
}

// 获取用户登录信息 有用
if(localStorage.token !=undefined){
    document.querySelector(".user").style.display="inline-block";
    document.querySelector(".not_login").style.display="none";
    document.getElementsByClassName('userName')[0].textContent = localStorage.name;
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

//发表评论
document.getElementById("comment").onclick=function(){
    var areatxt=document.getElementById("areatxt").value;
    var art_title=document.getElementById("article_title");
    console.log("文章id:"+articleID);
    var articleId=articleID;
    var token=localStorage.token;
//文章ID
//var articleId=localStorage.id;
    ajaxXHR('POST',url+'nBmWNkg$9O/comment/add',function(data){
        if(data.code=="SUCCESS"){
            alert(data.message);
        }else if(data.code=="param_incomplete"){
            console.log(data.message);
            alert("请输入评论内容");
        }else if(data.code=="article_not_found"){            
            console.log(data.message);
            alert("文章不存在");
        }else if(data.code=="account_token_invalid"){
            alert(data.message);
        }
    },"token="+token+"&body="+areatxt+"&article="+articleId);
}




