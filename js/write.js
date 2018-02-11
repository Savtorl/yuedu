var fileInput = document.getElementById('fileHide');
var previewImg = document.getElementById('preview');
var fileImg = document.getElementById('fileImg');
var preview = document.getElementById('preview');
var Readder1="";
fileInput.addEventListener('change', function () {
    fileImg.parentElement.className="wzWithpic";
    // fileImg.innerHTML+="更换图片";
    var div=document.createElement("div");
    div.className += 'changePic';
    var parent=document.getElementsByClassName('wzWithpic');
    var child=document.querySelector('.changePic');
    // console.log(child);

    //若child不等于null， 则移除thie.parentNode下的child ，  否则null
    child != null ? this.parentNode.removeChild(child) : null;
    // document.querySelector(".uploading").removeChild(document.querySelector('.changePic'));
    //之前没有删除掉div是因为没有正确的选择到parent与child之间的关系 this="#fileHide"时，child=".changePic"与this是平级关系，应先用this找与child的共同上一级父节点，然后再通过父节点的removeChild移除child

    // var el = document.querySelector(".uploading");
    // el.parentNode.removeChild(document.querySelector('.changePic'));

    div.innerHTML="更换图片";
    fileImg.appendChild(div);
    preview.setAttribute("width","100%");
    var file = this.files[0];
    // 获取文件读取对象
    var reader = new FileReader();
    // 文件读取完后的展示图片
    var fileBtn=document.getElementById('fileHide').files[0];
    // console.log(fileBtn);
    var arr_files=["image/jpg","image/png","image/jpeg"];

    
    if(arr_files.indexOf(fileBtn.type) == -1){
        alert('此文件格式不支持');
        return;
    }
    reader.addEventListener('load', function () {
        if(file.size>1*1024*1024){
            alert("上传图片大小不得超过1M");
        }else{
            previewImg.src = reader.result;
            Readder1=file;
        }
    }, false);
    reader.readAsDataURL(file);
}, false);
// document.getElementById("fileHide").onclick=function(e){
 
// };


document.getElementById('publish').onclick=function(){
    var fileBtn=document.getElementById('fileHide').files[0];
    var writeTitle=document.getElementById('write-title').value;
    var writeArea=document.getElementById('writeArea').value;
    var token=localStorage.token;
    var formData=new FormData();
    formData.append("token",token);
    formData.append("title",writeTitle);
    formData.append("pic",Readder1);
    formData.append("body",document.getElementById('writeArea').value);
    formdataXHR('POST',url+'nBmWNkg$9O/posts/add',function(data){
        if(data.code=="SUCCESS"){
            alert("发表成功,点击跳转");
            console.log(writeArea);
            // window.location.href="ArticleList.html";
        }else if(data.code=="param_incomplete"){
            alert("请检查图片是否上传，标题内容是否填写");
        }else if(data.code=="article_has_exist"){
            alert("文章标题已存在，请重新输入");
        }else if(data.code=="account_token_invalid"){
            alert("身份已失效，请重新登录")
        }
    },formData);
}

window.onload=function(){
    // 获取用户登录信息
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
}