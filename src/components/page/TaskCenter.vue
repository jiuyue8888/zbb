<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-home"></i> 任务大厅
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
				v-loading = "pictLoading"
				
				element-loading-text = "数据正在加载中"
				element-loading-spinner = "el-icon-loading"
            >
			<!-- element-loading-background = "rgba(0, 0, 0, 0.5)" -->
                <el-table-column type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="order_no" label="订单号" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click="handleWinnerInfo(scope.$index, scope.row)"
                        >{{scope.row.order_no}}</el-button>
                    </template>
                    
                </el-table-column>
                <el-table-column prop="first_name" label="姓氏" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.sex == 0 ? '女' : '男'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="born_time" label="出生日期" align="center">
                    <!--<template slot-scope="scope">{{formatDate(scope.row.bornTime)}}</template>-->
                     
                </el-table-column>
                <el-table-column prop="package_name" label="套餐" align="center">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.package_type == 1" type="success">{{scope.row.package_name}}</el-tag>
                        <el-tag v-if="scope.row.package_type == 2" type="warning">{{scope.row.package_name}}</el-tag>
                        <el-tag v-if="scope.row.package_type == 3" type="danger">{{scope.row.package_name}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="reply_count" label="回复总量" align="center"></el-table-column>
                <el-table-column prop="residualReplyCount" label="剩余回复数" align="center">
					<template slot-scope="scope">{{rynum_r(scope.row)}}</template>
				</el-table-column>
              <!--  <el-table-column prop="anum" label="新增回复数" align="center"></el-table-column> -->
                <el-table-column prop="create_time" label="发布时间" align="center">
                   <!-- <template slot-scope="scope">{{formatDateAll(scope.row.createTime)}}</template> -->
                </el-table-column>
                
                <el-table-column label="状态" align="center">
					<template slot-scope="scope" >{{t_status(scope.$index,scope.row)}}</template>
                   <!-- <template slot-scope="scope">
                        <el-tag v-if="scope.row.tender=='2'" type="success">已上传</el-tag>
                        <el-tag v-if="scope.row.tender!='1'" type="success">已投标</el-tag>
                        <el-tag v-if="scope.row.tender=='1'" type="success">待投标</el-tag>
                    </template> -->
                </el-table-column>
				
				<el-table-column label="操作" width="210" align="center">
				    <template slot-scope="scope">
				       <el-button
				            type="primary"
				            size="mini"
				            @click="handleFind(scope.$index, scope.row)"
				        >查看</el-button>
				        <el-button v-if="winShow[scope.$index]==2"
				            type="success"
				            size="mini"
                                   @click="handleWin(scope.$index, scope.row)"
				        >投标</el-button>
                        <el-button v-else
                                type="success"
                                size="mini"

                        >已投标</el-button>
                        <!-- :disabled="scope.row.status != '-1' || scope.row.tender!='1'" -->
				        <el-button v-if="edit[scope.$index]==2"
				            type="warning"
				            size="mini"
				            @click="handleEdit(scope.$index, scope.row)"
				        >稿件</el-button>
                        <el-button v-else
                                type="warning"
                                size="mini"
                        >已投稿</el-button>
                        <!--:disabled="scope.row.tender !='0'"  这里是编辑 状态 按钮 设置值的-->
				    </template>
				</el-table-column>
                
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" 
                          @current-change="handleCurrentChange" 
                          :current-page="currentPage" 
                          :page-sizes="pageSizes" 
                          :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                          :total="totalCount">
             </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
			pictLoading:false,
			//商家数据
			merchant_data:[],
            // 总数据 
            tableData:[], 
            // 默认显示第几页 
            currentPage:1, 
            // 总条数，根据接口获取数据长度(注意：这里不能为空) 
            totalCount:1, 
            // 个数选择器（可修改） 
            pageSizes:[10,15,20], 
            // 默认每页显示的条数（可修改） 
            PageSize:10,
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            winShow:[],
            edit:[]
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
			var that = this;
			this.pictLoading=true;
            var param = {
                "page": this.currentPage,
                "size": this.PageSize
            };
			/*
			param = {
				page:1,
				size:10
			}
			*/
            this.$http.post("/merchant/task/taskcenter", "application/json", param, res => {
                if (res.data) {
                    this.tableData = res.data;
                    this.totalCount = res.total;
					this.merchant_data = res.guid;

					//console.log(this.merchant_data," --=s");
                }
				that.pictLoading=false;
            }, res => {
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
				that.pictLoading=false;
            })
            // fetchData(this.query).then(res => {
            //     this.tableData = res.list;
            //     this.pageTotal = res.pageTotal || 50;
            // });
        },
        colorTypeFmt(val) {
            if (val == '0') {
                return 'warning'
            } else if (val == '1') {
                return 'info'
            } else if (val == '-1') {
                return ''
            }
        },
        statusFmt(val) {
            if (val == '0') {
                return '已满标'
            } else if (val == '1') {
                return '已完成'
            } else if (val == '-1') {
                return '待投标'
            }
        },
        tenderFmt(val) {
            if (val == '0') {
                return '已投标'
            } else if (val == '1') {
                return '待投标'
            } else if (val == '2') {
                return '待已标'
            }
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 投标操作
        handleWin(index, row) {

            const that = this;
          //  if (row.status == '-1') {
                this.$confirm('您确定参与投标吗？投标后72小时内必须上传稿件！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var param = {
                        merchantGuid: localStorage.getItem('merchantGuid'),
                        taskGuid: row.guid,
                    };
                    this.$http.post("/merchant/task/taskTender", "application/json", param, res => {
                        if (res.data) {
                            this.$message.success('投标成功');
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
                }).catch(() => {          
                });
                
           // }
            
        },
        // 订单号
        handleWinnerInfo(index, row) {
            // 跳转到固定的订单页面，后期调整
            
            this.$router.push({ path: '/winnerList', query: {row: row}});
        },
        // 查看操作
        handleFind(index, row) {
			console.log(row);
			window.open("http://www.zhubaba.cn/#/qiming/pub?id="+row.guid+"&m=sh");
			// location.href="";
            //这里到时候他会给一个链接 知道
            // this.$router.push({ path: '/taskDetail', query: {row: row}});
        },
        // 编辑操作
        handleEdit(index, row) {
            console.log(row);
            // return;
            this.$router.push({ path: '/taskEdit',  query: {row: row}});
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 每页显示的条数 
        handleSizeChange(val) { 
            // 改变每页显示的条数 
            this.PageSize=val;
            this.currentPage=1;
            this.getData();
        }, 
        // 显示第几页 
        handleCurrentChange(val) { 
            // 改变默认的页数
            this.currentPage=val;
            this.getData();
        },
        formatDate(now) { 
            var d = new Date(now);
            var year=d.getFullYear();  //取得4位数的年份
            var month=d.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
            var date=d.getDate();      //返回日期月份中的天数（1到31）
            var hour=d.getHours();     //返回日期中的小时数（0到23）
            var minute=d.getMinutes(); //返回日期中的分钟数（0到59）
            var second=d.getSeconds(); //返回日期中的秒数（0到59）
            return year+"-"+month+"-"+date; 
        },
		rynum_r(row){
			return row.reply_count-row.current_reply_count;
		},
		t_status(id,row){
            const that = this;
			var str ="未投标";
				var task_id = row.guid;

				if(this.merchant_data&&this.merchant_data.data){

					for(var index in this.merchant_data.data){
						// console.log(tmp,task_id,'0--s');
						var tmp = this.merchant_data.data[index];
						//console.log(tmp," -09s");

						if (tmp.task_id == task_id) {
							row.tid = tmp.tid;
							row.ren = tmp.t_status;
							if(tmp.memo){
								row.memo = tmp.memo;
							}
                            that.winShow[id]=1;

                            //that.row[id] = 1;
							//'状态 状态 0 默认值 已投标 ，1:已中标，2:未中标 ，3:稿件已发布 ，4:保留 ，5:保留 ， 6:作废',
							if(tmp.t_status==0){
								str="已投标/待提交稿件";
                                that.edit[id]=2;

							}else if(tmp.t_status==1){
								str="已中标";
                                that.edit[id]=1;

							}else if(tmp.t_status==2){
								str="未中标";
                                that.edit[id]=1;

							}else if(tmp.t_status==3){
								str="已发布";
                                that.edit[id]=1;

							}else if(tmp.t_status==4){
								str="稿件未提交";
                                that.edit[id]=2;

							}

							break;
						}else{
                            that.winShow[id]=2;
                            that.edit[id]=2;
                        }

					}
					
				}
			return str;
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
.el-button--mini, .el-button--mini.is-round{
    padding: 7px 10px;
}
</style>
