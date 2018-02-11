var fileInput = document.getElementById('fileHide');
var previewImg = document.getElementById('preview');
var fileImg = document.getElementById('fileImg'); 
var labels = document.getElementById('create_user_sex_rig').getElementsByTagName('label');
var radios = document.getElementById('create_user_sex_rig').getElementsByTagName('input');
var i,j,k,l;
//性别单选按钮
for(i=0,j=labels.length ; i<j ; i++) {
    labels[i].onclick = function () {
        if (this.className == '') {
            for (k = 0, l = labels.length; k < l; k++) {
                labels[k].className = '';
                radios[k].checked = false;
            }
            this.className = 'checked';     
            try {
                document.getElementById(this.name).checked = true;
            } catch (e){

            }
        }
    }
};
var Readder1="";
fileInput.addEventListener('change', function () {
    var file = this.files[0];    
    // 获取文件读取对象
    var reader = new FileReader();
    // 文件读取完后的展示图片
    reader.addEventListener('load', function () {
        if(file.size>3*1024*1024){
            alert("上传图片大小不得超过3M");
        }else{
            previewImg.src = reader.result;
            Readder1=file;            
            // dataURItoBlob(Readder1);
        }
    }, false);
    reader.readAsDataURL(file);
}, false);

// function dataURItoBlob(dataURI) {
//     var byteString = atob(dataURI.split(',')[1]);
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//     var ab = new ArrayBuffer(byteString.length);
//     var ia = new Uint8Array(ab);
//     for (var i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], {type: mimeString});
// }
   