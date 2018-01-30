<template>
  <div class="orderTermQuery" v-loading="loading">
    <el-row type="flex" align="middle" style="padding:20px 0;">
      <el-col :offset="2" :span="6">
        <template>
          <el-select v-model="selectV" placeholder="请选择到期范围">
            <el-option label="最近七天到期" value="1"></el-option>
            <el-option label="最近一个月到期" value="2"></el-option>
            <el-option label="最近一年到期" value="3"></el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :offset="6" :span="10">
        <el-form :inline="true" class="demo-form-inline" style=" margin-top: 20px;" cell-style="{style='font-size:50%;background:#00FF00;'}">
          <el-form-item>
            <el-input v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :plain="true" @click.native="handleQuery" type="info">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="mainTableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-for="item in allCol" :key="item.label" :label="item.label">
              <span>{{ setProp(props.row,item.prop) }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column v-for="item in headerData" :key="item.label" :label="item.label" :prop="item.prop">
      </el-table-column>
    </el-table>

    <el-row type="flex" justify="end" style="padding:20px 0; ">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="totalData">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "orderTermQuery",
  data() {
    return {
      service: "/api/HEUPOMS/Order",
      headerData: [
        { prop: "orderNo", label: "订单编号" },
        { prop: "newspaper.newspaperName", label: "报刊名" },
        { prop: "consumer.consumerName", label: "客户姓名" },
        { prop: "emp.empName", label: "办理人" },
        { prop: "totalPrice", label: "总价" }
      ],
      allCol: [
        { prop: "startDate", label: "起始订购时间" },
        { prop: "finishDate", label: "结束订购时间" },
        { prop: "handleDate", label: "办理时间" },
        { prop: "orderCount", label: "份数" },
        { prop: "payment.paymentName", label: "支付方式" }, //paymentName
        { prop: "charge.chargeName", label: "收费方式" }
      ],
      mainTableData: [],
      input: "",
      pageSize: 10,
      nowPage: 1,
      totalData: 1000,
      loading: true,
      selectV: ""
    };
  },
  created() {
    console.log(this.headerData);
    this.init();
  },
  watch: {
    selectV: function() {
      var status = this.selectV;
      console.log(status)
      var u = this.service + "/Expiring";
      if (status == 1) u = u+"/W";
      else if (status == 2) u = u+"/M";
      else if (status == 3) u = u+"/Y";
      var self = this;
      axios
        .get(u)               //按到期时间查询
        .then(function(response) {
          console.log("ddddddddddd");
          console.log(response.data.list);
          self.totalData = response.data.total;
          self.mainTableData = response.data.list;
          self.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          self.loading = false;
        });
    }
  },
  methods: {
    init() {
      var self = this;
      self.loading = true;
      axios
        .get(
          this.service + //查询全部
            "?nowPage=" +
            this.nowPage +
            "&pageSize=" +
            this.pageSize
        ) //模糊查询
        .then(function(response) {
          console.log("ddddddddddd");
          console.log(response.data.list);
          self.totalData = response.data.total;
          self.mainTableData = response.data.list;
          self.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          self.loading = false;
        });
    },
    setProp(row, index) {
      var s = index.split(".");
      console.log(s);
      s.forEach(element => {
        row = row[element];
      });
      return row;
    },
    handleQuery() {
      var self = this;
      self.loading = true;
      axios
        .get(
          //  模糊查询
          this.service +
            "/" +
            this.input +
            "?nowPage=" +
            this.nowPage +
            "&pageSize=" +
            this.pageSize
        )
        .then(function(response) {
          console.log(response.data.list);
          self.totalData = response.data.total;
          self.formData = response.data.list;
          self.loading = false;
        })
        .catch(function(err) {
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