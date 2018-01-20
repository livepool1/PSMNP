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
