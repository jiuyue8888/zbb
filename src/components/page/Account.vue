<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-recharge"></i> 账户余额
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                可提现佣金：
                <el-input v-model="canByMoney"  class="handle-input mr10" disabled></el-input>
                <el-button type="primary" @click="openMoneyModel">提现</el-button>
                累计收益：
                <el-input v-model="countYield"  class="handle-input mr10" disabled></el-input>
            </div>
            <el-dialog
              title=""
              :visible.sync="moneyModel"
              width="40%">
                <el-form label-position="right" label-width="100px" :model="formMoney" :rules="rules" ref="login">
                    <el-form-item label="可提现金额">
                        <div style="color: #F56C6C;">{{canByMoney}}</div>
                  </el-form-item>
                  <el-form-item label="提现金额" prop="money">
                    <el-input v-model="formMoney.money" ></el-input>
                  </el-form-item>
                  <el-form-item label="姓名"  prop="name">
                    <el-input v-model="formMoney.name" :disabled="moneyInput"></el-input>
                  </el-form-item>
                  <el-form-item label="支付宝" prop="alipayAccount">
                    <el-input v-model="formMoney.alipayAccount" :disabled="moneyInput"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <span>{{formMoney.mobileFmt}}</span><el-button type="primary" :disabled="sendAuthCode" @click="getCode()">{{btnText}}</el-button>
                  </el-form-item>
                  <el-form-item label="手机验证码" prop="code">
                    <el-input v-model="formMoney.code"></el-input>
                  </el-form-item>
                </el-form>
              <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="moneyModel = false">取 消</el-button> -->
                <el-button type="primary" @click="cashMoney">申请提现</el-button>
              </span>
            </el-dialog>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="提现记录" name="first">
                    <el-table
                :data="extractHistoryData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column  type="index" width="50"  align="center"></el-table-column>
                <el-table-column prop="extract_money" label="提现金额" align="center"></el-table-column>
                <el-table-column  prop="create_time" label="提现时间" align="center">
                        <!--<template slot-scope="scope">{{formatDateAll(scope.row.createTime)}}</template>-->
                </el-table-column>
                <el-table-column prop="state" label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag type="" v-if="scope.row.state == 1">待审核</el-tag>
                        <el-tag type="warning" v-if="scope.row.state == 2">待付款</el-tag>
                        <el-tag type="success" v-if="scope.row.state == 3">已付款</el-tag>
                        <el-tag type="info" v-if="scope.row.state == 4">无效</el-tag>
                    </template>
                    
                </el-table-column>
                
            </el-table>
                </el-tab-pane>
                <el-tab-pane label="收益订单" name="second">
                    <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
            <el-table-column type="index" width="50"  align="center"></el-table-column>
            <el-table-column prop="order_no" label="订单编号" align="center"></el-table-column>
            <el-table-column prop="wtime" label="中标时间" align="center"></el-table-column>
            <el-table-column prop="taskType" label="任务类型" align="center">
                <template slot-scope="scope">
                    {{scope.row.task_type == 0 ? '起名' : '改名'}}
                </template>
            </el-table-column>
            <el-table-column prop="t_status" label="任务状态" align="center">
                    <template slot-scope="scope">
                            {{taskStatusFmt(scope.row.t_status)}}
                        </template>
            </el-table-column>
            <el-table-column prop="bonus" label="收益金额" align="center"></el-table-column>
            <el-table-column prop="first_name" label="姓名" align="center">
                    
                </el-table-column>
               <!-- <el-table-column prop="memo" label="备注" align="center"></el-table-column> -->
                
            </el-table>
                </el-tab-pane>
            </el-tabs>
            
            
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

      
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        var validateCode = (rule, value, callback) => {
            var param = {
                mobile: this.formMoney.mobile,
                verifyCode: this.formMoney.code
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
        var validateMoney = (rule, value, callback) => {
            if (parseFloat(value) > parseFloat(this.canByMoney)) {
                callback(new Error('金额超过可提现金额'));
            } else {
                callback();
            }
        };
        return {
            canByMoney: '',
            countYield: '',
            extractHistoryData: [],
            tableData: [],
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            activeName: 'first',
            moneyModel: false,
            moneyInput: false,
            auth_time: 180,
            sendAuthCode: false,
            authTimeTimer: null,
            btnText: '获取验证码',
            formMoney: {
                money: '',
                name: '',
                code: '',
                alipayAccount: '',
                guid: '',
                mobile: '',
                mobileFmt: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                money: [
                    { required: true, message: '请输入提现金额', trigger: 'blur' },
                    { validator: validateMoney, trigger: 'blur' },
                    { pattern: /^[0-9]*(\.[0-9]{1,2})?$/, message: '请输入正确的金额' }
                ],
                alipayAccount: [
                    { required: true, message: '请输入支付宝账号', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
        };
    },
    created() {
        this.getData();
        this.getList();
    },
    methods: {
        getData() {
			var that = this;
            var param = {
                merchantGuid: localStorage.getItem('merchantGuid'),
				page:1,
				size:10
              };
			  //accountBalance
            this.$http.post("/merchant/mhistory", "application/json", param, res => {
                if (res.data) {
                    // this.countYield = res.data.user.countYield;
                    // this.canByMoney = res.data.user.canByMoney;
                    // this.formMoney.mobile = res.data.mobile;
                    // var mobileFmt = res.data.mobile.substr(0, 3) + '****' + res.data.mobile.substr(7, 4);
                    // this.formMoney.mobileFmt = mobileFmt;
                    this.extractHistoryData = res.data.data;
					that.canByMoney=res.ext.can_by_money;
					that.countYield=res.ext.count_yield;
					
					
                }
            }, res => {
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
    
            })
        },
        // 任务状态格式化
        taskStatusFmt(val){
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
        getList() {
            var param = {
                merchantGuid: localStorage.getItem('merchantGuid'),
				page:1,
				size:10
              };
            this.$http.post("/merchant/revice", "application/json", param, res => {
                if (res.data) {
                    this.tableData = res.data;
                }
            }, res => {
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
    
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // 提现弹框
        openMoneyModel() {
            this.moneyModel = true;
            // 校验是否绑定支付宝
            var param = {
                merchantGuid: localStorage.getItem('merchantGuid'),
              };
            this.$http.get("/merchant/alipay/check", "application/json", param, res => {
                if (res.data) {
                    this.formMoney.guid = res.data.guid;
                    this.formMoney.name = res.data.name;
                    this.formMoney.alipayAccount = res.data.alipayAccount;
                    this.formMoney.mobile = res.data.mobile;
                    this.moneyInput = true;
                }
            }, res => {
                this.moneyInput = false;
    
            })
        },
        // 提现
        cashMoney() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    var param = {
                        guid: this.formMoney.guid,
                        merchantGuid: localStorage.getItem('merchantGuid'),
                        name: this.formMoney.name,
                        alipayAccount: this.formMoney.alipayAccount,
                        mobile: this.formMoney.mobile,
                        extractMoney: this.formMoney.money,
                        verifyCode:this.formMoney.code
                      };
                    this.$http.post("/merchant/alipay/bind", "application/json", param, res => {
                        if (res.data) {
                            this.$message.success('提现成功');
                            this.moneyModel = false;
                            this.getData();
                            this.getList();
                            this.$refs['login'].resetFields()
                            this.sendAuthCode = false;
                            this.btnText = '获取验证码';
                            clearTimeout(this.authTimeTimer);


                        }
                    }, res => {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
            
                    })
                }
            })

        },
        // 获取验证码
        getCode() {
            var param = {
                mobile: this.formMoney.mobile
            };
            this.auth_time = 180;
            this.sendAuthCode = true;
            // 发短信接口
            var param = {
            mobile: this.formMoney.mobile,
            type: '3'
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
        formatDateAll(now) { 
            var d = new Date(now);
            var year=d.getFullYear();  //取得4位数的年份
            var month=d.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
            var date=d.getDate();      //返回日期月份中的天数（1到31）
            var hour=d.getHours();     //返回日期中的小时数（0到23）
            var minute=d.getMinutes(); //返回日期中的分钟数（0到59）
            var second=d.getSeconds(); //返回日期中的秒数（0到59）
            return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
        }

    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
