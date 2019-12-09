<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-vipcard"></i> 实名认证
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <div style="width: 100%;text-align: center;padding-top: 100px;" v-if="!show">
                <h1 class="error-desc">您还未审核</h1>
                <el-button type="primary" style="margin-top: 30px;" @click="toCheck()">审 核</el-button>
            </div> -->
        <div class="container" v-if="show">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="会员身份">
                        <el-input v-model="form.membership == 0 ? '个人' : ''" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名">
                        <el-input v-model="form.realName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="form.idCard" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区">
                            <el-input v-model="form.regionText" disabled></el-input>
                        <!-- <el-cascader  :options="options" v-model="form.regions" :disabled="true" ></el-cascader> -->
                    </el-form-item>
                    <div class="img-wrap">
                        <div>
                                <img :src="form.idCardFacePhoto" class="img" alt="">
                                <div>身份证正面照</div>
                        </div>
                        <div>
                                <img :src="form.idCardReversePhoto" class="img" alt="">
                                <div>身份证反面照</div>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { regionData, CodeToText } from 'element-china-area-data';
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                membership: '',
                realName: '',
                idCard: '',
                weChatId: '',
                regionText: '',
                regions: [],
                introduceMyself: '',
                idCardFacePhoto: '',
                idCardReversePhoto: '',
            },
            show: true,
            options: regionData,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            var param = {
                merchantGuid: localStorage.getItem('merchantGuid'),
              };
            this.$http.get("/merchant/personalInfo", "application/json", param, res => {
                if (res.data) {
                    this.form = res.data;
                    this.form.regionText = CodeToText[res.data.regions[0]] + '**';
                    this.show = true;
                } else {
                    this.$message({
                            showClose: true,
                            message: '未上传审核信息',
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
        toCheck(){
            this.$router.push('/check');
        },
    }
};
</script>
<style scoped>
    .img-wrap {
        display: flex;
        justify-content: space-around;
    }
    .img-wrap > div{
        text-align: center
    }
    img{   
        width: 150px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .error-desc{
        font-size: 30px;
        color: #777;
    }
</style>