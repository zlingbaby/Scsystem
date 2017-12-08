<template>
	<div class="ClazzInfo">
		<el-row class="header">
			<el-col :span='6'>
				<el-input v-model="keywords" placeholder="请输入关键字"></el-input>
			</el-col>
			<el-col :span='18' class="saveOptions">
			    <el-button plain @click="handleSingleSave">单个录入</el-button>
			    <el-button plain>批量导入</el-button>
		  	</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-table :data="classes" style="width: 100%">
				      <el-table-column prop="name" label="班级名">
				      </el-table-column>
				      <el-table-column label="操作"  width="180">
					      <template scope="scope">
					        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
					        </el-button>
					        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					      </template>
			    	</el-table-column>			    	
		    	</el-table>
			</el-col>
		</el-row>
		<el-dialog :title="title" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="班级名"  >
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item> 
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="tosubmit">确 定</el-button>
          </div>
        </el-dialog>
	</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
	export default{
		name:'ClazzInfo',
		data:function(){
			return{
				keywords:'',
				form:{},
				title:'',
				dialogFormVisible:false
			}
		},
		methods:{//确认提交
			tosubmit(){
				this.dialogFormVisible=false;
				var vm=this;
				if(this.title=='录入班级信息'){
					this.saveClazz(vm.form);
				}
				this.updateClazz(vm.form).then(function(result){
				vm.$message({
				type: 'success',
				message: '操作成功!'
			});
				}).catch(function(error){
				vm.$message({
				type: 'error',
				message: '操作失败!'
				});
			});	
			},//录入班级信息
			handleSingleSave(){
				this.dialogFormVisible=true;
				this.title='录入班级信息';

			},//编辑
			handleEdit(index,row){
				this.dialogFormVisible=true;
				this.title='编辑班级信息';
				this.form=row;
			},//删除
			handleDelete(index,row){
				var vm=this;
				this.batchDeleteClazz([row.id]).then(function(result){
					vm.$message({
						type:'success',
						message:'操作成功!'
					})
				}).catch(function(error){
					vm.$message({
						type:'error',
						message:'操作失败!'
					})
				})
			},//执行
			...mapActions(['findAllClasses','saveClazz','batchDeleteClazz','updateClazz'])
		},
		created(){
			//调用
			this.findAllClasses();
			// this.saveClazz();
			// this.batchDeleteClazz();
			// this.updateClazz();
		},
		computed:{//得到classes中的数据
			...mapGetters(['classes'])
		}
	}
</script>
<style scoped>
	.saveOptions{
    text-align: right;
  }
  .StudentInfo .header {
    margin: 5px 0;
  }
</style>