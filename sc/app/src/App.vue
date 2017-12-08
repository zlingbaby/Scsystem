<template>
  <div id="app">
  <header>
  <el-row>
    <el-col :span='4' class="title"><i class="el-icon-menu"></i>&nbsp;&nbsp;选课系统</el-col>
    <el-col :span='20'>
    	<div class="userPic"></div>
    </el-col>
  </el-row>
  </header>
  <article>
  	 <el-row>
    <el-col :span='4' class="navleft">
    	<el-menu
    	router=true
      default-active="2"
      class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu index="/student">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>学生管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/student/info">档案</el-menu-item>
          <el-menu-item index="/student/garder">成绩</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/course">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span>课程管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/course/info">信息</el-menu-item>
          <el-menu-item index="/course/test">test</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/clazz">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>班级管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/clazz/info">信息</el-menu-item>
          <el-menu-item index="/clazz/test">test</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </el-col>
    <el-col :span='20' class="container"> 
    <!-- 当路由发现改变,路由对映的模块显示到这里 -->
		<router-view></router-view>
    </el-col>
  </el-row>
  </article>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'app',
  mounted:function(){
  	$('.navleft').height($(window).height()-58);
  }
}
</script>

<style>
body{
	padding: 0;
	margin: 0;
}
header{
	background-color: #1f2d3d;
}
header .title{
	height: 58px;
	line-height: 58px;
	text-align: center;
	font-size: 20px;
	color: #fff;
}
.userPic{
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: pink;
	float: right;
	margin: 9px 30px;
}
.navleft{
	background-color: #545c64;
	height: 1000px;
}
.container{
	padding: 10px;
}
</style>
