<template>
    <div class="queryTable"  v-loading="loading">
        <el-row type="flex" align="middle" style="padding:20px 0;">
            <el-col :offset="12">
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
                        <el-form-item v-for="item in allCola" :key="item.label" :label="item.label">
                            <span>{{ props.row[item.prop] }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column v-for="item in headerDataa" :key="item.label" :label="item.label" :prop="item.prop">
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
  name: "queryTable",
  props: ["headerData", "allCol","service"],
  data() {
    return {
      mainTableData: [
        // {
        //   orderNo: "1",
        //   newspaperNo: "2",
        //   consumerNo: "3",
        //   empNo: "4",
        //   handleDate: "1",
        //   startDate: "2",
        //   finishDate: "1",
        //   totalPrice: "2",
        //   remaining: "1",
        //   paymentNo: "啊啊啊",
        //   center: "1",
        //   chargeNo: "2"
        // },
        // {
        //   orderNo: "2",
        //   newspaperNo: "2",
        //   consumerNo: "2",
        //   empNo: "2",
        //   handleDate: "2",
        //   startDate: "2",
        //   finishDate: "2",
        //   totalPrice: "2",
        //   remaining: "2",
        //   paymentNo: "2",
        //   center: "2",
        //   chargeNo: "2"
        // }
      ],
      input: "",
      pageSize: 10,
      nowPage: 1,
      totalData: 1000,
      loading: true
    };
  },
  created() {
    console.log(this.headerDataa);
  },

  methods: {
    init() {
      var self = this
      self.loading= true
      axios
        .get(
          this.service + //查询全部
            "?nowPage=" +
            this.nowPage +
            "&pageSize=" +
            this.pageSize
        ) //模糊查询
        .then(function(response) {
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
    handleQuery() {
      var self = this;
      self.loading = true;
      axios
        .get(                                              //  模糊查询
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