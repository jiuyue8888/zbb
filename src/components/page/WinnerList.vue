<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-sort"></i> 投标记录
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button type="text" icon="el-icon-arrow-left" @click="goback()">返回</el-button>
        <div style="width: 100%;text-align: center;padding-top: 100px;" v-if="!showList">
            <img src="../../assets/img/lostIcon.png" alt="">
        </div>
        <div class="container" v-if="showList">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="index" width="50" align="center"></el-table-column>
                <el-table-column prop="nickName" label="商户名称" align="center"></el-table-column>
                <el-table-column prop="introduceMyself" label="自我介绍" align="center"></el-table-column>
                <el-table-column prop="taskReplies" label="taskReplies" align="center"></el-table-column>
                
            </el-table>
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
        return {
            show: false,
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
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
        var row = this.$route.query.row;
        if (row.status == '1') {
            this.showList = true;
            this.getData();
        } else {

        }
        
    },
    methods: {
        getData() {
            var row = this.$route.query.row;
            var param = {
                taskGuid: row.guid,
            };
            this.$http.get("/merchant/replyTask", "application/json", param, res => {
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
        goback(){
        	this.$router.go(-1)
        },
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
