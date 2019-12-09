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
                    <el-form-item label="昵称">
                        <el-input v-model="form.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="地区">
                        <el-cascader  :options="options" v-model="form.area" @change="handleAreaChange"></el-cascader>
                    </el-form-item>
                    <el-form-item label="自我介绍">
                        <el-input type="textarea" rows="5" v-model="form.introduceMyself"></el-input>
                    </el-form-item>
                    <div class="img-wrap">
                        <div class="img-label">头像</div>
                        
                        <img :src="form.headImageReq" class="pre-img">
                        <div class="crop-demo-btn">上传头像
                            <input class="crop-input" type="file" name="image" accept="image/*" @change="setHeadImage"/>
                        </div>
                    </div>
                    <div class="img-wrap">
                            <div class="img-label">封面</div>
                        <img :src="form.coverReq" class="pre-img">
                        <div class="crop-demo-btn">上传封面
                            <input class="crop-input" type="file" name="image" accept="image/*" @change="setCoverReq"/>
                        </div>
                    </div>
                    <el-form-item>
                        <el-button  type="primary" @click="addInfo" style="margin-top: 20px;">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 个人技能
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button size="small" type="success" @click="addSkillsModel" style="margin-bottom: 20px;">添加技能</el-button>
            <el-table
                :data="skillTable"
                border
                class="table"
            >
                <el-table-column type="index" width="50"  align="center"></el-table-column>
                <el-table-column prop="skillName" label="技能名称" align="center"></el-table-column>
                <el-table-column prop="skillPower" label="所占比重" align="center"></el-table-column>
                <el-table-column  label="操作" align="center">
                        <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    @click="handleDeleteSkill(scope.$index, scope.row)"
                                >删除</el-button>
                            </template>
                </el-table-column>
                
            </el-table>
            <el-dialog
              title="添加技能"
              :visible.sync="skillModel"
              width="30%">
                <el-form label-position="right" label-width="80px" :model="formSkill">
                  <el-form-item label="名称">
                    <el-input v-model="formSkill.skillName"></el-input>
                  </el-form-item>
                  <el-form-item label="活动区域">
                    <el-slider v-model="formSkill.skillPower"></el-slider>
                  </el-form-item>
                </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="skillModel = false">取 消</el-button>
                <el-button type="primary" @click="addSkills">确 定</el-button>
              </span>
            </el-dialog>
            
            
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-people"></i> 图片/视频
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-upload
                class="upload-demo"
                ref="upload"
                :limit="5"
                show-file-list='true'
                auto-upload="true"
                :action="requestUrl"
                :http-request="uploadSource"
                :on-preview="handlePreview"
                :before-upload="handleBeforeLoad"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
                <el-table
                :data="sourceTable"
                border
                class="table"
            >
                <el-table-column type="index" width="50"  align="center"></el-table-column>
                <el-table-column prop="merchantAudioVideoData" label="图片/视频" align="center">
                    <template slot-scope="scope">
                            <img :src="scope.row.merchantAudioVideoData" alt="">
                        </template>
                </el-table-column>
                <el-table-column  label="操作" align="center">
                        <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    @click="handleDeleteSource(scope.$index, scope.row)"
                                >删除</el-button>
                            </template>
                </el-table-column>
                
            </el-table>
            
        </div>
    </div>
</template>

<script>
    import { regionData } from 'element-china-area-data'
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                nickName: '',
                introduceMyself: '',
                headImageReq: '',
                coverReq: '',
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
            cropImg: '',
            imgSrc: '',
            dialogVisible: false,
            skillModel: false,
            fileList: [],
            requestUrl: 'http://localhost:8202/merchant/upload',
            options: regionData,

        };
    },
   
    created() {
        this.getData();
    },
    methods: {
        handleAreaChange (value) {
 
            console.log(value)
 
        },
        // 查询用户信息
        getData() {
            var param = {
                merchantGuid: localStorage.getItem('merchantGuid'),
              };
            this.$http.get("/merchant/merchantInfo", "application/json", param, res => {
                if (res.data) {
                    this.form = res.data.merchantInfoView;
                    this.skillTable = res.data.merchantSkills;
                    this.sourceTable = res.data.merchantVideoViews;
                }
            }, res => {
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
    
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
            this.$http.post("/merchant/addinfo", "application/json", param, res => {
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
          console.log(file);
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
        var param = {
            videoGuid: row.guid,
            };
            this.$http.delete("/merchant/deleteVideo", "application/json", param, res => {
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
      handleChange(file, fileList){
        //   console.log(file, fileList);
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
      }
      
        
    }
};
</script>
<style scoped>
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
            margin-left: -70px;
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
    </style>