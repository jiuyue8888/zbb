<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
					<i class="el-icon-lx-recharge"></i> 个人信息
					
                </el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<el-button type="text" icon="el-icon-arrow-left" @click="goback()">编辑</el-button>
        <el-row :gutter="15">
			  	<el-col :span="8">
			  		<div class="grid-content bg-purple">
						<div class="container">
				        	<div class="head-left">
				        		<img :src="form.base_url+form.himg" alt="">
				        		<div class="head-text text-bold">{{form.nickname}}</div>
								<div class="head-text">
										<el-cascader  :options="options" v-model="form.regi" :disabled="true"></el-cascader>
								</div>
								
				        	</div>
				        	<div class="skill-wrap">
				        		<div class="title">技能</div>
				        		<div v-for="(item, index) in form.skill">
				        			<div class="skill-name">{{(index + 1) + '、' + item[0]}}</div>
				        			<el-progress :percentage="Number(item[1])" :show-text='false' :stroke-width="8"></el-progress>
				        		</div>
				        	</div>
				        </div>
				  	</div>
				  </el-col>
			  	<el-col :span="16">
			  		<div class="grid-content bg-purple">
						<div class="container">
				        	<div class="video-wrap" v-if="form.video!=undefined">
				        		<img  :src="form.video[0]" alt="">
				        	</div>
				        	<div class="image-wrap">
				        		<img v-if="form.photos.length > 0" :src="form.base_url+item[0]" alt="" v-for="item in form.photos">
				        	</div>
				        	<div class="introduce-wrap">
				        		<div class="title">简介</div>
				        		<div class="content" v-html="form.introduces">{{form.introduces}}</div>
				        	</div>
				        </div>
				  	</div>
				  </el-col>
			</el-row>
        
	</div>
	
</template>

<script>
	import { regionData } from 'element-china-area-data';
export default {
    name: '',
    data() {
        return {
        	form: {
				base_url: "",
				can_by_money: "",
				count_yield: "",
				create_time: "",
				email: "",
				guid: 2147483837,
				himg: "",
				introduces: "",
				mobile: "",
				nickname: "",
				photos: "",
				regi: "",
				skill: "",
				state: ""
			},
			options: regionData,
            
        };
	},
    created() {
        this.getData();
    },
    methods: {
        getData() {
			const that = this;
            var param = {
                merchantGuid: localStorage.getItem('merchantGuid'),
            };
            this.$http.get("/merchant/merinfo", "content-type: application/json", param, res => {
                if (res.data) {
                    this.form = res.data;
				const skill = res.data.skill.split(',');
				const photos = res.data.photos.split(',');
				const arr = [];
				const brr = [];
				skill.map((item,id)=>{
					if(id<skill.length-1){
					arr.push(item.split(':'));
					}

				})
				photos.map((obj,index)=>{
					if(index<photos.length-1)
				{
					brr.push(obj.split(':'));
				}

			})
				that.form.skill=arr;
				that.form.photos=brr;

                }
            }, res => {
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
    
            })
		},
		goback(){
			if(this.form.nickname==undefined&&this.form=={}){
				this.$router.push({ path: '/userinfo'});
			}else{
				this.$router.push({ path: '/userinfo', query: {flag: 'edit'}});
			}

        },
        
    }
};
</script>

<style scoped>
	.head-left {
		text-align: center;

	}
	.head-left img{
		width: 200px;
		height: 200px;
		border-radius: 20px;
	}
	.head-text {
		padding-top: 10px;
		font-size: 16px;
		color: #959494;
	}
	.text-bold {
		color: #333;
		font-weight: bold;
	}
	.skill-wrap {
		padding: 40px;
	}
	.title {
		font-size: 16px;
		color: #333;
		font-weight: bold;
	}
	.skill-name {
		font-size: 16px;
		color: #959494;
		padding: 10px 0;
	}
	.video-wrap {
		width: 100%;
		height: 300px;
		border: 1px solid #ddd;
		border-radius: 20px;
		margin-bottom: 20px;

	}
	.video-wrap img {
		width: 100%;
		height: 100%;
		border-radius: 20px;
	}
	.image-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.image-wrap img {
		width: 130px;
		height: 130px;
		border-radius: 10px;
		border: 1px solid #ddd;
	}
	.introduce-wrap {
		padding-top: 20px;
	}
	.introduce-wrap .content {
		font-size: 14px;
		color: #959494;
	}
</style>