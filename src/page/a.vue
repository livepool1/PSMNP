<template>
  <div>
      <header class="header" :class="{ 'header-fixed' : headerFixed }">
      <el-row>
          <el-col :span="24">
            <el-menu :default-active="a" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
              <el-menu-item index="1">中心站管理</el-menu-item>
              <el-menu-item index="2">发行站管理</el-menu-item>
              <el-menu-item index="3">财务管理</el-menu-item>
              <el-menu-item index="4">客服管理</el-menu-item>
              <el-menu-item index="5">领导查询</el-menu-item>
            </el-menu>
          </el-col>
      </el-row>
      </header>
      <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>

      <main>
            <!-- 左侧导航 -->
          <div class="main-left">
            <!-- <el-menu default-active="/activePublic" class="el-menu-vertical-demo" :router="true">
              <el-menu-item index="/activePublic" :class="{'isActive': active}">活动发布</el-menu-item>
              <el-menu-item index="/activeManage" :class="{'isActive': !active}">活动管理</el-menu-item>
            </el-menu> -->
            <el-menu 
             class="el-menu-vertical-demo" 
             :router="true">
              <el-menu-item 
              v-for="item in todo"
              v-bind:key="item.id"
              v-bind:index="item.index">{{item.item}}</el-menu-item>
            </el-menu>

            <el-menu
              default-active="2"
              class="el-menu-vertical-demo">
              <el-menu-item index="a">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="b">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="c">
                <i class="el-icon-setting"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
            </el-menu>
          </div>

            <!-- 右侧主内容区 -->
            <div  class="main-right" >
              <transition name="fade">
                <router-view class="view"></router-view>
              </transition>
            </div>
      </main>
  </div>
</template>
