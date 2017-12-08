import axios from 'axios'
export default {
  state:{
    classes:[]
  },
  getters:{
    classes:state=>state.classes
  },
  mutations:{
    alterClasses(state,data){
      state.classes = data;
    }
  },
  actions:{
    findAllClasses(context){//查找
      axios.get('http://192.168.248.200:3000/clazz/findAll').then(({data})=>{
        context.commit('alterClasses',data);
      })
    },
    saveClazz(context,form){//添加
      return new Promise(function(resolve,reject){
        axios.post('http://192.168.248.200:3000/clazz/save',form).then((result)=>{
          // 数据刷新
        context.dispatch('findAllClasses');
        resolve(result);
      }).catch((error)=>{
        reject(error);
      })
    })    
    },
    batchDeleteClazz(context,ids){//删除
      return new Promise(function(resolve,reject){
        axios.post('http://192.168.248.200:3000/clazz/batchDelete',{ids:ids}).then((result)=>{
          // 数据刷新
        context.dispatch('findAllClasses');
        resolve(result);
      }).catch((error)=>{
        reject(error);
      })
    })
    },
    updateClazz(context,form){//编辑
      return new Promise(function(resolve,reject){
        axios.post('http://192.168.248.200:3000/clazz/update',form).then((result)=>{
          // 数据刷新
        context.dispatch('findAllClasses');
        resolve(result);
      }).catch((error)=>{
        reject(error);
      })
    })
    }
  }
}
