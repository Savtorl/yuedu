var url1="php/123.js";
var limit = 3;

window.onload=function(){
    users();
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
    loaduserArt(1);
    //监听滚动事件
    window.addEventListener('scroll',_.throttle(lazyLoad(),1000));
    //返回顶部按钮事件
    returnBtn();
    //图片懒加载 
    document.addEventListener('scroll', lazyPic);
}
//动态添加文章详情
function loadArticle(articles){
    //动态拼接文章详情
    var str='<div class="article_content clearfix">';
            str+='<a href="" class="article_img lf"><img src="images/timg.jpg" data-src="'+"https://dev.apis.sh/nBmWNkg$9O/static/"+articles[i].cover+'" style="width:100%;height:100%" class="cover"></a>';
            console.log("cover"+articles[i].cover);
            // str+='<a href="" class="article_img lf"><img src="" style="width:100%;height:100%"></a>';
            str+='<div class="article_subject gt">';
                str+='<a data-id="'+articles[i]._id+'" onclick="localStorage.title_id = this.dataset.id;" href="articleDetails.html">';
                str+='<div class="article_subject_title">'+articles[i].title+'</div>';
                str+='<div class="article_subject_main">'+articles[i].abstract+'</div></a>';
                str+='<div class="article_subject_bottom clearfix">';
                    str+='<div class="art_sub_btm_user lf"><a href="">';
                    str+='<img src="'+"https://dev.apis.sh/nBmWNkg$9O/static/"+articles[i].author.avatar+'" class="userhead"><span>'+articles[i].author.name+'</span></a>';
                    // str+='<img src="" class="userhead"><span>'+articles[i].author.name+'</span></a>';
                        str+='<span class="pubdate">'+moment(articles[i].create_time).format('YYYY-MM-DD HH:mm')+'<span></div>';
                    str+='<div class="art_sub_btm_views gt">';
                        str+='<span><a href=""><img src="images/icon_thumb_up.png"></a>'+articles[i].praise_sum+'</span>';
                    str+='<span><a href=""><img src="images/icon_saw.png"></a>'+articles[i].look_sum+'</span></div></div></div></div>';
    document.querySelector('#BigDiv').insertAdjacentHTML('beforeend',str);   
}
//动态添加用户个人信息  
function users(){
    var str="";
    if(localStorage.gender=="woman"){
        authorSex="images/icon_girl.png";
    }else{
        authorSex="images/icon_boy.png";
    }
    str+='<div class="userHead_center" id="userMsg">';
        str+='<a ><img src="'+url_file+localStorage.avatar+'" style="width:100%;height:100%"></a><img src="'+authorSex+'" class="sex"></div>';
    str+='<p class="userName">'+localStorage.name+'</p>';
    str+='<h6>'+localStorage.province+'&nbsp&nbsp&nbsp&nbsp'+localStorage.constellation+'</h6>';
    document.getElementById("per_bg_center").insertAdjacentHTML('afterbegin',str);
}


var articlesCound="";

function loaduserArt(page){
    var imgs = document.getElementsByClassName('cover');

    ajaxXHR('GET',url+"nBmWNkg$9O/posts/list?page="+page+"&limit="+limit+"&user="+localStorage.userId,function(data){
        var articles=data.data.articles;
        if(data.code=="SUCCESS"){    
            page++;        
            console.log(articles);
            document.querySelector('.list_sum').innerHTML=data.count;
            articlesCound=data.count;
            console.log(data);
            console.log(data.data);
            for(i=0;i<articles.length;i++){
                loadArticle(articles);
                console.log("文章id"+articles[i]._id);
                console.log("文章标题"+articles[i].title);
                console.log("文章图片"+articles[i].cover);
                console.log("发表时间"+articles[i].create_time);
                console.log("文章内容"+articles[i].abstract);
                console.log("------------------------");
            }
        }
    })
}
//懒加载
function lazyLoad(){
    var page=2;
    return function(){
        if(loading.getBoundingClientRect().top+loading.offsetHeight<document.documentElement.clientHeight){
            loaduserArt(page++);
        }
    }
}