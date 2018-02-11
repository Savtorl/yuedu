var url1="php/123.js";
//打印出用户昵称
console.log("用户昵称为:"+localStorage.name);
// 瀑布流 当我们对列表类的接口请求时，不会一次性请求所有数据，而是分页请求
// 获取加载中元素
var loading = document.getElementsByClassName('loading')[0];
// getBoundingClientRect用于获取某个元素相对于视窗的位置 .bottom 元素下边到视窗上边的距离 .left 元素左边到视窗左边的距离 .right元素右边到视窗右边的距离 .top元素上边到视窗上边的距离
// getBoundingClientRect().top指元素顶端距离浏览器窗口顶部的距离。 这里指"正在加载"距离浏览器窗口顶部的距离
// offse tHeight指元素的高度。
// document.body.clientHeight指文档body的高度。
// loading.getBoundingClientRect().bottom+loading.offsetHeight<document.body.clientHeigh说明元素位于窗口之中
//懒加载
function lazyLoad(){
    var page=2;
    return function(){
        var loading=document.querySelector('.loading');
        if(loading.getBoundingClientRect().top+loading.offsetHeight<document.documentElement.clientHeight){
            //loadArticle
            loadArticle(page++);
        }
    }
}

function loadArticle(page){
    //获取文章列表内容
        // ajaxXHR('GET',url+'nBmWNkg$9O/posts/list?page='+page+'&limit=4',function(data){
        ajaxXHR('GET',url1,function(data){
            //获取每一块列表的div
            // var Div=document.getElementsByClassName('article_content');    
            //获取列表中的细节
            var title=document.querySelector('.article_subject_title');
            var main=document.querySelector('.article_subject_main');
            var authorImg=document.querySelector('.authorhead');
            var authorName=document.getElementsByClassName('authorName');
            var praise=document.getElementsByClassName('praise');
            var look_sum=document.getElementsByClassName('look');
            //动态生成列表
            if(data.code=="SUCCESS"){            
                // console.log(data.data); console.log(data.data.articles); 
                page++;
                var articles=data.data.articles;
                console.log(data);
                // console.log(data.data.articles.length);
                for(var i=0;i<5;i++){ //**还需要将5改成articles.length */
                        var aCover=articles[i].cover;         //左侧大图
                        var aTitle=articles[i].title;         //文章标题
                        var aAbstract=articles[i].abstract;   //文章主体
                        var aAuthorImg=articles[i].author.avatar;//作者头像
                        var aAuthorName=articles[i].author.name;//作者名
                        var aAuthorSex=articles[i].author.gender;//作者性别
                        var aAuthorConstellations=articles[i].author.constellations;//作者星座
                        var aAuthorCity=articles[i].author.city;//作者城市
                        var aAuthorId=articles[i].author._id; //作者ID
                        var aCreate=articles[i].create_time;  //发表日期
                        var aPraise=articles[i].praise_sum;   //点赞量
                        var aLook=articles[i].look_sum;       //浏览量
                        var aArticlesId=articles[i]._id;      //文章ID
                        var aAuthor=articles[i].author;       //作者信息
                        var tiaochu="";
                        if(aCover === undefined||aTitle === undefined||aAbstract === undefined||aAuthorImg === undefined||aAuthorName === undefined||aAuthorSex === undefined||aAuthorConstellations === undefined||aAuthorCity === undefined||aAuthorId === undefined||aCreate === undefined||aPraise === undefined||aLook === undefined||aArticlesId === undefined||aAuthor===undefined){
                            //显示出有问题的数据所在的位置
                            console.log(i);
                            tiaochu=i;
                        }
                        if(i==tiaochu){
                            // continue;
                        }
                        // //判断返回数据是否完整
                        // console.log(articles[i].abstract);
                        // console.log(articles[i].cover);
                        // console.log(articles[i].create_time);
                        // console.log(articles[i].look_sum);
                        // console.log(articles[i].praise_sum);
                        // console.log(articles[i].title);
                        // console.log(articles[i]._id);
                        // console.log(articles[i].author.avatar);
                        // console.log(articles[i].author.city);
                        // console.log(articles[i].author.constellations);
                        // console.log(articles[i].author.gender);
                        // console.log(articles[i].author.name);
                        // console.log(articles[i].author._id);

                    //将发表时间戳转换为正常格式
                    var newDate=new Date();
                    newDate.setTime(aCreate);
                    var time = newDate.toLocaleString();
                    //动态拼接文章详情
                    var str='<div class="article_content clearfix">';
                    str+='<a href="" class="article_img lf">';
                    // str+='<img src="images/timg.gif" data-src="'+"https://dev.apis.sh/nBmWNkg$9O/static/"+aCover+'" style="width:100%;height:100%" class="cover"></a>';
                    str+='<img src="images/timg.gif" data-src="images/1.jpg" style="width:100%;height:100%" class="cover"></a>';
                    str+='<div class="article_subject gt">';
                    str+='<a data-id="'+aArticlesId+'" onclick="localStorage.title_id = this.dataset.id;" href="articleDetails.html">';
                    str+='<div class="article_subject_title">'+aTitle+'</div>';
                    str+='<div class="article_subject_main">'+aAbstract+'</div></a>';
                    str+='<div class="article_subject_bottom clearfix">';
                        str+='<div class="art_sub_btm_user lf">';
                        str+='<a data-author_id='+aAuthorId+' data-author_name='+aAuthorName+' data-author_gender='+aAuthorSex+' data-author_avatar='+aAuthorImg+' data-author_xingzuo='+aAuthorConstellations+' data-author_city='+aAuthorCity+' onclick="localStorage.author_id=this.dataset.author_id;localStorage.author_name=this.dataset.author_name;localStorage.author_gender=this.dataset.author_gender;localStorage.author_avatar=this.dataset.author_avatar;localStorage.author_xingzuo=this.dataset.author_xingzuo;localStorage.author_city=this.dataset.author_city;"  href="userProfiles-other.html">';
                            // str+='<img src="'+"https://dev.apis.sh/nBmWNkg$9O/static/"+aAuthorImg+'" class="userhead"></a><span>'+aAuthorName+'</span>';
                            str+='<img src="" class="userhead"><span>'+aAuthorName+'</span></a>';
                                // str+='<span class="pubdate">'+time+'<span></div>';
                                str+='<span class="pubdate">'+moment(aCreate).format('YYYY-MM-DD HH:mm')+'<span></div>';
                            str+='<div class="art_sub_btm_views gt">';
                                str+='<span><a href=""><img src="images/icon_thumb_up.png"></a>'+aPraise+'</span>';
                            str+='<span><a href=""><img src="images/icon_saw.png"></a>'+aLook+'</span></div></div></div></div>';
                    document.getElementById("BigDiv").innerHTML+=str;
                    lazyPic ();
                }          
                
                console.log("第"+page+"页");
                
            }
            
        })
       
    }

window.onload=function(){    
    // 获取用户资料 有用
    // if(localStorage.token !=undefined){
    //     document.querySelector(".user").style.display="inline-block";
    //     document.querySelector(".not_login").style.display="none";
    //     document.getElementsByClassName('userName')[0].textContent = localStorage.name;
    //     var avatar= document.getElementsByClassName('userHead');
    //     document.getElementsByClassName('userHead')[0].src = url_file+localStorage.avatar;
    //     //获取用户修改后的头像
    //     // 图片填充(接口返回的图片地址需要前加上服务器地址，如果图片带有http则不需要拼接。)
    //     // 判断图片地址是否含有http
    //     // if (avatar.indexOf('http') === -1) {
    //     //     // indexOf用于判断字符串是否还有指定字段，如果没有则返回-1
    //     //     document.getElementsByClassName('userHead')[0].src = 'http://localhost:8080/nBmWNkg$9O/'+ avatar;
    //     //  } else {
    //     //     document.getElementsByClassName('userHead')[0].src = avatar;
    //     //  }        
    // }else{
    //     document.querySelector(".not_login").style.display="inline-block";
    //     document.querySelector(".user").style.display="none";
    // };
    //动态添加文章列表
    loadArticle(1);
    
    //监听滚动事件
    window.addEventListener('scroll',_.throttle(lazyLoad(),1000));
    //返回顶部按钮事件
    returnBtn();
    //图片懒加载 
    document.addEventListener('scroll', lazyPic);
    //图片预加载
    document.addEventListener('scroll', preLoadImg);
    /**
     * 预加载图片函数封装
     * @param {String} img 请求图片地址
     * @param {String} id 需要填充图片id
     */
    // function preLoadImg(img,id){
    //     var tmpImg = new Image();
    //     // 图片加载成功后，替换临时图片。
    //     tmpImg.onload = function(){
    //         document.getElementById(id).src = tmpImg.src
    //     }
    //     // 加载失败。
    //     tmpImg.onerror = function(){
    //         var error = 'images/timg.gif' // 此处为错误图片地址，用户自行修改
    //     document.getElementById(id).src = error
    //     }
    //     // 预加载图片(接口返回的图片地址需要前加上服务器地址)。
    //         tmpImg.src = 'https://dev.apis.sh/nBmWNkg$9O/static/'+ img;
    // }
}

//返回按钮函数
function returnBtn(){
    //获取页面可视区高度
    var clientHeight = document.documentElement.clientHeight;
    //正在加载 距离页面顶部高度
    var addLoading=loading.getBoundingClientRect().bottom+loading.offsetHeight;
  //   console.log("1'正在加载'底部到视窗顶部的距离:"+addLoading);  
  //   console.log("2视窗的距离:"+clientHeight);
  
    if (loading.getBoundingClientRect().bottom+loading.offsetHeight+20<document.documentElement.clientHeight) {
        console.log("'正在加载'底部到视窗顶部的距离:"+addLoading);
        console.log("视窗的距离:"+clientHeight);
      // 当正在加载图标出现在视窗中时，请求下一页文章列表。
      // 请求文章列表接口。
  
      //设置返回按钮事件 
      var clientHeight = document.documentElement.clientHeight;
          //返回顶部按钮
          var btn = document.getElementById('backTop');
          var timer = null;
          var isTop = true;
          //滚动条滚动时触发
          window.onscroll = function() {
          
          //获取页面卷起高度
          var osTop = document.documentElement.scrollTop || document.body.scrollTop;
          //显示回到顶部按钮
          if (osTop >= clientHeight) {
              btn.style.display = "block";
          } else {
              btn.style.display = "none";
          };
          //**回到顶部过程中用户滚动滚动条，停止定时器 
          if (!isTop) {
              clearInterval(timer);
              //   console.log("当回到顶部过程中用户滚动滚动条时，isTop为"+isTop); //false
          };
              isTop = false;               
          };     
          //返回按钮点击事件
          btn.onclick = function() {
              //设置定时器
              timer = setInterval(function(){
                  //获取滚动条距离顶部高度
                  var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                //   console.log('滚动条距离顶部高度 '+osTop);
                  //创建一条滚动条距离顶部高度为负数的数据 
                  //当点击返回顶部按钮时，用卷起距离 + 为负的卷起距离
                  //为负的卷起距离除以一个数 除数越小 为负的卷起距离越接近于卷起距离 滚动条速度越快
                  var ispeed = Math.floor(-osTop / 7);
                //   console.log('ispeed '+ispeed);
                  document.documentElement.scrollTop = document.body.scrollTop = osTop+ispeed;
                  //到达顶部，清除定时器
                  if (osTop == 0) {
                  clearInterval(timer);
                  };
                  isTop = true;
              },30);      
          };    
      }
  }


//图片懒加载
function lazyPic () {
    // 获取所有img
    // console.log("开始执行图片懒加载");
    var imgs = document.getElementsByClassName('cover');
    // 循环所有图片
    for (var i=0; i<imgs.length; i++){
        // console.log("函数执行开始");
        // 图片请求后不再执行该函数
        var img = imgs[i];
        if (img.dataset.src === '') continue;  
        // getBoundingClientRect().top指元素距离浏览器窗口顶部的距离。
        // offsetHeight指元素的高度。
        // document.body.clientHeight指文档body的高度。
        // img.getBoundingClientRect().top + img.offsetHeight < document.body.clientHeigh说明元素位于浏览器窗口之中
        if (img.getBoundingClientRect().bottom + img.offsetHeight < document.body.clientHeight) {
          // 当图片出现在视窗中时，请求该图片。
        //   console.log("函数执行");
        //   var tmpImg = new Image();
        //   tmpImg.onload = function () {
            // img.src = tmpImg.src;
            preLoadImg(img);
            img.src=img.dataset.src;
        //   }
        //   // 通过dataset获取图片的真实地址
        //   tmpImg.src = img.dataset.src;
        //   // 清空自定义数据，之后在执行函数时避免重复请求。
          img.className=img.className.replace('cover','');
        }
    }
    // console.log("懒加载结束");
  }
//图片预加载
function preLoadImg(img){
    var tmpImg = new Image();
    // 预加载图片(接口返回的图片地址需要前加上服务器地址)。
        // tmpImg.src = 'https://dev.apis.sh/nBmWNkg$9O/static/'+ img.dataset.src;
        tmpImg.src='images/1.jpg';
    // 图片加载成功后，替换临时图片。
    tmpImg.onload = function(){
        img.src = tmpImg.src
    }
    // 加载失败。
    tmpImg.onerror = function(){
        var error = 'images/error.jpg' // 此处为错误图片地址，用户自行修改
        img.src = error;
    }
}