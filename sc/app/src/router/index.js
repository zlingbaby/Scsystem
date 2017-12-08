import Vue from 'vue'
import Router from 'vue-router'
import Student from '@/pages/student/index'
import StudentInfo from '@/pages/student/info'
import Course from '@/pages/course/index'
import CourseInfo from '@/pages/course/info'
import Clazz from '@/pages/clazz/index'
import ClazzInfo from '@/pages/clazz/info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/student',
      component: Student,
      children:[{
      	path:'info',
      	component:StudentInfo
      }]
    },
    {
      path: '/course',
      component: Course,
      children:[{
      	path:'info',
      	component:CourseInfo
      }]
    },{
      path:'/clazz',
      component:Clazz,
      children:[{
        path:'info',
        component:ClazzInfo
      }]
    }
  ]
})
