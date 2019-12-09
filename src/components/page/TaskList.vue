<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-sort"></i> 任务记录
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="order_no" label="订单号" align="center"></el-table-column>
                <el-table-column prop="package_name" label="任务类型" align="center"></el-table-column>
                <!-- <el-table-column prop="names" label="姓名" align="center">
                </el-table-column> -->
                <el-table-column prop="bonus" label="奖金" align="center"></el-table-column>
               <!-- <el-table-column prop="win" label="是否中标" align="center">
                    <template slot-scope="scope" v-if="scope.row.end">
                        {{scope.row.win ?  '中标' : '未中标'}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="ctime" label="投标时间" align="center">
                    <template slot-scope="scope">{{formatDateAll(scope.row.ctime)}}</template>
                </el-table-column>
                <el-table-column prop="wtime" label="中标时间" align="center">
                        <template slot-scope="scope" v-if="scope.row.end">{{formatDateAll(scope.row.winTime)}}</template>
                </el-table-column>
				
				<el-table-column prop="t_status" label="状态" align="center">
					<template slot-scope="scope" >{{t_status_by(scope.row)}}</template>
				</el-table-column>
				
				
				
				<el-table-column label="操作" width="210" align="center">
				    <template slot-scope="scope">
				       <el-button
				            type="primary"
				            size="mini"
				            @click="handleFind(scope.$index, scope.row)"
				        >查看</el-button>
				       
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

    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
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
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
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
			param = {
				"page": this.currentPage,
				"size": this.PageSize
			};
			//taskRecord
            this.$http.post("/merchant/task/list", "application/json", param, res => {
				//console.log(res," --== cs ");
                if (res.data) {
                    this.tableData = res.data;
                    this.totalCount = res.total;
                }
            }, res => {
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
    
            })
        },
        // 每页显示的条数 
        handleSizeChange(val) { 
            // 改变每页显示的条数 
            this.PageSize=val;
            this.currentPage=1 
        }, 
        // 显示第几页 
        handleCurrentChange(val) { 
            // 改变默认的页数
            this.currentPage=val;
        },
		t_status_by(row){
			//console.log(row,"--==s",row.t_status);
			var str ="efxx" ;
			if(row.t_status==1){
				str="已中标";
			}else if(row.t_status==2){
				str="未中标";
			}else if(row.t_status==3){
				str="待公布结果";
			}
			return str;
		},
        formatDateAll(now) { 
			if(!now){
				return "";
			}else{
				now = now*1000;
			}
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
