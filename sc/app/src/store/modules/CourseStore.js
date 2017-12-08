import axios from 'axios'
import Vue from 'vue'
Vue.use(axios)
export default{
	state:{
		courseDate:[]
	},
	getters:{
		courseDate:state=>state.courseDate
	},
	mutations:{
		alertCourse(state,data){
			state.courseDate = data;
		}
	},
	actions:{
		findAllCourse(context){//查找
      	axios.get('http://192.168.248.200:3000/course/findAll').then(({data})=>{
        context.commit('alertCourse',data);
      })
    },
    saveCourse(context,form){//添加
    	 return new Promise(function(resolve,reject){
      	 axios.post('http://192.168.248.200:3000/course/save',form).then((result)=>{
        // 页面刷新
	        context.dispatch('findAllCourse');
	        resolve(result);
	      }).catch(function(error){
	      	reject(error);
	      })
      })
    },
    batchDeleteCourse(context,ids){//删除
    	 return new Promise(function(resolve,reject){
      	 axios.post('http://192.168.248.200:3000/course/batchDelete',{ids:ids}).then((result)=>{
        // 页面刷新
	        context.dispatch('findAllCourse');
	        resolve(result);
	      }).catch(function(error){
	      	reject(error);
	      })
      })
    },
    updateCourse(context,form){//修改
    	return new Promise(function(resolve,reject){//异步操作
    		axios.post('http://192.168.248.200:3000/course/update',form).then((result)=>{
    			context.dispatch('findAllCourse');
    			resolve(result);
    		}).catch((error)=>{
    			reject(error);
    		})
    	})
    }
	}
}