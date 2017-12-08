<template>
	<div class="CourseInfo">
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
				<el-table :data="courseDate" style="width: 100%">
				      <el-table-column prop="name" label="课程名字"></el-table-column>
				      <el-table-column prop="credit" label="学分"></el-table-column>
				      <el-table-column label="操作" width="180">
					      <template scope="scope">
					        <el-button
					          size="small"
					          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					        <el-button
					          size="small"
					          type="danger"
					          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					      </template>
			    	</el-table-column>
			    </el-table>
			</el-col>
		</el-row>
		<el-dialog :title="title" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="课程名字" >
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="学分" :label-width='labelWidth'>
            	<el-input v-model="form.credit" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex';
	export default{
		name:'CourseInfo',
		computed:{
			...mapGetters(['courseDate'])
		},
		data(){
			return{
				keywords:'',
				title:'',
				dialogFormVisible:false,
				form:{}	
			}
		},
		methods:{
			submit(){//确认提交
				this.dialogFormVisible=false;
				var vm=this;
				if(this.title=='录入单个课程信息'){
					this.saveCourse(vm.form);
				}
				this.updateCourse(vm.form).then(function(result){
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
			
			},
			handleEdit(index,row){
				this.dialogFormVisible=true;
				this.title='修改课程信息';
				this.form=row;
			},
			handleDelete(index,row){
				// console.log(row.id);
				var vm=this;
				this.batchDeleteCourse([row.id]).then(function(result){
				vm.$message({
				type: 'success',
				message: '删除成功!'
			});
				}).catch(function(error){
				vm.$message({
				type: 'error',
				message: '删除失败!'
				});
			});	
			},
			handleSingleSave(){
				this.dialogFormVisible=true;
				this.title='录入单个课程信息';
			},
			...mapActions(['findAllCourse','saveCourse','batchDeleteCourse','updateCourse'])
		},
		created(){
			this.findAllCourse();
			// this.saveCourse();
			// this.batchDeleteCourse();
			// this.updateCourse();
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