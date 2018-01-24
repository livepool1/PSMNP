// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routeConfig from './router-config'

import ctable from './components/CustomTable.vue'
import echarts_pie from './components/echarts_pie.vue'
import supervise from './components/supervise.vue'

import store from './store.js'

//加载路由中间件
Vue.use(VueRouter)
Vue.use(VueResource)

//定义路由
const router = new VueRouter({
  routes: routeConfig
})

const isLo = true;

// router.beforeEach((to, from, next) => {

//   // console.log(getCookie("session")[0])
//   // console.log(to.path[1])

//   console.log("钩子调用")

//   // function open() {
//   //   from.$alert('这是一段内容', '标题名称', {
//   //     confirmButtonText: '确定',
//   //     callback: action => {
//   //       this.$message({
//   //         type: 'info',
//   //         message: `action: ${ action }`
//   //       });
//   //     }
//   //   });
//   // }

//   console.log();
//   if( to.path != "/login") {
//     if ( getCookie("session") == null) {
//       console.log("无cookie")
//       // open();
//       next('/login')
//     } else {
//       if(getCookie("session")[0] != to.path[1]) {
//         console.log("越权访问！")
//         next("/" + getCookie("session")[0])
//         // router.push("/" + getCookie("session")[0])    
//       } else {
//         console.log("成功")
//         next()
//         // router.push("/login");
//       }
//     }
//   } else {
//     next()
//   }
  
//   // if(getCookie("session")[0] != to.path[1]) {
//   //     console.log("越权访问！")
//   //     router.push("/" + getCookie("session")[0])    
//   //   } else {
//   //     console.log("成功")
//   //     router.push("/login");
//   //   }

// })

Vue.component('ctable', ctable)
Vue.component('supervise', supervise)
Vue.component('echarts_pie', echarts_pie)

new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
})

function getCookie(name) {
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
  return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
}
function checkLogin() {
if ( this.getCookie("session")==null ) {
  this.$router.push("/login");
} else if(this.getCookie("session")[0] != to.path) {
    console.log("越权访问！")
    this.$router.push("/" + this.getCookie("session")[0])    
  }
}
