<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">审核</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="80px" class="ms-content">
                <el-form-item prop="username" label="姓名">
                    <el-input v-model="param.username">
                    </el-input>
                </el-form-item>
                <el-form-item prop="IDcard" label="身份证号">
                    <el-input v-model="param.IDcard">
                    </el-input>
                </el-form-item>
                <el-form-item prop="area" label="地区">
                    <el-cascader  :options="options" v-model="param.area" @change="handleAreaChange"></el-cascader>
                    </el-input>
                </el-form-item>
                <el-form-item prop="introduce" label="自我介绍">
                    <el-input type="textarea" rows="5" v-model="param.introduce"></el-input>
                </el-form-item>
				<div class="img-wrap">
					<div class="crop-demo">
		                <img :src="param.pic1" class="pre-img">
		                <div class="crop-demo-btn">正面照
		                    <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage1"/>
		                </div>
		            </div>
		            <div class="crop-demo">
		                <img :src="param.pic2" class="pre-img">
		                <div class="crop-demo-btn">反面照
		                    <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage2"/>
		                </div>
		            </div>
				</div>
                

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                </div>
                <!-- <p class="login-tips">或 <el-button type="text" @click="go()">直接进入</el-button></p> -->
            </el-form>
            <el-dialog title="裁剪图片" :visible.sync="dialogVisible1" width="30%">
                <vue-cropper ref='cropper1' :src="imgSrc1" :ready="cropImage1" :zoom="cropImage1" :cropmove="cropImage1" style="width:100%;height:300px;"></vue-cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop1">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="裁剪图片" :visible.sync="dialogVisible2" width="30%">
                <vue-cropper ref='cropper2' :src="imgSrc2" :ready="cropImage2" :zoom="cropImage2" :cropmove="cropImage2" style="width:100%;height:300px;"></vue-cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop2">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
	import VueCropper  from 'vue-cropperjs';

  import { regionData } from 'element-china-area-data'
export default {
    data: function() {
        return {
            phoneLogin: false,
            param: {
                username: '',
                IDcard: '',
                area: [],
                weixin: '',
                introduce: '',
                pic1: '',
                pic2: '',
            },
            rules: {
                username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                IDcard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
                area: [{ required: true, message: '请选择地区', trigger: 'blur' }],
                // weixin: [{ required: true, message: '请输入微信号', trigger: 'blur' }],
                introduce: [{ required: true, message: '请输入自我介绍', trigger: 'blur' }],
                pic1: [{ required: true, message: '请选择身份证正面照', trigger: 'blur' }],
                pic2: [{ required: true, message: '请选择身份证反面照', trigger: 'blur' }],
            },
            defaultSrc: require('../../assets/img/img.jpg'),
            fileList: [],
            imgSrc1: '',
            imgSrc2: '',
            cropImg1: '',
            cropImg2: '',
            dialogVisible1: false,
            dialogVisible2: false,

        options: regionData,
        selectedOptions: []
        };
    },
    components: {
            VueCropper
        },
        created(){
            this.cropImg1 = this.defaultSrc;
            this.cropImg2 = this.defaultSrc;
        },
    methods: {
        handleAreaChange (value) {
 
        console.log(value)
 
      },

        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    var param = {
                        merchantGuid: localStorage.getItem('merchantGuid'),
                        realName: this.param.username,
                        idCard: this.param.IDcard,
                        regions: this.param.area,
                        weChatId:this.param.weixin,
                        introduceMyself: this.param.introduce,
                        idCardFacePhoto: this.param.pic1,
                        idCardReversePhoto:this.param.pic2,
                        membership: '0'
                    };
                    this.$http.post("/merchant/audit", "application/json", param, res => {
                        if (res.data) {
                            this.$message.success('提交成功');
                            this.$router.push('/TaskCenter');
                        }
                    }, res => {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
            
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 直接进入
        go() {
            this.$router.push('/TaskCenter');
        },
        setImage1(e){
            var that = this;
            var file = e.target.files[0];
            // console.log("file", file); 
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                // console.log(e);
                that.param.pic1 = this.result;
            }
        },
        setImage2(e){
            var that = this;
            var file = e.target.files[0];
            // console.log("file", file); 
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                // console.log(e);
                that.param.pic2 = this.result;
            }
        },
        cropImage1 () {
            this.cropImg1 = this.$refs.cropper1.getCroppedCanvas().toDataURL();
        },
        cancelCrop1(){
            this.dialogVisible1 = false;
            this.cropImg1 = this.defaultSrc;
        },
        // setImage2(e){
        //     const file = e.target.files[0];
        //     if (!file.type.includes('image/')) {
        //         return;
        //     }
        //     const reader = new FileReader();
        //     reader.onload = (event) => {
        //         this.dialogVisible2 = true;
        //         this.imgSrc2 = event.target.result;
        //         this.$refs.cropper2 && this.$refs.cropper2.replace(event.target.result);
        //     };
        //     reader.readAsDataURL(file);
        // },
        cropImage2 () {
            this.cropImg2 = this.$refs.cropper2.getCroppedCanvas().toDataURL();
        },
        cancelCrop2(){
            this.dialogVisible2 = false;
            this.cropImg2 = this.defaultSrc;
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    /*background-image: url(../../assets/img/login-bg.jpg);*/
    background: rgb(50, 65, 87);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
}
.ms-tips {
    font-size: 12px;
    color: #fff;
    padding-bottom: 10px;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 25%;
    width: 450px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    /*background: rgba(255, 255, 255, 0.3);*/
    background: #FFF;
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #333;
    float: right;
}
/*选择文件*/
.img-wrap {
	display: flex;
	justify-content: space-around;
}
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 150px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
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