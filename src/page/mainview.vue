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
            <el-menu-item v-bind:index="item.key" v-for="item in route" v-bind:key="item.key">{{item.item}}</el-menu-item>
          </el-menu>
        </el-col>

        <el-col :span="4">
          <el-badge :is-dot="hasNotice" style="margin-top: 10px;margin-right: 30px">
            <el-dropdown @command="handleCommand" style="margin-left:150px;">
              <span class="el-dropdown-link">
                <img style="width:40px; height:40px" src="../assets/logo.png" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="setting">用户设置</el-dropdown-item>
                <el-dropdown-item command="info">通知查看
                  <el-badge class="mark" :value="noticeNum" /></el-dropdown-item>
                <el-dropdown-item command="send">通知发送 </el-dropdown-item>
                <el-dropdown-item command="out" @click="out">注销 </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-badge>
        </el-col>
      </el-row>
    </header>
    <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>

    <!-- 通知查看 -->
    <el-dialog title="通知预览" :visible.sync="infoVisible">
      <div v-for="(item,index) in NoticeList" :key="item.noticeNo">
        <i class="el-icon-error di" @click="delNotice(index)" style="font-size:15pt; color:red; position:absolute; left:25px; buttom:-20px; z-index:500;"></i>
        <i v-if="item.readFlag==false" class="el-icon-warning" style="color:#D9E835;font-size:10pt;position:absolute;right:15px;buttom:-20px;z-index:500;"></i>
        <el-row style="margin-bottom: 18px">
          <el-card :body-style="{ padding: '0px' }">
            <div slot="header" style="height:15px">
              <span>From: {{item.fromEmp.empName}}_{{item.fromEmp.empId}}</span>
              <span style="position:absolute; right:50px; font-size:10pt">发送时间：{{item.initTime}}</span>
            </div>
            <div style="font-size: 14px;margin-bottom: 18px;margin-left: 20px;margin-top: 18px;">
              {{item.noticeInfo}}
            </div>
          </el-card>
        </el-row>
      </div>
    </el-dialog>

    <!-- 发送通知 -->
    <el-dialog title="发送通知" :visible.sync="sendVisible">
      <el-form :model="sendForm" ref="sendForm" :rules="sendFormRuls">
        <el-form-item label="收件人编号" prop="no">
          <el-input v-model="sendForm.no" @change="getOneByNo"></el-input>
        </el-form-item>
        <el-form-item label="收件人姓名" prop="to">
          <el-input readonly v-model="sendForm.to"></el-input>
        </el-form-item>
        <el-form-item label="消息内容" prop="desc">
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
        <el-menu class="el-menu-vertical-demo" :router="true">
          <el-menu-item v-for="item in todo" v-bind:key="item.id" v-bind:index="item.index">{{item.item}}</el-menu-item>
        </el-menu>
      </div>

      <!-- 右侧主内容区 -->
      <div class="main-right">
        <transition name="fade">
          <el-card>
            <router-view class="view"></router-view>
          </el-card>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import $ from "jquery";

import {
  centerConfig,
  a,
  customConfig,
  publishConfig,
  leaderConfig
} from "../mainview";

Vue.use(Element);

export default {
  name: "mainview",
  data: function() {
    return {
      // active:true,
      nowEmp: "",
      hasNotice: false,
      NoticeList: [],
      noticeNum: 0,
      infoVisible: false,
      settingVisible: false,
      sendVisible: false,
      sendForm: {
        to: "",
        no: "",
        desc: ""
      },
      sendFormRuls: {
        to: [{ required: true, message: "收信人为空" }],
        no: [{ required: true, message: "收信人不能为空" }],
        desc: [{ required: true, message: "消息不能为空" }]
      },
      active: [false, false, false, false, false],
      headerFixed: true,
      a: "1",
      title: "",
      route: [],
      todo: [],
      lzpSl: [],
      lzpSl2: [],
      sendMassage: {
        fromEmp: {
          empId: ""
        },
        toEmpId: "",
        noticeInfo: ""
      }
    };
  },

  mounted: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      if (this.$route.path[1] == "1") {
        this.route = centerConfig.routea;
        this.lzpSl = centerConfig.todo;
        this.todo = this.lzpSl[0];
        console.log(this.$router.path);
        console.log(this.$router);
        console.log(this);
        this.title = centerConfig.title;
      } else if (this.$route.path[1] == "3") {
        this.route = customConfig.routea;
        this.lzpSl = customConfig.todo;
        this.todo = this.lzpSl[0];
        this.title = customConfig.title;
      } else if (this.$route.path[1] == "2") {
        this.route = publishConfig.routea;
        this.lzpSl = publishConfig.todo;
        this.todo = this.lzpSl[0];
        this.title = publishConfig.title;
      } else if (this.$route.path[1] == "4") {
        this.route = leaderConfig.routea;
        this.lzpSl = leaderConfig.todo;
        this.todo = this.lzpSl[0];
        this.title = leaderConfig.title;
      } else if (this.$route.path[1] == "5") {
        this.route = leaderConfig.routea;
        this.lzpSl = leaderConfig.todo;
        this.todo = this.lzpSl[0];
        this.title = leaderConfig.title;
      }

      console.log("重新渲染钩子");
      console.log(this.$route.path);

      window.vue = this;
    });
  },
  created: function() {
    //   this.route = centerConfig.routea
    // console.log(leaderConfig.todo)
    // this.route = leaderConfig.routea
    // this.lzpSl = leaderConfig.todo
    // this.todo = this.lzpSl[0]
    this.nowEmp = this.getCookie("session");
    this.initNotice();

    var ws = new window.WebSocket("ws://115.159.34.95:8080/HEUPOMS/websocket"); //115.159.34.95:8080
    ws.onopen = function(val) {
      console.log("webSockrtOnpen");
    };
    ws.onmessage = function(val) {
      console.log("websocket收到通知");
    };
    //this.initWebSocket()
    console.log(this.$route.path);

    // this.lzpSl = []

    if (this.$route.path == "/1") {
      this.route = centerConfig.routea;
      this.lzpSl = centerConfig.todo;
      this.todo = this.lzpSl[0];
      console.log(this.$router.path);
      console.log(this.$router);
      console.log(this);
      this.title = centerConfig.title;
    } else if (this.$route.path == "/3") {
      this.route = customConfig.routea;
      this.lzpSl = customConfig.todo;
      this.todo = this.lzpSl[0];
      this.title = customConfig.title;
    } else if (this.$route.path == "/2") {
      this.route = publishConfig.routea;
      this.lzpSl = publishConfig.todo;
      this.todo = this.lzpSl[0];
      this.title = publishConfig.title;
    } else if (this.$route.path == "/4") {
      this.route = leaderConfig.routea;
      this.lzpSl = leaderConfig.todo;
      this.todo = this.lzpSl[0];
      this.title = leaderConfig.title;
    } else if (this.$route.path == "/5") {
      this.route = leaderConfig.routea;
      this.lzpSl = leaderConfig.todo;
      this.todo = this.lzpSl[0];
      this.title = leaderConfig.title;
    }

    console.log(this.route);
  },
  watch: {
    //watch 为什么无效呢
    infoVisible: function() {
      console.log("oooooo1");
      if (this.infoVisible == false) {
        console.log("oooooo2");
        this.initNotice();
      }
    }
  },
  methods: {
    getOneByNo() {
      var self = this;
      axios
        .get("/api/HEUPOMS/Notice/Emp/" + self.sendForm.no) //根据编号查姓名
        .then(function(response) {
          console.log(response.data);
          self.sendForm.to = response.data.empName;
        })
        .catch(function(err) {
          self.$message.error("连接服务器失败");
          console.log(err);
        });
    },
    delNotice(index) {
      ///Notice/DelToMe/{noticeNo}
      var self = this;
      axios
        .delete(
          "/api/HEUPOMS/Notice/DelToMe/" + this.NoticeList[index].noticeNo
        ) //删除信息
        .then(function(response) {
          self.$message.success("删除成功");
          axios
            .get("/api/HEUPOMS/Notice/SendToMe/" + self.nowEmp) //parseInt(this.nowEmp)       //查找未读消息数量
            .then(function(response) {
              console.log(response);
              self.NoticeList = response.data.list;
              self.infoVisible = true;
              self.hasNotice = false;
              self.noticeNum = 0;
            })
            .catch(function(err) {
              self.$message.error("连接服务器失败");
              console.log(err);
            });
        })
        .catch(function(err) {
          self.$message.error("连接服务器失败");
          console.log(err);
        });
    },
    initNotice() {
      var self = this;
      axios //Notice/UnRead/{fromEmpNo}
        .get("/api/HEUPOMS/Notice/UnRead/" + this.nowEmp) //parseInt(this.nowEmp)       //查找未读消息数量
        .then(function(response) {
          self.noticeNum = response.data;
          if (self.noticeNum > 0) self.hasNotice = true;
        })
        .catch(function(err) {
          self.$message.error("连接服务器失败");
          console.log(err);
        });
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    },
    sendSubmit() {
      this.$refs["sendForm"].validate(valid => {
        if (valid) {
          var self = this;
          self.sendMassage.fromEmp.empId = self.nowEmp;
          self.sendMassage.toEmpId = self.sendForm.no;
          self.sendMassage.noticeInfo = self.sendForm.desc;
          console.log(self.sendMassage);
          axios
            .post("/api/HEUPOMS/Notice/Send", self.sendMassage) //发送通知
            .then(function(response) {
              console.log(response);
              self.$message({
                message: "发送成功",
                type: "success"
              });
              self.sendVisible = false;
            })
            .catch(function(err) {
              self.$message.error("连接服务器失败");
              console.log(err);
            });
        } else {
          console.log("error submit!!");
        }
      });
    },
    handleSelect(key, keyPath) {
      console.log(key);
      console.log(keyPath);
      this.todo = this.lzpSl[parseInt(key) - 1];
    },
    handleCommand(command) {
      //菜单
      var self = this;
      if (command == "info") {
        axios
          .get("/api/HEUPOMS/Notice/SendToMe/" + this.nowEmp) //parseInt(this.nowEmp)       //查找未读消息数量
          .then(function(response) {
            console.log(response);
            self.NoticeList = response.data.list;
            self.infoVisible = true;
            self.hasNotice = false;
            self.noticeNum = 0;
            console.log(self.NoticeList);
          })
          .catch(function(err) {
            self.$message.error("连接服务器失败");
            console.log(err);
          });
      } else if (command == "setting") this.settingVisible = true;
      else if (command == "send") this.sendVisible = true;
      else this.out();
    },
    getCookie: function(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    },
    delCookie: function(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    out: function() {
      this.delCookie("session");
      this.router;
      vue.$router.push("/login");
    }
  },
  watch: {
    $route: function(to, from) {
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
      console.log(to);
      console.log(this.active);

      if (this.$route.path == "/1") {
        this.route = centerConfig.routea;
        this.lzpSl = centerConfig.todo;
        this.todo = this.lzpSl[0];
        console.log(this.$router.path);
        console.log(this.$router);
        console.log(this);
        this.title = centerConfig.title;
      } else if (this.$route.path == "/3") {
        this.route = customConfig.routea;
        this.lzpSl = customConfig.todo;
        this.todo = this.lzpSl[0];
        this.title = customConfig.title;
      } else if (this.$route.path == "/2") {
        this.route = publishConfig.routea;
        this.lzpSl = publishConfig.todo;
        this.todo = this.lzpSl[0];
        this.title = publishConfig.title;
      } else if (this.$route.path == "/4") {
        this.route = leaderConfig.routea;
        this.lzpSl = leaderConfig.todo;
        this.todo = this.lzpSl[0];
        this.title = leaderConfig.title;
      } else if (this.$route.path == "/5") {
        this.route = leaderConfig.routea;
        this.lzpSl = leaderConfig.todo;
        this.todo = this.lzpSl[0];
        this.title = leaderConfig.title;
      }
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue", "PingFang SC", Arial, sans-serif;
}
/* 头部导航 */
header {
  z-index: 1000;
  min-width: 1200px;
  transition: all 0.5s ease;
  border-top: solid 4px #3091f2;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
header.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
/* header .el-menu-demo{padding-left: 300px!important;} */

/* 主内容区 */
main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 800px;
  border: solid 40px #e9ecf1;
  background-color: #fcfcfc;
}
main .main-left {
  text-align: center;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 200px;
  flex: 0 0 200px;
}
main .main-right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background-color: #fff;
  padding: 50px 70px;
}
main .el-menu {
  background-color: transparent !important;
}
/*  */
.router-link {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #475669;
  text-decoration: none;
}
.is-active .router-link {
  color: #20a0ff;
}

/* 单选框 */
.el-form-item .el-radio + .el-radio {
  margin-left: 30px !important;
}
/* 路由切换动效 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

/* 导航栏菜单选中效果 */
.isActive {
  color: #20a0ff !important;
}
#app main .aside .is-active {
  color: #475669;
}

/* 卡片 */
.el-card {
  overflow: visible !important;
}
</style>
