<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title" @click="register">登录</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <div v-if="!phoneLogin">
                    <div class="ms-tips">通过您的手机号和密码登录企业，或 <el-button type="text" @click="toggle(true)">手机验证码</el-button></div>
                    <el-form-item prop="tel">
                        <el-input v-model="param.tel" placeholder="请输入手机号">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            placeholder="请输入密码"
                            v-model="param.password"
                            @keyup.enter.native="submitForm()"
                        >
                        </el-input>
                    </el-form-item>
                </div>
                <div v-if="phoneLogin">
                    <div class="ms-tips">通过您的手机号码登录企业
                    <el-button type="text" @click="toggle(false)">或手机号密码登陆</el-button>
                    </div>
                    <el-form-item prop="tel">
                        <el-input v-model="param.tel" placeholder="请输入手机号">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code" style="position: relative;">
                        <el-input
                            type="text"
                            placeholder="请输入验证码"
                            v-model="param.code"
                            @keyup.enter.native="submitForm()"
                        >
                        </el-input>
                         <el-button size="mini" type="primary" style="position: absolute;right: 3.5px;top: 3.5px;" :disabled="sendAuthCode" @click="getCode()">{{btnText}}</el-button>
                    </el-form-item>
                </div>
                <p class="login-tips" style="cursor: pointer;" @click="forgetPassword()">忘记密码</p>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">或 <el-button type="text" @click="register()">注册</el-button> </p>
            </el-form>
        </div>
    </div>
</template>

<script>
        let Base64 = require("js-base64").Base64;
export default {
    data: function() {
        var validateAccount = (rule, value, callback) => {
            var param = {
                email: this.param.username
            };
            this.$http.get("/merchant/checkEmail", "application/json", param, res => {
                if (res.data) {
                    callback(new Error('邮箱未注册'));
                } else {
                    callback();
                }
            }, res => {
                callback();
    
            })
        };
        var validatePhone = (rule, value, callback) => {
            var param = {
                mobile: this.param.tel
            };
            this.$http.get("/merchant/checkMobile", "application/json", param, res => {
                console.log(res);
                if (res.data) {
                    callback(new Error('手机号尚未注册'));
                } else {
                    callback();
                }
            }, res => {
                callback();
    
            })
        };
        var validateCode = (rule, value, callback) => {
            var param = {
                mobile: this.param.tel,
                verifyCode: this.param.code
            };
            this.$http.post("/merchant/validation", "application/json", param, res => {
                if (res.data) {
                    callback();
                } else {
                    callback(new Error('验证码错误'));
                }
            }, res => {
                
    
            })
        };
        return {
            phoneLogin: true,
            param: {
                username: '',
                password: '',
                tel: '',
                code: ''
            },
            rules: {
                username: [
                    // { validator: validateAccount, trigger: 'blur' },
                    { validator: validatePhone, trigger: 'blur' },
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
                    // { pattern:  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '邮箱格式不正确' },
                ],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                tel: [
                    { validator: validatePhone, trigger: 'blur' },
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            auth_time: 180,
            sendAuthCode: false,
            authTimeTimer: null,
            btnText: '获取验证码',
            checkMobileFlag: false,
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    var type = this.phoneLogin ? '1' : '0';
                    var param = {
                        // email: this.param.username,
                        loginType: type,
                        mobile: this.param.tel,
                        verifyCode: this.param.code,
                        password: Base64.encode(this.param.password)
                    };
                    this.$http.post("/merchant/login", "application/json", param, res => {
                        if (res.data) {
                            // if(type === '1'){
                            localStorage.setItem('ms_username', this.param.tel);
                            // }else{
                            // localStorage.setItem('ms_username', this.param.tel);
                            // }
                            localStorage.setItem('merchantGuid', res.data.guid);
							localStorage.setItem('Authorization', res.data.password);
                            this.$message.success('登录成功');
                            if (res.data.state == '0') {
                                this.$router.push('/check');
                            } else {
								
								
								
                                this.$router.push('/TaskCenter');
                            }
                            
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
        // 切换
        toggle (flag) {
            this.$refs['login'].clearValidate();
            this.phoneLogin = flag
        },
        
        // 返回false验证通过
        checkMobile() {
            var param = {
                mobile: this.param.tel
            };
            this.$http.get("/merchant/checkMobile", "application/json", param, res => {
                console.log(res);
            }
            , res => {
                console.log(res);
            });
        },
        // 获取验证码
        getCode() {
            var param = {
                mobile: this.param.tel
            };
            this.$http.get("/merchant/checkMobile", "application/json", param, res => {
                console.log(res);
                console.log('不发');
            }
            , res => {
                console.log(res);
                console.log('发');
                this.auth_time = 180;
                this.sendAuthCode = true;
                // 发短信接口
                var param = {
                mobile: this.param.tel,
                type: '1'
                };
                this.$http.post("/merchant/verifyCode", "application/json", param, res => {
                    if (res.data) {
                        this.getAuthCode();
                        
                        this.$message({
                            showClose: true,
                            message: '验证码已发送至登记手机号上，请查收。',
                            type: 'success'
                        });
                    }
                }, res => {
                    this.sendAuthCode = false;
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
        
                })

            });
        },
        // 倒计时
        getAuthCode() {
            if (this.authTimeTimer) {
                clearTimeout(this.authTimeTimer);
                
            }
            this.authTimeTimer = setTimeout(() => {
                this.auth_time -= 1;
                this.btnText = this.auth_time + '';
                if (this.auth_time < 0) {
                    this.sendAuthCode = false;
                    this.btnText = '获取验证码';
                    clearTimeout(this.authTimeTimer);
                } else {
                    this.getAuthCode();
                }
          }, 1000)

        },
        // 注册
        register() {
            this.$refs['login'].resetFields();
            this.$router.push({path: '/userregister'});
        },
        // 忘记密码
        forgetPassword() {
            this.$router.push('/forgetPassword');
        },
        
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
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
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
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
    color: #fff;
    float: right;
}
</style>