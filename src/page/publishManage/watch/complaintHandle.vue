<template>
  <div class="complaintHandle" v-loading="loading">
    <!--监督内容-->
    <el-row style="margin-bottom: 18px;" v-for="(item,index) in watchData" :key="item.supervisionNo">
      <el-card :body-style="{ padding: '0px' }">
        <div slot="header" style="height:15px">
          <el-row>
            <!-- type="success" 表扬  已处理
            type="primary" 建议  未处理
            type="error" 投诉 -->
            <el-col :span="2">
              <el-tag v-if="item.supervisionType=='投诉'" size="medium" type="danger">投诉</el-tag>
              <el-tag v-if="item.supervisionType=='表扬'" size="medium" type="success">表扬</el-tag>
              <el-tag v-if="item.supervisionType=='建议'" size="medium" type="primary">建议</el-tag>
            </el-col>
            <el-col :span="2">
              <el-tag v-if="item.handleFlag==false" size="medium" type="primary">未处理</el-tag>
              <el-tag v-if="item.handleFlag==true" size="medium" type="success">已处理</el-tag>
            </el-col>
            <el-col :span="4" :offset="1">
              <span>From：{{item.consumer.consumerName}}</span>
            </el-col>
            <el-col :span="5" :offset="6">
              <span style="font-size:10pt">接收时间：{{item.initDate}}</span>
            </el-col>
            <el-col :span="3">
              <el-button v-if="item.sentFlag"  type="warning" plain size="mini" :loading="false" @click="handleIt(index)">设为已处理</el-button>
              <el-button v-else  disabled type="warning"  plain size="mini" @click="handleIt(index)">设为已处理</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 14px;margin-bottom: 18px;margin-left: 20px;margin-top: 18px;">
          {{item.supervisionInfo}}
        </div>
      </el-card>
    </el-row>
    <!--监督END-->

    <el-row type="flex" justify="end" style="padding:20px 0; ">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="totalData">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "complaintHandle",
  data: function() {
    return {
      watchData: [],
      pageSize: 10,
      nowPage: 1,
      totalData: 1000,
      loading: false
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    },
    init() {
      var self = this;
      self.loading = true;
      var s = self.getCookie("session");
      var distributionNo = s.substr(0, 2);
      axios
        .get(
          "/api/HEUPOMS/Supervision/Distribution/" +
            distributionNo +
            "?nowPage=" +
            this.nowPage +
            "&pageSize=" +
            this.pageSize
        ) //获取客服系统所有的反馈
        .then(function(response) {
          console.log(response.data);
          self.totalData = response.data.total;
          self.watchData = response.data.list;
          console.log(self.watchData);
          self.loading = false;
        })
        .catch(function(err) {
          self.$message.error("服务器错误");
          console.log(err);
          self.loading = false;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.nowPage = val;
      this.init();
    },
    handleIt(index) {
      var self = this;
      axios
        .put(
          "/api/HEUPOMS/Supervision/Distribution/Handle/" +
            self.watchData[index].supervisionNo
        )                                        //处理
        .then(function(response) {
          console.log(response.data);
          self.$notify({
            title: "成功",
            message: "已处理",
            type: "success"
          });
          self.init();
        })
        .catch(function(err) {
          self.$notify({
            title: "失败",
            message: "服务器错误",
            type: "error"
          });
          console.log(err);
        });
    }
  }
};
</script>

<style>
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
</style>
