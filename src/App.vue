<template>
  <div id="app">
    <!-- 头部导航 -->
    <router-view></router-view>
  </div>
</template>

<script>

import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'

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
      todo:[
        {item:'f',index:'as',id:1},
        {item:'a',index:'asd',id:2}
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
      role:"2"
    }
  },
  // created: function(){
  //   this.$router.push('/login');
  // },
  watch: {
    //  '$route': "checkLogin"
    //  function (to,from) {
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
    //     if(to.path == '/1') {
    //       this.todo = this.lzpSl[0]
    //       console.log(this.todo)
    //     } else if(to.path == '/2') {
    //       this.todo = this.lzpSl[1]
    //     } else if(to.path == '/3') {
    //       this.todo = this.lzpSl[2]
    //     } else if(to.path == '/4') {
    //       this.todo = this.lzpSl[3]
    //     } else if(to.path == '/5') {
    //       this.todo = this.lzpSl[4]
    //     }
    //     //  console.log(to)
    //     //  console.log(this.active)
    //  }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key);
      console.log(keyPath);
    },

    getCookie(name) {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
            return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
    },
    checkLogin() {
      if ( this.getCookie("session")!="1234" ) {
        this.$router.push("/login");
      } else {
        this.$router.push("/"+role);
        console.log("aaa")
      }
    },
    onSubmit() {
      document.cookie =  "session=" + this.form.name + this.form.pass +";";
      console.log(this.getCookie('session'));
      this.checkLogin();
    }
    // }

  }
  // watch: {
  //    '$route': checkLogin()
  //   //  function (to,from) {
  //       //  if(to.path == '/activePublic'){
  //       //      this.active = true ;
  //       //  }else if(to.path == '/activeManage'){
  //       //      this.active = false ;
  //       //  }
  //       // this.active = [
  //       //   false,
  //       //   false,
  //       //   false,
  //       //   false,
  //       //   false
  //       // ]
  //   //     if(to.path == '/1') {
  //   //       this.todo = this.lzpSl[0]
  //   //       console.log(this.todo)
  //   //     } else if(to.path == '/2') {
  //   //       this.todo = this.lzpSl[1]
  //   //     } else if(to.path == '/3') {
  //   //       this.todo = this.lzpSl[2]
  //   //     } else if(to.path == '/4') {
  //   //       this.todo = this.lzpSl[3]
  //   //     } else if(to.path == '/5') {
  //   //       this.todo = this.lzpSl[4]
  //   //     }
  //   //     //  console.log(to)
  //   //     //  console.log(this.active)
  //   //  }
  // }
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
