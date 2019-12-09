<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button type="text" icon="el-icon-arrow-left" @click="goback()">返回</el-button>
        <div class="container">
            <el-form ref="form" :model="sizeForm" :rules="rules" label-width="80px" size="mini">
                <el-form-item label="名字1">
                    <el-input v-model="sizeForm.content1"></el-input>
                </el-form-item>
                <el-form-item label="名字2">
                    <el-input v-model="sizeForm.content2"></el-input>
                </el-form-item>
                <el-form-item label="名字3">
                    <el-input v-model="sizeForm.content3"></el-input>
                </el-form-item>
                <el-form-item label="名字4">
                    <el-input v-model="sizeForm.content4"></el-input>
                </el-form-item>
                <el-form-item label="名字5">
                    <el-input v-model="sizeForm.content5"></el-input>
                </el-form-item>
            </el-form>
            <quill-editor ref="myTextEditor" v-model="sizeForm.memo" :options="editorOption1"></quill-editor>
            <el-button class="editor-btn" type="primary" @click="submit">保存</el-button>
			<el-button class="editor-btn" type="primary" @click="submit_ry">发布稿件</el-button>
			
            <!-- <el-button class="editor-btn" type="primary" @click="punlic">发布</el-button> -->
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: 'editor',
        data: function(){
            return {
				tid:0,
				memoid:'',
                sizeForm: {
                    content1: '',
                    content2: '',
                    content3: '',
                    content4: '',
                    content5: '',
					
					c1:0,
					c2:0,
					c3:0,
					c4:0,
					c5:0,
					
                    memo: ''
                },
                
                editorOption1: {
                    placeholder: '请输入备注'
                },
                rules: {
                    content1: [{ required: true, message: '请输入名字1', trigger: 'blur' }],
                    content2: [{ required: true, message: '请输入名字2', trigger: 'blur' }],
                    content3: [{ required: true, message: '请输入名字3', trigger: 'blur' }],
                    content4: [{ required: true, message: '请输入名字4', trigger: 'blur' }],
                    content5: [{ required: true, message: '请输入名字5', trigger: 'blur' }],
                    memo: [{ required: true, message: '请输入名字1', trigger: 'blur' }],
                }
            }
        },
        components: {
            quillEditor
        },
        created() {
			this.initDataView(this.$route.query.row);
        },
        methods: {
			initDataView(row) {
				var that = this;
				if(row.memo){
					that.memoid=row.memo;
						this.$http.post("/merchant/task/gmax/"+row.memo, "application/json", {}, res => {
						    //console.log(res,"r");
						}, res => {
							//console.log(res,"xxx");
							that.sizeForm.memo=res;
						});
				}
				if(row.tid){
					var tid = row.tid;
					that.tid=tid;
					this.$http.post("/merchant/task/ryply/"+tid, "application/json", {}, res => {
					    if (res.data) {
					       console.log(res.data);
						   for(var index in res.data){
								var tmp = res.data[index];
								if(index ==0 ){
									that.sizeForm.content1=tmp.qcname;
									that.sizeForm.c1=tmp.rid;
								}else if(index ==1 ){
									that.sizeForm.content2=tmp.qcname;
									that.sizeForm.c2=tmp.rid;
								}else if(index ==2 ){
									that.sizeForm.content3=tmp.qcname;
									that.sizeForm.c3=tmp.rid;
								}else if(index ==3 ){
									that.sizeForm.content4=tmp.qcname;
									that.sizeForm.c4=tmp.rid;
								}else if(index ==4 ){
									that.sizeForm.content5=tmp.qcname;
									that.sizeForm.c5=tmp.rid;
								}
								
						   }
					    }
					}, res => {});
				}
			},
            onEditorChange({ editor, html, text }) {
                console.log(html);
                this.content1 = html;
            },
			submit_ry(){
				var that =this;
				if(this.tid){
					this.$http.post("/merchant/task/public/"+this.tid, "application/json", {}, res => {
					    //console.log(res,"r");
						  that.$message.success(res.msg);
					}, res => {
						that.$message.success(res.msg);
					});
				}
				
			},
            submit(){
				var that= this;
                this.$refs.form.validate(valid => {
                    if (valid) {
                        var row = this.$route.query.row;
                        var names = [this.sizeForm.content1, this.sizeForm.content2, this.sizeForm.content3, this.sizeForm.content4, this.sizeForm.content5];
                        
						var param = {	
                            merchantGuid: localStorage.getItem('merchantGuid'),
                            taskGuid: row.guid,
                            memo: this.sizeForm.memo,
                            names: names
                        };
						if(that.tid){
							param.tid= that.tid;
							param.tids=[
								that.sizeForm.c1,that.sizeForm.c2,that.sizeForm.c3,that.sizeForm.c4,that.sizeForm.c5
							];
						}
						if(that.memoid){
							param.memoid=that.memoid;
						}
						/// updateTaskReply
                        this.$http.put("/merchant/task/taskTenderReply ", "application/json", param, res => {
                            if (res.data) {
                                that.$message.success(res.msg);
								// console.log(res.data);
								that.tid = res.data;
                                // this.$router.push('/taskCenter');
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
                    }
                })
                
            },
            //发布
            punlic() {

            },
            goback(){
        	this.$router.go(-1)
        },
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>