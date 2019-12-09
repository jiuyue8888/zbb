<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-vipcard"></i>任务大厅</el-breadcrumb-item>
                <el-breadcrumb-item>任务详情</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-button type="text" icon="el-icon-arrow-left" @click="goback()">返回</el-button>
        <div class="container">
        	
        	
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="订单编号">
                        <el-input v-model="form.orderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="任务类型">
                        <el-input v-model="form.taskType == '0' ? '起名' : '改名'"></el-input>
                    </el-form-item>
                    <el-form-item label="姓氏">
                        <el-input v-model="form.firstName"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="form.sex == '0' ? '女' : '男'"></el-input>
                    </el-form-item>
                    <el-form-item label="出生状态">
                        <el-input v-model="form.bornStatus == '0' ? '未出生' : '已出生'"></el-input>
                    </el-form-item>
                    <el-form-item label="出生时间">
                        <el-input v-model="form.bornTime"></el-input>
                    </el-form-item>
                    <el-form-item label="出生地区">
                        <el-input v-model="form.bornArea"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名长度">
                        <el-input v-model="form.nameLength"></el-input>
                    </el-form-item>
                    <el-form-item label="固定字">
                        <el-input v-model="form.fixChar"></el-input>
                    </el-form-item>
                    <el-form-item label="固定位置">
                        <el-input v-model="form.fixPos == '0' ? '中间' : '末尾'"></el-input>
                    </el-form-item>
                    <el-form-item label="母亲姓名">
                        <el-input v-model="form.motherName"></el-input>
                    </el-form-item>
                    <el-form-item label="父亲姓名">
                        <el-input v-model="form.fatherName"></el-input>
                    </el-form-item>
                    <el-form-item label="发布者id">
                        <el-input v-model="form.userId"></el-input>
                    </el-form-item>
                    <el-form-item label="中标者">
                        <el-input v-model="form.winnerId"></el-input>
                    </el-form-item>
                    <el-form-item label="中标时间">
                        <el-input v-model="form.winTime"></el-input>
                    </el-form-item>
                    <el-form-item label="支付时间">
                        <el-input v-model="form.payTime"></el-input>
                    </el-form-item>
                    <el-form-item label="任务状态">
                        <el-input v-model="taskStatusFmt"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-input v-model="statusFmt"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.memo"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐">
                        <el-input v-model="form.packageGuid"></el-input>
                    </el-form-item>
                    <el-form-item label="回复总数">
                        <el-input v-model="form.replyCount"></el-input>
                    </el-form-item>
                    <el-form-item label="当前已回复条数">
                        <el-input v-model="form.currentReplyCount"></el-input>
                    </el-form-item>
                    <el-form-item label="剩余回复数">
                        <el-input v-model="form.residualReplyCount"></el-input>
                    </el-form-item>
                    <el-form-item label="新增回复数">
                        <el-input v-model="form.againReplyCount"></el-input>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <el-input v-model="form.payType == '0' ? '微信' : '支付宝'"></el-input>
                    </el-form-item>
                    <el-form-item label="任务价格">
                        <el-input v-model="form.taskPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-input v-model="form.createTime"></el-input>
                    </el-form-item>
                    <el-form-item label="更新时间">
                        <el-input v-model="form.updateTime"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐标题">
                        <el-input v-model="form.packageName"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐类型">
                        <el-input v-model="packageTypeFmt"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐价格">
                        <el-input v-model="form.packagePrice"></el-input>
                    </el-form-item>
                    <el-form-item label="每条回复价格">
                        <el-input v-model="form.replyPrice"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            form: {},
            taskStatusFmt: '',
            statusFmt: '',
            packageTypeFmt: '',
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 任务状态格式化
        taskStatusFun(val){
            if (val == '0') {
                return '已发布';
            } else if (val == '10') {
                return '已支付';
            } else if (val == '20') {
                return '已中标';
            } else if (val == '-1') {
                return '已取消';
            }
        },
        statusFun(val) {
            if (val == '0') {
                return '已满标'
            } else if (val == '1') {
                return '已完成'
            } else if (val == '-1') {
                return '待投标'
            }
        },
        packageTypeFun(val) {
            if (val == '1') {
                return '大众版'
            } else if (val == '2') {
                return '精英版'
            } else if (val == '3') {
                return '大师版'
            }
        },
        getData() {
        	var row = this.$route.query.row;
            this.form = row;  
            console.log(row);
            var taskStatusFmt = this.taskStatusFun(row.taskStatus);
            var statusFmt = this.statusFun(row.status);
            var packageTypeFmt = this.packageTypeFun(row.packageType);
            this.taskStatusFmt = taskStatusFmt;
            this.statusFmt = statusFmt;
            this.packageTypeFmt = packageTypeFmt;
        },
        goback(){
        	this.$router.go(-1)
        },
    }
};
</script>
<style scoped>
    .img-wrap {
        display: flex;
        justify-content: space-around;
    }
    img{   
        width: 150px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
</style>