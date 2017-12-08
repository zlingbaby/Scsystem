import axios from 'axios'
import Vue from 'vue'
Vue.use(axios)

export default {
  state:{
    students:[]
  },
  getters:{
    students:state=>state.students
  },
  mutations:{
    alterStudent(state,data){
      state.students = data;
    }
  },
  actions:{
    findAllStudent(context){
      axios.get('http://192.168.248.200:3000/student/findAll').then(({data})=>{
        context.commit('alterStudent',data);
      })
    },
    saveStudent(context,form){
      return new Promise(function(resolve,reject){
      	 axios.post('http://192.168.248.200:3000/student/save',form).then((result)=>{
        // 页面刷新
	        context.dispatch('findAllStudent');
	        resolve(result);
	      }).catch(function(error){
	      	reject(error);
	      })
      })
    },
    batchDeleteStudent(context,ids){
    	return new Promise(function(resolve,reject){
			axios.post('http://192.168.248.200:3000/student/batchDelete',{ids:ids}).then(function(result){
			// 调用findAll
			context.dispatch("findAllStudent");
			resolve(result);
		}).catch(function(error){
			// 失败
			reject(error);
		})
		})
    },
    updateStudent(context,form){
    	return new Promise(function(resolve,reject){
      	 axios.post('http://192.168.248.200:3000/student/update',form).then((result)=>{
        // 页面刷新
	        context.dispatch('findAllStudent');
	        resolve(result);
	      }).catch(function(error){
	      	reject(error);
	      })
      })
    },
    queryStudent(context,keys){
      return new Promise(function(resolve,reject){
        axios.get('http://192.168.248.200:3000/student/query/'+keys).then(({data})=>{
        // 页面刷新
          context.commit('alterStudent',data);
          resolve(data);
        }).catch(function(error){
          reject(error);
        })
      })
    }
  }
}

