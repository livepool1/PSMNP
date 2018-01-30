<template>
  <div v-loading="loading">
    <!--监督内容   (item, index) in items-->
    <el-row style="margin-bottom: 18px;" v-for="item in watchData" :key="item.supervisionNo">
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
            <el-col :span="3" :offset="2">
              <span style="font-size:10pt">{{item.distribution.distributionName}}</span>
            </el-col>
            <el-col :span="5">
              <span style="font-size:10pt">接收时间：{{item.initDate}}</span>
            </el-col>
            <el-col :span="5" v-if="item.handleFlag==true">
              <span style="font-size:10pt">处理时间：{{item.handleDate}}</span>
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
  name: "result",
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
    init() {
      var self = this;
      self.loading = true;
      axios
        .get(
          "/api/HEUPOMS/Supervision/Service/Sent?nowPage=" +
            this.nowPage +
            "&pageSize=" +
            this.pageSize
        ) //获取客服系统所有的反馈
        .then(function(response) {
          console.log(response.data);
          self.totalData = response.data.total;
          self.watchData = response.data.list;
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
    }
  }
};
</script>

<style>

</style>
