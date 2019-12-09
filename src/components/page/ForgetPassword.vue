<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">找回密码</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                
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
                    <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入新密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input
                        type="password"
                        placeholder="确认新密码"
                        v-model="param.checkPass"
                        @keyup.enter.native="submitForm()"
                    >
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">找回密码</el-button>
                </div>
                <p class="login-tips">或 <el-button type="text" @click="login()">登录</el-button></p>
            </el-form>
        </div>
    </div>
</template>

<script>
        let Base64 = require("js-base64").Base64;
export default {
    data: function() {
        var validatePhone = (rule, value, callback) => {
            var param = {
                mobile: this.param.tel
            };
            this.$http.get("/merchant/checkMobile", "application/x-www-from-urlencoded", param, res => {
                console.log(res);
                if (res.data) {
                    callback(new Error('该手机号尚未注册'));
                }
            }, res => {
                console.log(res);
                if (!res.data) {
                    callback();
                }
    
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
        var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入新密码'));
            } else {
              if (this.param.checkPass !== '') {
                this.$refs.login.validateField('checkPass');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入新密码'));
            } else if (value !== this.param.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
        return {
            param: {
                tel: '',
                code: '',
                checkPass: '',
                password: '',
            },
            rules: {
                checkPass: [
                { validator: validatePass2, trigger: 'blur' },
                    { required: true, message: '确认新密码', trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' },
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
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
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                    var param = {
                        mobile: this.param.tel,
                        password:Base64.encode(this.param.password)
                    };
                    this.$http.post("/merchant/findPwd", "application/json", param, res => {
                        if (res.data) {
                            this.$message.success('修改成功，请使用新密码登录');
                            this.$router.push('/login');
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
        // 获取验证码
        getCode() {
            this.$refs.login.validateField('tel', (phoneError) => {
                console.log(phoneError);
                if (!phoneError) {
                    console.log('发');
                    this.auth_time = 180;
                    this.sendAuthCode = true;
                    // 发短信接口
                    var param = {
                    mobile: this.param.tel,
                    type: '2'
                    };
                    console.log(param);
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
                } else {
                    console.log('bu发');
                }
            })
            
           
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
        // 登录
        login() {
            this.$router.push('/login');
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