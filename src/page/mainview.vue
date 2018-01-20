<template>
  <div id="app">
    <!-- 头部导航 -->
    <header class="header" :class="{ 'header-fixed' : headerFixed }">
    <el-row>
      <el-col :span="6" style="text-align: center; color: #409EFF;">
        <div class="" style="font-size: 20px;color: #409EFF;line-height: 60px;">{{title}}</div>
      </el-col>
        <el-col :span="18">
          <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item
              v-bind:index="item.key"
              v-for="item in route"
              v-bind:key="item.key">{{item.item}}</el-menu-item>
            <!-- <el-menu-item index="1">字典维护</el-menu-item>
            <el-menu-item index="2">人事管理</el-menu-item>
            <el-menu-item index="3">报刊设置</el-menu-item>
            <el-menu-item index="4">辅助业务</el-menu-item>
            <el-menu-item index="5">汇总</el-menu-item>
            <el-menu-item index="6">查询</el-menu-item> -->
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

          <!-- <el-menu
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
          </el-menu> -->
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

<script>

import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'

import {centerConfig, a, customConfig, publishConfig, leaderConfig} from '../mainview'

Vue.use(Element)

export default {
  name: 'app',
  data: function (){
    return {
      // active:true,
      active:[
        false,
        false,
        false,
        false,
        false
      ],
      headerFixed : true,
      a: "1",
      title: "",
      route:[
          {item:'啊啊啊',key:'1'},
          {item:'啊啊啊',key:'2'},
          {item:'啊啊啊',key:'3'},
          {item:'啊啊啊',key:'4'}
      ],
      todo:[
        {item:'郭勇良',index:'/1/dict',id:1},
        {item:'李照鹏',index:'/1/hur',id:2}
      ],
      lzpSl:[
        [
          {item:'f',index:'as',id:1},
          {item:'a',index:'asd',id:2}
        ],
        [
          {item:'a',index:'as',id:1},
          {item:'a',index:'asd',id:2}
        ],
        [
          {item:'d',index:'as',id:1},
          {item:'a',index:'asd',id:2}
        ],
        [
          {item:'f',index:'as',id:1},
          {item:'a',index:'asd',id:2}
        ],
        [
          {item:'g',index:'as',id:1},
          {item:'a',index:'asd',id:2}
        ]
      ],
      lzpSl2:[
          [
              {item:'aaa',key:'1'},
              {item:'aaa',key:'2'},
              {item:'aaa',key:'3'},
              {item:'aaa',key:'4'}
          ],
          [
              {item:'哦哦哦',key:'1'},
              {item:'哦哦哦',key:'2'},
              {item:'哦哦哦',key:'3'},
              {item:'哦哦哦',key:'4'}
          ],
          [
              {item:'呃呃呃',key:'1'},
              {item:'呃呃呃',key:'2'},
              {item:'呃呃呃',key:'3'},
              {item:'呃呃呃',key:'4'}
          ]
      ]
    }
  },
  created: function(){
    //   this.route = centerConfig.routea
    // console.log(leaderConfig.todo)
    // this.route = leaderConfig.routea
    // this.lzpSl = leaderConfig.todo
    // this.todo = this.lzpSl[0]

    console.log(this.$route.path)

    // this.lzpSl = []

    if(this.$route.path == '/1') {
      this.route = centerConfig.routea
      this.lzpSl = centerConfig.todo
      this.todo = this.lzpSl[0]
      console.log(this.$router.path)
      console.log(this.$router)
      console.log(this)
      this.title = centerConfig.title
    } else if(this.$route.path == '/2') {
      this.route = customConfig.routea
      this.lzpSl = customConfig.todo
      this.todo = this.lzpSl[0]
      this.title = customConfig.title
    } else if(this.$route.path == '/3') {
      this.route = publishConfig.routea
      this.lzpSl = publishConfig.todo
      this.todo = this.lzpSl[0]
      this.title = publishConfig.title
    } else if(this.$route.path == '/4') {
      this.route = leaderConfig.routea
      this.lzpSl = leaderConfig.todo
      this.todo = this.lzpSl[0]
      this.title = leaderConfig.title
    } else if(this.$route.path == '/5') {
      this.route = leaderConfig.routea
      this.lzpSl = leaderConfig.todo
      this.todo = this.lzpSl[0]
      this.title = leaderConfig.title
    }

    console.log(this.route)
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key);
      console.log(keyPath);

      this.todo = this.lzpSl[parseInt(key)-1]

    }

  },
  watch: {
     '$route': function (to,from) {
        //  if(to.path == '/activePublic'){
        //      this.active = true ;
        //  }else if(to.path == '/activeManage'){
        //      this.active = false ;
        //  }
        // this.active = [
        //   false,
        //   false,
        //   false,
        //   false,
        //   false
        // ]
        // if(to.path == '/1') {
        //   this.route = centerConfig.routea
        //   console.log(this.todo)
        // } else if(to.path == '/2') {
        //   this.route = customConfig.routea
        // } else if(to.path == '/3') {
        //   this.route = publishConfig.routea
        // } else if(to.path == '/4') {
        //   this.route = leaderConfig.routea
        // } else if(to.path == '/5') {
        //   this.route = leaderConfig.routea
        // }
         console.log(to)
         console.log(this.active)

         if(this.$route.path == '/1') {
           this.route = centerConfig.routea
           this.lzpSl = centerConfig.todo
           this.todo = this.lzpSl[0]
           console.log(this.$router.path)
           console.log(this.$router)
           console.log(this)
           this.title = centerConfig.title
         } else if(this.$route.path == '/2') {
           this.route = customConfig.routea
           this.lzpSl = customConfig.todo
           this.todo = this.lzpSl[0]
           this.title = customConfig.title
         } else if(this.$route.path == '/3') {
           this.route = publishConfig.routea
           this.lzpSl = publishConfig.todo
           this.todo = this.lzpSl[0]
           this.title = publishConfig.title
         } else if(this.$route.path == '/4') {
           this.route = leaderConfig.routea
           this.lzpSl = leaderConfig.todo
           this.todo = this.lzpSl[0]
           this.title = leaderConfig.title
         } else if(this.$route.path == '/5') {
           this.route = leaderConfig.routea
           this.lzpSl = leaderConfig.todo
           this.todo = this.lzpSl[0]
           this.title = leaderConfig.title
         }
     }
    
  }
}
</script>

<style>

body{margin: 0;}
#app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
}
/* 头部导航 */
header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease;  border-top: solid 4px #3091F2;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
/* header .el-menu-demo{padding-left: 300px!important;} */

/* 主内容区 */
main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 800px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
main .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 200px;flex: 0 0 200px;}
main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 50px 70px; }
main .el-menu{background-color: transparent!important;}
/*  */
.router-link{display:inline-block;width:100%;height:100%;text-align:center;color:#475669;text-decoration: none; }
.is-active .router-link{color:#20a0ff; }

/* 单选框 */
  .el-form-item .el-radio+.el-radio {
    margin-left: 30px!important;
  }
  /* 路由切换动效 */
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }

/* 导航栏菜单选中效果 */
  .isActive{color: #20a0ff!important;}
   #app main .aside .is-active{color: #475669;}

  /* 卡片 */
  .el-card{overflow: visible!important;}
</style>
