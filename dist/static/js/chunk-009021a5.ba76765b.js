(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-009021a5"],{3808:function(e,t,o){},"454f":function(e,t,o){o("46a7");var a=o("584a").Object;e.exports=function(e,t,o){return a.defineProperty(e,t,o)}},"46a7":function(e,t,o){var a=o("63b6");a(a.S+a.F*!o("8e60"),"Object",{defineProperty:o("d9f6").f})},"85f2":function(e,t,o){e.exports=o("454f")},"8dfc":function(e,t,o){"use strict";var a=o("3808"),s=o.n(a);s.a},e72a:function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"crumbs"},[o("el-breadcrumb",{attrs:{separator:"/"}},[o("el-breadcrumb-item",[o("i",{staticClass:"el-icon-lx-people"}),e._v(" 个人信息\n            ")])],1)],1),o("div",{staticClass:"container"},[o("div",{staticClass:"form-box"},[o("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"头像"}},[o("div",{staticClass:"crop-demo"},[o("img",{staticClass:"pre-img",attrs:{src:e.cropImg}}),o("div",{staticClass:"crop-demo-btn"},[e._v("选择图片\n                            "),o("input",{staticClass:"crop-input",attrs:{type:"file",name:"image",accept:"image/*"},on:{change:e.setImage}})])])]),o("el-dialog",{attrs:{title:"裁剪图片",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[o("vue-cropper",{ref:"cropper",staticStyle:{width:"100%",height:"300px"},attrs:{src:e.imgSrc,ready:e.cropImage,zoom:e.cropImage,cropmove:e.cropImage}}),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:e.cancelCrop}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)],1),o("el-form-item",{attrs:{label:"昵称"}},[o("el-input",{model:{value:e.form.nickName,callback:function(t){e.$set(e.form,"nickName",t)},expression:"form.nickName"}})],1),o("el-form-item",{attrs:{label:"地区"}},[o("el-cascader",{attrs:{options:e.options},on:{change:e.handleAreaChange},model:{value:e.form.regions,callback:function(t){e.$set(e.form,"regions",t)},expression:"form.regions"}})],1),o("el-form-item",{attrs:{label:"技能一"}},[o("el-row",[o("el-col",{attrs:{span:6}},[o("el-input",{model:{value:e.form.skillName1,callback:function(t){e.$set(e.form,"skillName1",t)},expression:"form.skillName1"}})],1),o("el-col",{staticStyle:{"margin-left":"20px"},attrs:{span:10}},[o("el-slider",{model:{value:e.form.skillPower1,callback:function(t){e.$set(e.form,"skillPower1",t)},expression:"form.skillPower1"}})],1)],1)],1),o("el-form-item",{attrs:{label:"技能二"}},[o("el-row",[o("el-col",{attrs:{span:6}},[o("el-input",{model:{value:e.form.skillName2,callback:function(t){e.$set(e.form,"skillName2",t)},expression:"form.skillName2"}})],1),o("el-col",{staticStyle:{"margin-left":"20px"},attrs:{span:10}},[o("el-slider",{model:{value:e.form.skillPower2,callback:function(t){e.$set(e.form,"skillPower2",t)},expression:"form.skillPower2"}})],1)],1)],1),o("el-form-item",{attrs:{label:"技能三"}},[o("el-row",[o("el-col",{attrs:{span:6}},[o("el-input",{model:{value:e.form.skillName3,callback:function(t){e.$set(e.form,"skillName3",t)},expression:"form.skillName3"}})],1),o("el-col",{staticStyle:{"margin-left":"20px"},attrs:{span:10}},[o("el-slider",{model:{value:e.form.skillPower3,callback:function(t){e.$set(e.form,"skillPower3",t)},expression:"form.skillPower3"}})],1)],1)],1),o("el-form-item",{attrs:{label:"技能四"}},[o("el-row",[o("el-col",{attrs:{span:6}},[o("el-input",{model:{value:e.form.skillName4,callback:function(t){e.$set(e.form,"skillName4",t)},expression:"form.skillName4"}})],1),o("el-col",{staticStyle:{"margin-left":"20px"},attrs:{span:10}},[o("el-slider",{model:{value:e.form.skillPower4,callback:function(t){e.$set(e.form,"skillPower4",t)},expression:"form.skillPower4"}})],1)],1)],1),o("el-form-item",{attrs:{label:"上传视频",prop:"Video"}},[o("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.requestUrl,"on-progress":e.uploadVideoProcess,"on-success":e.handleVideoSuccess,"before-upload":e.beforeUploadVideo,"show-file-list":!1}},[""==e.videoForm.showVideoPath||e.videoFlag?""!=e.videoForm.showVideoPath||e.videoFlag?e._e():o("i",{staticClass:"el-icon-plus avatar-uploader-icon"}):o("video",{staticClass:"avatar video-avatar",attrs:{src:e.videoForm.showVideoPath,controls:"controls"}},[e._v("\n                            您的浏览器不支持视频播放\n                        ")]),1==e.videoFlag?o("el-progress",{staticStyle:{"margin-top":"7px"},attrs:{type:"circle",percentage:e.videoUploadPercent}}):e._e()],1),o("P",{staticClass:"text"},[e._v("请保证视频格式正确")])],1),o("el-form-item",{attrs:{label:"上传图片"}},[o("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"https://jsonplaceholder.typicode.com/posts/","on-change":e.handleChange,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"file-list":e.fileList,"show-file-list":!1,multiple:"","auto-upload":!1}},[o("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("选取文件")]),o("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件")])],1),o("el-table",{staticClass:"table",attrs:{data:e.sourceTable,border:""}},[o("el-table-column",{attrs:{type:"index",width:"50",align:"center"}}),o("el-table-column",{attrs:{prop:"merchantPhoto",label:"图片/视频",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[o("img",{attrs:{src:e.row.merchantPhoto,alt:""}})]}}])}),o("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"text"},on:{click:function(o){return e.handleDeleteSource(t.$index,t.row)}}},[e._v("删除")]),o("el-button",{attrs:{type:"text"},on:{click:function(o){return e.sortUp(t.$index,t.row)}}},[e._v("上移")]),o("el-button",{attrs:{type:"text"},on:{click:function(o){return e.sortDown(t.$index,t.row)}}},[e._v("下移")])]}}])})],1)],1),o("el-form-item",{attrs:{label:"简介"}},[o("quill-editor",{ref:"myTextEditor",attrs:{options:e.editorOption1},model:{value:e.form.introduceMyself,callback:function(t){e.$set(e.form,"introduceMyself",t)},expression:"form.introduceMyself"}})],1),o("el-form-item",[o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:e.publicInfo}},[e._v("发布")]),o("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary"},on:{click:e.previewInfo}},[e._v("预览")])],1)],1)],1)])])},s=[],l=o("85f2"),i=o.n(l);function r(e,t,o){return t in e?i()(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o("a481"),o("6762"),o("2fdb"),o("7f7f"),o("28a5");var n,c=o("ef6c"),m=(o("a753"),o("8096"),o("14e1"),o("953d")),d=o("95c3"),f=o.n(d),u={name:"baseform",data:function(){return{form:{nickName:"",regions:[],introduceMyself:"",headImageReq:"",coverReq:"",skillName1:"",skillPower1:0,skillName2:"",skillPower2:0,skillName3:"",skillPower3:0,skillName4:"",skillPower4:0},merchantSkills:[],skillTable:[],sourceTable:[],formSkill:{skillName:"",skillPower:""},merchantIfo:"",videos:[],value2:"",skillModel:!1,fileList:[],requestUrl:"http://localhost:8202/merchant/upload",options:c["regionData"],editorOption1:{placeholder:"请输入简介"},defaultSrc:o("7159"),imgSrc:"",cropImg:"",dialogVisible:!1,videoFlag:!1,videoUploadPercent:"",isShowUploadVideo:!1,videoForm:{showVideoPath:""}}},created:function(){console.log(this.$route.query.flag),this.getData(),this.cropImg=this.defaultSrc},components:{quillEditor:m["quillEditor"],VueCropper:f.a},methods:(n={handleAreaChange:function(e){console.log(e)},getData:function(){var e=this,t=this,o={merchantGuid:localStorage.getItem("merchantGuid")};this.$http.get("/merchant/merinfo","application/json",o,(function(o){if(o.data){console.log(o,"--=c ");var a=e.$route.query.flag;if("edit"==a){if(t.cropImg=o.data.base_url+o.data.himg,t.form.nickName=o.data.nickname,o.data.regi){var s=o.data.regi.split(",");for(var l in s){var i=s[l];i&&t.form.regions.push(i)}}if(o.data.skill){var r=o.data.skill.split(",");if(r){var n=1;for(var l in r){i=r[l];if(i){var c=i.split(":");t.$set(t.form,"skillName"+n,c[0]),t.$set(t.form,"skillPower"+n,parseInt(c[1])),n++}}}}if(o.data.photos){var m=o.data.photos.split(",");for(var l in m){s=m[l];if(s){i=s.split(":");var d=i[0];i[1];t.sourceTable.push({merchantPhoto:o.data.base_url+d})}}}if(o.data.introduces){var f="http://api.zhubaba.cn/merchant/task/gmax/";f+=o.data.introduces,e.$http.get(f,"application/json",{},(function(t){console.log(t),e.form.introduceMyself=t}),(function(t){e.form.introduceMyself=t}))}}}}),(function(e){}))},setHeadImage:function(e){var t=this,o=e.target.files[0],a=new FileReader;a.readAsDataURL(o),a.onload=function(e){t.form.headImageReq=this.result}},setCoverReq:function(e){var t=this,o=e.target.files[0],a=new FileReader;a.readAsDataURL(o),a.onload=function(e){t.form.coverReq=this.result}},addInfo:function(){var e=this,t={merchantGuid:localStorage.getItem("merchantGuid"),headImageReq:this.form.headImageReq,nickName:this.form.nickName,coverReq:this.form.coverReq,introduceMyself:this.form.introduceMyself};this.$http.post("/merchant/addMerchantInfo","application/json",t,(function(t){t.data?(e.$message.success("提交成功"),e.getData()):e.$message({showClose:!0,message:t.msg,type:"error"})}),(function(t){e.$message({showClose:!0,message:t.msg,type:"error"})}))},addSkillsModel:function(){this.skillModel=!0},addSkills:function(){var e=this,t={merchantGuid:localStorage.getItem("merchantGuid"),skillName:this.formSkill.skillName,skillPower:this.formSkill.skillPower};this.$http.post("/merchant/addSkill","application/json",t,(function(t){t.data?(e.$message.success("提交成功"),e.getData(),e.skillModel=!1):e.$message({showClose:!0,message:t.msg,type:"error"})}),(function(t){e.$message({showClose:!0,message:t.msg,type:"error"})}))},handleDeleteSkill:function(e,t){var o=this,a={skillGuid:t.guid};this.$http.delete("/merchant/deleteSkill","application/json",a,(function(e){e.data?(o.$message.success("删除成功"),o.getData()):o.$message({showClose:!0,message:e.msg,type:"error"})}),(function(e){o.$message({showClose:!0,message:e.msg,type:"error"})}))},uploadSource:function(){},submitUpload:function(){this.$refs.upload.submit()},handleBeforeLoad:function(e){var t=this,o=new FileReader;o.readAsDataURL(e),o.onload=function(e){t.merchantIfo=this.result;var o={merchantGuid:localStorage.getItem("merchantGuid"),merchantAudioVideoData:t.merchantIfo};t.$http.post("/merchant/upload","application/json",o,(function(e){e.data?(t.$message.success("提交成功"),t.getData()):t.$message({showClose:!0,message:e.msg,type:"error"})}),(function(e){t.$message({showClose:!0,message:e.msg,type:"error"})}))}},handleDeleteSource:function(e,t){this.sourceTable.splice(e,1)},handleChange:function(e,t){console.log(e,t),console.log(this.fileList);var o=this,a=new FileReader;a.readAsDataURL(e.raw),a.onload=function(e){var t={merchantPhoto:this.result};o.sourceTable.length<5&&o.sourceTable.push(t)}},handleRemove:function(e,t){},handlePreview:function(e){}},r(n,"handleRemove",(function(e,t){})),r(n,"handlePreview",(function(e){})),r(n,"handleExceed",(function(e,t){this.$message.warning("当前限制选择 3 个文件，本次选择了 ".concat(e.length," 个文件，共选择了 ").concat(e.length+t.length," 个文件"))})),r(n,"beforeRemove",(function(e,t){return this.$confirm("确定移除 ".concat(e.name,"？"))})),r(n,"setImage",(function(e){var t=this,o=e.target.files[0];if(o.type.includes("image/")){var a=new FileReader;a.onload=function(e){t.dialogVisible=!0,t.imgSrc=e.target.result,t.$refs.cropper&&t.$refs.cropper.replace(e.target.result)},a.readAsDataURL(o)}})),r(n,"cropImage",(function(){this.cropImg=this.$refs.cropper.getCroppedCanvas().toDataURL()})),r(n,"cancelCrop",(function(){this.dialogVisible=!1,this.cropImg=this.defaultSrc})),r(n,"beforeUploadVideo",(function(e){var t=e.size/1024/1024<50;return-1==["video/mp4","video/ogg","video/flv","video/avi","video/wmv","video/rmvb","video/mov"].indexOf(e.type)?(layer.msg("请上传正确的视频格式"),!1):t?void(this.isShowUploadVideo=!1):(layer.msg("视频大小不能超过50MB"),!1)})),r(n,"uploadVideoProcess",(function(e,t,o){this.videoFlag=!0,this.videoUploadPercent=1*t.percentage.toFixed(0)})),r(n,"handleVideoSuccess",(function(e,t){this.isShowUploadVideo=!0,this.videoFlag=!1,this.videoUploadPercent=0,0==e.Code?this.videoForm.showVideoPath=e.Data:layer.msg(e.Message)})),r(n,"publicInfo",(function(){for(var e=this,t=[{skillName:this.form.skillName1,skillPower:this.form.skillPower1},{skillName:this.form.skillName2,skillPower:this.form.skillPower2},{skillName:this.form.skillName3,skillPower:this.form.skillPower3},{skillName:this.form.skillName4,skillPower:this.form.skillPower4}],o=[],a=this.sourceTable,s=0;s<a.length;s++){var l={merchantPhoto:a[s].merchantPhoto,order:s+1};o.push(l)}var i={merchantGuid:localStorage.getItem("merchantGuid"),nickName:this.form.nickName,regions:this.form.regions,introduceMyself:this.form.introduceMyself,headImageReq:this.cropImg,merchantSkills:t,video:this.form.video,merchantPhotoViews:o},r=this.$route.query.flag;"edit"==r?this.$http.post("/merchant/addinfo","application/json",i,(function(t){t.data?(e.$message.success("编辑成功"),e.getData()):e.$message({showClose:!0,message:t.msg,type:"error"})}),(function(t){e.$message({showClose:!0,message:t.msg,type:"error"})})):this.$http.post("/merchant/addinfo","application/json",i,(function(t){t.data?(e.$message.success("发布成功"),e.getData()):e.$message({showClose:!0,message:t.msg,type:"error"})}),(function(t){e.$message({showClose:!0,message:t.msg,type:"error"})}))})),r(n,"previewInfo",(function(){this.$router.push("/UserInfoPre")})),r(n,"sortUp",(function(e,t){console.log(e),0===e?this.$message({message:"已经是第一个！",type:"warning"}):this.swapItems(this.sourceTable,e,e-1)})),r(n,"sortDown",(function(e,t){e===this.sourceTable.length-1?this.$message({message:"已经是最后一个！",type:"warning"}):this.swapItems(this.sourceTable,e,e+1)})),r(n,"swapItems",(function(e,t,o,a){return"up"==a?(e.unshift(e[t]),e.splice(t+1,1),e):"down"==a?(e.push(e[t]),e.splice(t,1),e):(e[t]=e.splice(o,1,e[t])[0],e)})),n)},p=u,h=(o("8dfc"),o("2877")),g=Object(h["a"])(p,a,s,!1,null,null,null);t["default"]=g.exports}}]);