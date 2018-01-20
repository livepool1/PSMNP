<template>
  <div>
   <el-form ref="form" :model="form" label-width="80px">
   <el-form-item label="用户名">
     <el-input v-model="form.name"></el-input>
   </el-form-item>
   <el-form-item label="密码" prop="pass">
     <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
   </el-form-item>
   <el-form-item label="用户类别">
     <el-select v-model="form.type" placeholder="请选择登陆身份">
       <el-option label="一" value="1"></el-option>
       <el-option label="二" value="2"></el-option>
     </el-select>
   </el-form-item>
   <el-form-item>
     <el-button type="primary" @click="onSubmit">登陆</el-button>
     <el-button>注册</el-button>
   </el-form-item>
   </el-form>
  </div>
</template>

<script>

export default {
  name: "login",
  data: function() {
  return {
    form: {
      name: '',
      pass: '',
      type: ''
    }
  }
},
watch: {
  $route: "checkLogin"
},
created: function(){
  //   this.route = centerConfig.routea
  if ( this.getCookie("session") != null) {
        // route.push('/login')
        this.$router.push("/" + this.getCookie("session")[0])
        // next("/" + getCookie("session")[0])
      }
},
methods: {
    getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
        return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
    },
    checkLogin() {
      if ( this.getCookie("session")!="1234" ) {
        this.$router.push("/login");
      } else {
        this.$router.push("/1");
      }
    },
    onSubmit() {
    document.cookie =  "session=" + this.form.name + this.form.pass +";";
    console.log(this.getCookie('session'));
    this.checkLogin();
  }
}
};

</script>

<style>
</style>
