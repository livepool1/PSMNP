<template>

  <div>
   <!-- <el-form ref="form" :model="form" label-width="80px">
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
   </el-form> -->

   <el-card class="box-card">
     <div slot="header" class="clearfix">
       <div style="vertical-align: middle;">
              <img src="../assets/bg1.jpg" width="100px;" style="display: inline;"/><span style="linee-height: 36.47px;margin-bottom: 10px;position: relative;
              bottom: 10px;
              left: 20px;">报刊发行管理系统</span>
       </div>
       <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
     </div>
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
   </el-card>


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
      var self=this;
      axios
      .put( this.server ,this.form)  //更新
      .then(function(response) {
          self.tableData=response;
          self.$message({
            message: '更新成功',
            type: 'success'
          });
          self.init();
          console.log(response);
      })
      .catch(function(err) {
        self.$message.error('更新失败');
        console.log(err);
      });
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

<style scoped>

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin: 0 auto;
    margin-top: 100px;
  }
</style>

