<template>
  <div id="mainview">
    <!-- 头部导航 -->
    <header class="header" :class="{ 'header-fixed' : headerFixed }">
    <el-row>
      <el-col :span="4" style="text-align: center; color: #409EFF;">
        <div class="" style="font-size: 20px;color: #409EFF;line-height: 60px;">{{title}}</div>
      </el-col>
        <el-col :span="16">
          <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item
              v-bind:index="item.key"
              v-for="item in route"
              v-bind:key="item.key">{{item.item}}</el-menu-item>
          </el-menu>
        </el-col>

      <el-col :span="4" >
        <el-badge is-dot style="margin-top: 10px;margin-right: 30px">
        <el-dropdown  @command="handleCommand" style="margin-left:150px;">
          <span class="el-dropdown-link" >
            <img  style="width:40px; height:40px" src="../assets/logo.png"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting" >用户设置</el-dropdown-item>
            <el-dropdown-item command="info" >通知查看 <el-badge class="mark" :value="12"/></el-dropdown-item>
            <el-dropdown-item command="send" >通知发送 </el-dropdown-item>
            <el-dropdown-item command="out">注销 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </el-badge>
      </el-col>
    </el-row>
    </header>
    <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>

<!-- 通知查看 -->
<el-dialog title="通知预览" :visible.sync="infoVisible">
<el-row style="margin-bottom: 18px">
  <el-card :body-style="{ padding: '0px' }">
    <div slot="header" style = "height:15px">
      <span>From:</span>
    </div>
    <div style="font-size: 14px;margin-bottom: 18px;margin-left: 20px;margin-top: 18px;">
     '列表内容'
    </div>
  </el-card>
</el-row>
<el-row style="margin-bottom: 18px">
  <el-card :body-style="{ padding: '0px' }">
    <div slot="header" >
      <span>From:</span>
    </div>
    <div  style="font-size: 14px;margin-bottom: 18px;margin-left: 20px;margin-top: 18px;  ">
     '列表内容'
    </div>
  </el-card>
</el-row>
</el-dialog>
<!-- 发送通知 -->
<el-dialog title="发送通知" :visible.sync="sendVisible">
  <el-form model="sendForm" >
    <el-form-item label="收件人">
      <el-input v-model="sendForm.to"></el-input>
    </el-form-item>
    <el-form-item label="消息内容">
      <el-input type="textarea" v-model="sendForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="sendSubmit">发送</el-button>
      <el-button @click="sendVisible = false">取消</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
<!-- 用户设置 -->
<el-dialog title="用户设置" :visible.sync="settingVisible">
</el-dialog>

    <main>
          <!-- 左侧导航 -->
        <div class="main-left">
          <el-menu 
           class="el-menu-vertical-demo" 
           :router="true">
            <el-menu-item 
            v-for="item in todo"
            v-bind:key="item.id"
            v-bind:index="item.index">{{item.item}}</el-menu-item>
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

<script>

import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'

import {centerConfig, a, customConfig, publishConfig, leaderConfig} from '../mainview'

Vue.use(Element)

export default {
  name: 'mainview',
  data: function (){
    return {
      // active:true,
      infoVisible : false,
      settingVisible : false,
      sendVisible : false,
      sendForm:{
        from:"",
        to:"",
        desc:""
      },
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

  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered

      if(this.$route.path[1] == '1') {
        this.route = centerConfig.routea
        this.lzpSl = centerConfig.todo
        this.todo = this.lzpSl[0]
        console.log(this.$router.path)
        console.log(this.$router)
        console.log(this)
        this.title = centerConfig.title
      } else if(this.$route.path[1] == '2') {
        this.route = customConfig.routea
        this.lzpSl = customConfig.todo
        this.todo = this.lzpSl[0]
        this.title = customConfig.title
      } else if(this.$route.path[1] == '3') {
        this.route = publishConfig.routea
        this.lzpSl = publishConfig.todo
        this.todo = this.lzpSl[0]
        this.title = publishConfig.title
      } else if(this.$route.path[1] == '4') {
        this.route = leaderConfig.routea
        this.lzpSl = leaderConfig.todo
        this.todo = this.lzpSl[0]
        this.title = leaderConfig.title
      } else if(this.$route.path[1] == '5') {
        this.route = leaderConfig.routea
        this.lzpSl = leaderConfig.todo
        this.todo = this.lzpSl[0]
        this.title = leaderConfig.title
      }

      console.log("重新渲染钩子");
      console.log(this.$route.path)
    })
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
    } else if(this.$route.path == '/3') {
      this.route = customConfig.routea
      this.lzpSl = customConfig.todo
      this.todo = this.lzpSl[0]
      this.title = customConfig.title
    } else if(this.$route.path == '/2') {
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
    sendSubmit(){
      console.log(this.sendForm);
    },
    handleSelect(key, keyPath) {
      console.log(key);
      console.log(keyPath);
      this.todo = this.lzpSl[parseInt(key)-1]
    },
    handleCommand(command){
      if(command == "info"){
        this.infoVisible= true;
      }
      else if(command == "setting")
         this.settingVisible= true;
      else if(command == "send")
         this.sendVisible= true;
      else
         this.out();
    },
    delCookie:function(name)
    {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval=getCookie(name);
      if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    },
    out: function(){
      this.delCookie("session");
      this.router;
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
         } else if(this.$route.path == '/3') {
           this.route = customConfig.routea
           this.lzpSl = customConfig.todo
           this.todo = this.lzpSl[0]
           this.title = customConfig.title
         } else if(this.$route.path == '/2') {
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
