<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 个人信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="头像">
                        <div class="crop-demo">
                            <img :src="cropImg" class="pre-img">
                            <div class="crop-demo-btn">选择图片
                                <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                            </div>
                        </div>
                    </el-form-item>
                    
                    <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                        <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="cancelCrop">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                    <el-form-item label="昵称">
                        <el-input v-model="form.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="地区">
                        <el-cascader  :options="options" v-model="form.regions" @change="handleAreaChange"></el-cascader>
                    </el-form-item>
                    <el-form-item label="技能一">
                        <el-row >
                            <el-col :span="6">
                                <el-input v-model="form.skillName1"></el-input>
                            </el-col>
                            <el-col :span="10" style="margin-left: 20px">
                                <el-slider v-model="form.skillPower1"></el-slider>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="技能二">
                        <el-row>
                            <el-col :span="6">
                                <el-input v-model="form.skillName2"></el-input>
                            </el-col>
                            <el-col :span="10" style="margin-left: 20px">
                                <el-slider v-model="form.skillPower2"></el-slider>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="技能三">
                        <el-row>
                            <el-col :span="6">
                                <el-input v-model="form.skillName3"></el-input>
                            </el-col>
                            <el-col :span="10" style="margin-left: 20px">
                                <el-slider v-model="form.skillPower3"></el-slider>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="技能四">
                        <el-row>
                            <el-col :span="6">
                                <el-input v-model="form.skillName4"></el-input>
                            </el-col>
                            <el-col :span="10" style="margin-left: 20px">
                                <el-slider v-model="form.skillPower4"></el-slider>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="上传视频" prop="Video">
                        <el-upload class="avatar-uploader"
                                   :action="requestUrl"
                                   :on-progress="uploadVideoProcess"
                                   :on-success="handleVideoSuccess"
                                   :before-upload="beforeUploadVideo"
                                   :show-file-list="false">
                            <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                                   :src="videoForm.showVideoPath"
                                   class="avatar video-avatar"
                                   controls="controls">
                                您的浏览器不支持视频播放
                            </video>
                            <i v-else-if="videoForm.showVideoPath =='' && !videoFlag"
                               class="el-icon-plus avatar-uploader-icon"></i>
                            <el-progress v-if="videoFlag == true"
                                         type="circle"
                                         :percentage="videoUploadPercent"
                                         style="margin-top:7px;"></el-progress>
                        </el-upload>
                        <P class="text">请保证视频格式正确</P>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <el-upload
                          class="upload-demo"
                          ref="upload"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-change="handleChange"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :file-list="fileList"
                          :show-file-list="false"
                          multiple
                          :auto-upload="false">
                          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                        </el-upload>
                        <el-table
                :data="sourceTable"
                border
                class="table"
            >
                <el-table-column type="index" width="50"  align="center"></el-table-column>
                <el-table-column prop="merchantPhoto" label="图片/视频" align="center">
                    <template slot-scope="scope">
                            <img :src="scope.row.merchantPhoto" alt="">
                        </template>
                </el-table-column>
                <el-table-column  label="操作" align="center">
                        <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    @click="handleDeleteSource(scope.$index, scope.row)"
                                >删除</el-button>
                                <el-button
                                    type="text"
                                    @click="sortUp(scope.$index, scope.row)"
                                >上移</el-button>
                                <el-button
                                    type="text"
                                    @click="sortDown(scope.$index, scope.row)"
                                >下移</el-button>
                            </template>
                </el-table-column>
                
            </el-table>
                        
                    </el-form-item>
                    <el-form-item label="简介">
                        <quill-editor ref="myTextEditor" v-model="form.introduceMyself" :options="editorOption1"></quill-editor>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button  type="primary" @click="publicInfo" style="margin-top: 20px;">发布</el-button>
                        <el-button  type="primary" @click="previewInfo" style="margin-top: 20px;">预览</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { regionData } from 'element-china-area-data';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import VueCropper  from 'vue-cropperjs';
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                nickName: '',
                regions: [],
                introduceMyself: '',
                headImageReq: '',
                coverReq: '',
                skillName1: '',
                skillPower1: 0,
                skillName2: '',
                skillPower2: 0,
                skillName3: '',
                skillPower3: 0,
                skillName4: '',
                skillPower4: 0,
            },
            merchantSkills: [],
            skillTable: [],
            sourceTable: [],
            formSkill: {
                skillName: '',
                skillPower: '',
            },
            merchantIfo: '',
            videos: [],
            value2: '',
            // cropImg: '',
            // imgSrc: '',
            // dialogVisible: false,
            skillModel: false,
            fileList: [],
            requestUrl: 'http://localhost:8202/merchant/upload',
            options: regionData,
            editorOption1: {
                    placeholder: '请输入简介'
            },
            defaultSrc: require('../../assets/img/img.jpg'),
            imgSrc: '',
            cropImg: '',
            dialogVisible: false,
            // 视频
            videoFlag: false,
            //是否显示进度条
            videoUploadPercent: "",
            //进度条的进度，
            isShowUploadVideo: false,
            //显示上传按钮
            videoForm: {
                showVideoPath: ''
            },

        };
    },
   
    created() {
        console.log(this.$route.query.flag);
        
        this.getData();
        this.cropImg = this.defaultSrc;
       

    },
    components: {
            quillEditor, VueCropper
        },
    methods: {
        handleAreaChange (value) {
 
            console.log(value)
 
        },
        // 查询用户信息
        getData() {
			var that = this;
            var param = {
                merchantGuid: localStorage.getItem('merchantGuid'),
              };
            this.$http.get("/merchant/merinfo", "application/json", param, res => {
                if (res.data) {
					console.log(res,"--=c ");
                    var flag = this.$route.query.flag;
                    if (flag == 'edit') {
						/**
						 * "data":{
							 * "regi":"110000,110100,110105,",
							 * "can_by_money":"6000",
							 * "introduces":"651288773",
							 * "create_time":"2019-11-21 12:55:49",
							 * "count_yield":"6000",
							 * "mobile":"13751717203",
							 * "base_url":"http://www.zhubaba.cn/images/merchant/",
							 * "himg":"253300685",
							 * "photos":"1570321055:1,",
							 * "skill":"计算:93,云编辑:78,谈判:91,吃瓜:100,",
							 * "nickname":"大海科技","guid":2147483837,
							 * "state":"2","email":"506766704@qq.com"}
							 * 
							 * form: {
                nickName: '',
                regions: [],
                introduceMyself: '',
                headImageReq: '',
                coverReq: '',
                skillName1: '',
                skillPower1: 0,
                skillName2: '',
                skillPower2: 0,
                skillName3: '',
                skillPower3: 0,
                skillName4: '',
                skillPower4: 0,
            },
							 * regions
							 * 
						 */
                       // that.form = res.data;
                        that.cropImg = res.data.base_url+res.data.himg;// 头像
						
						that.form.nickName = res.data.nickname;// 昵称
						
						// 位置 
						if(res.data.regi){
							var tp = res.data.regi.split(",");
							for(var i in tp){
								var tmp = tp[i];
								if(tmp){
									that.form.regions.push(tmp);
								}
							}
						}
						
						//console.log(that.form.regions);
						
						// 技能
						if(res.data.skill){
							var arr = res.data.skill.split(",");
							if(arr){
								var indexs = 1;
								for(var i in arr){
									var tmp = arr[i];
									if(tmp){
										var tp_names = tmp.split(":");
										// that.$set(that.form,)
										that.$set(that.form, 'skillName'+indexs, tp_names[0]);
										that.$set(that.form, 'skillPower'+indexs, parseInt(tp_names[1]));
										indexs++;
									}
								}
							}
							
						}
						
						//merchantPhoto 照片
						if(res.data.photos){
							//* "photos":"1570321055:1,",
							var p = res.data.photos.split(",");
							for(var i in p){
								var tp = p[i];
								if(tp){
									var tmp = tp.split(":");
									var ids = tmp[0];
									var x = tmp[1];
									that.sourceTable.push({merchantPhoto:res.data.base_url+ids});
								}
							}
						}
						
						// 简介
						if(res.data.introduces){
							var burl ="http://api.zhubaba.cn/merchant/task/gmax/";
							//简介URL 
							burl = burl + res.data.introduces;
							// 拿到URL 后， POST 请求 获取简介内容 
							this.$http.get(burl, "application/json", {}, res => {
								console.log(res);
								this.form.introduceMyself = res;
							},res =>{
								this.form.introduceMyself = res;
							});
							
						}
						
                        
                    } else {
                        // 已上传信息，直接到预览页面
                       // this.$router.push('/UserInfoPre');
                    }
                    
                    
                }
            }, res => {
                // 未上传过信息
                // this.$message({
                //     showClose: true,
                //     message: res.msg,
                //     type: 'error'
                // });
                
    
            })
        },
        setHeadImage(e){
            var that = this;
            var file = e.target.files[0];
            // console.log("file", file); 
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                // console.log(e);
                that.form.headImageReq = this.result;
            }
        },
        setCoverReq(e) {
            var that = this;
            var file = e.target.files[0];
            // console.log("file", file); 
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                // console.log(e);
                that.form.coverReq = this.result;
            }
        },
        // 上传信息
        addInfo () {
            var param = {
                merchantGuid: localStorage.getItem('merchantGuid'),
                headImageReq: this.form.headImageReq,
                nickName: this.form.nickName,
                coverReq: this.form.coverReq,
                introduceMyself:this.form.introduceMyself,
            };
            this.$http.post("/merchant/addMerchantInfo", "application/json", param, res => {
                if (res.data) {
                    this.$message.success('提交成功');
                    this.getData();
                } else {
                    this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
                }
            }, res => {
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
    
            })
        },
        addSkillsModel() {
            
            this.skillModel = true;
            // console.log(this.skillModel);
        },
        // 上传技能
        addSkills () {
            var param = {
                merchantGuid: localStorage.getItem('merchantGuid'),
                skillName: this.formSkill.skillName,
                skillPower: this.formSkill.skillPower,
            };
            this.$http.post("/merchant/addSkill", "application/json", param, res => {
                if (res.data) {
                    this.$message.success('提交成功');
                    this.getData();
                    this.skillModel = false;
                } else {
                    this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
                }
            }, res => {
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
    
            })
        },
        handleDeleteSkill(index, row) {
            var param = {
                skillGuid: row.guid,
            };
            this.$http.delete("/merchant/deleteSkill", "application/json", param, res => {
                if (res.data) {
                    this.$message.success('删除成功');
                    this.getData();
                } else {
                    this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
                }
            }, res => {
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
    
            })
        },
        // 上传图片或视频
        uploadSource () {
            // console.log(this.merchantIfo);
            return;
            var param = {
                merchantGuid: localStorage.getItem('merchantGuid'),
                merchantIfo: this.merchantIfo,
            };
            this.$http.post("/merchant/upload", "application/json", param, res => {
                if (res.data) {
                    this.$message.success('提交成功');
                    this.getData();
                } else {
                    this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
                }
            }, res => {
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
    
            })
        },
         submitUpload() {
        this.$refs.upload.submit();
      },
      // 上传图片 真
      handleBeforeLoad(file){
        var that = this;
    　　var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            
            that.merchantIfo = this.result;
            // console.log(that.merchantIfo);
            var param = {
                merchantGuid: localStorage.getItem('merchantGuid'),
                merchantAudioVideoData: that.merchantIfo,
            };
            that.$http.post("/merchant/upload", "application/json", param, res => {
                if (res.data) {
                    that.$message.success('提交成功');
                    that.getData();
                } else {
                    that.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
                }
            }, res => {
                that.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
    
            })
        }
      },
      // 删除图片或视频
      handleDeleteSource(index, row) {
        this.sourceTable.splice(index, 1);
        // var param = {
        //     videoGuid: row.guid,
        //     };
        //     this.$http.delete("/merchant/deleteVideo", "application/json", param, res => {
        //         if (res.data) {
        //             this.$message.success('删除成功');
        //             this.getData();
        //         } else {
        //             this.$message({
        //             showClose: true,
        //             message: res.msg,
        //             type: 'error'
        //         });
        //         }
        //     }, res => {
        //         this.$message({
        //             showClose: true,
        //             message: res.msg,
        //             type: 'error'
        //         });
    
        //     })
      },
      handleChange(file, fileList){
          console.log(file, fileList);
          console.log(this.fileList);
          var that = this;
          var reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = function(e) {
                var obj = {
                    merchantPhoto: this.result
                };
                if (that.sourceTable.length < 5) {
                    that.sourceTable.push(obj);
                }
                
            }
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePreview(file) {
        // console.log(file);
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePreview(file) {
        // console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      setImage(e){
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                this.dialogVisible = true;
                this.imgSrc = event.target.result;
                this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
        },
        cropImage () {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },
        cancelCrop(){
            this.dialogVisible = false;
            this.cropImg = this.defaultSrc;
        },
        //上传前回调
            beforeUploadVideo(file) {
                var fileSize = file.size / 1024 / 1024 < 50;
                if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                    layer.msg("请上传正确的视频格式");
                    return false;
                }
                if (!fileSize) {
                    layer.msg("视频大小不能超过50MB");
                    return false;
                }
                this.isShowUploadVideo = false;
            },
            //进度条
            uploadVideoProcess(event, file, fileList) {
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            },
            //上传成功回调
            handleVideoSuccess(res, file) {
                this.isShowUploadVideo = true;
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                
                //前台上传地址
                //if (file.status == 'success' ) {
                //    this.videoForm.showVideoPath = file.url;
                //} else {
                //     layer.msg("上传失败，请重新上传");
                //}

                //后台上传地址
                if (res.Code == 0) {
                    this.videoForm.showVideoPath = res.Data;
                } else {
                    layer.msg(res.Message);
                }
            },
            // 发布
            publicInfo(){
                // 技能
                var merchantSkills = [
                    {
                        skillName: this.form.skillName1,
                        skillPower: this.form.skillPower1,
                    },
                    {
                        skillName: this.form.skillName2,
                        skillPower: this.form.skillPower2,
                    },
                    {
                        skillName: this.form.skillName3,
                        skillPower: this.form.skillPower3,
                    },
                    {
                        skillName: this.form.skillName4,
                        skillPower: this.form.skillPower4,
                    },
                ];
                // 排序
                var merchantPhotoViews = [];
                var sourceTable = this.sourceTable; 
                for (var i = 0; i < sourceTable.length; i++) {
                    var obj = {
                        merchantPhoto: sourceTable[i].merchantPhoto,
                        order: i+1
                    };
                    merchantPhotoViews.push(obj);
                }
                var param = {
                    merchantGuid: localStorage.getItem('merchantGuid'),
                    nickName: this.form.nickName,
                    regions: this.form.regions,
                    introduceMyself: this.form.introduceMyself,
                    headImageReq: this.cropImg,
                    merchantSkills: merchantSkills,
                    video: this.form.video,
                    merchantPhotoViews: merchantPhotoViews

                };
                var flag = this.$route.query.flag;
                if (flag == 'edit') {
                    this.$http.post("/merchant/addinfo", "application/json", param, res => {
                        if (res.data) {
                            this.$message.success('编辑成功');
                            this.getData();
                        } else {
                            this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
                        }
                    }, res => {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
            
                    })
                } else {
                    this.$http.post("/merchant/addinfo", "application/json", param, res => {
                        if (res.data) {
                            this.$message.success('发布成功');
                            this.getData();
                        } else {
                            this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
                        }
                    }, res => {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
            
                    })
                }
                

            },
            // 预览
            previewInfo(){
                this.$router.push('/UserInfoPre');
            },

            // 上移按钮
            sortUp (index, row) {
                console.log(index);
              if (index === 0) {
                this.$message({
                  message: '已经是第一个！',
                  type: 'warning'
                })
              } else {
                this.swapItems(this.sourceTable, index, index - 1);
               
              }
            },

            // 下移按钮
            sortDown (index, row) {
              if (index === (this.sourceTable.length - 1)) {
                this.$message({
                  message: '已经是最后一个！',
                  type: 'warning'
                })
              } else {
                this.swapItems(this.sourceTable, index, index + 1);
              }
            },
            swapItems(arr, index1, index2,direction) {
                if(direction=='up'){//置顶
                    arr.unshift(arr[index1]);
                    arr.splice(index1+1,1);
                    return arr;
                }
                if(direction=='down'){//置底
                    arr.push(arr[index1]);
                    arr.splice(index1,1);
                    return arr;
                }
                arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                return arr;
            },

        
    }
};
</script>
<style>
        .img-wrap {
            display: flex;
            justify-content: space-around;
        }
        .img-label{
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin-left: -25px;
        }
        img{   
            width: 150px;
            height: 100px;
            background: #f8f8f8;
            border: 1px solid #eee;
            border-radius: 5px;
            /*margin-left: -70px;*/
        }
        .upload-demo{
            border: none;
        }
        .upload-demo .el-upload--text {
            border: none;
            width: initial;
            height: initial;
        }
        .crop-demo{
        /*display: flex;*/
        /*align-items: flex-end;*/
        padding-bottom: 30px;
    }
    .crop-demo-btn{
        position: relative;
        width:100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 12px;
        border-radius: 4px;
        box-sizing: border-box;
    }
        .crop-input {
            position: absolute;
            width: 100px;
            height: 40px;
            left: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
        }
        .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
    </style>