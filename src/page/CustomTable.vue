<template>
<div class="ctable">

<el-card class="box-card">
  <h3>活动列表</h3>
  <el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
    <el-col :span="3" style="width: 160px;text-align: center;">
      已选择{{ activeNum }}
    </el-col>
    <el-col :span="3" style="width: 140px;">
      <el-select v-model="currentType" placeholder="请选择活动分类">
        <el-option v-for="type in types" :value="type" :key="type">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <!--<el-button :plain="true" type="info">设置活动分类</el-button>-->
      <el-button :plain="true" @click.native="handleRemove" type="danger">删除</el-button>
      <!-- <el-button :plain="true" @click.native="handleMoveToTop" type="info">置顶</el-button>
      <el-button :plain="true" @click.native="handleCopy" type="info">复制</el-button> -->
    </el-col>
    <el-col :span="12" >
       <el-form :inline="true"  class="demo-form-inline" style=" margin-top: 20px;">
           <el-form-item >
             <el-input v-model="input" placeholder="请输入内容"></el-input>
          </el-form-item >
           <el-form-item >
          <el-button :plain="true" @click.native="handleQuery" type="info" >查询</el-button>
           </el-form-item >
       </el-form>
    </el-col>
  </el-row>

  <el-table :data="filteredTableData"  style="width: 100%" @cell-click="handleSelect" @selection-change="selectionchange">
    <el-table-column type="selection" width="50"></el-table-column>

    <template v-for="item in headerData">
        <el-table-column  :key="item.dataIndex" :label="item.dataIndex" :prop="item.name" ></el-table-column>
    </template>

    <el-table-column  fixed="right" label="操作" align="center" property="id">
    <template slot-scope="scope">
      <el-button type="text" size="mini" >详情/更改</el-button>
    </template>
    </el-table-column>
  </el-table>

  <el-row type="flex" justify="end" style="padding:20px 0; ">
    <el-pagination
      :current-page="5"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-row>
</el-card>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ctable",
  props: ['aheaderData','atableData'],
  data: function() {
    return {
      input: "",
      activeNum: 0,
      currentType: "全部",
      selectItems: [],
      types: ["全部", "测试活动", "免费活动", "收费活动"],
      headerData: [
        { name: "title", dataIndex: "活动名称" },
        { name: "type", dataIndex: "活动分类" },
        { name: "status", dataIndex: "活动状态" },
        { name: "readNum", dataIndex: "浏览数" },
        { name: "signUpNum", dataIndex: "报名数" },
        { name: "auditNum", dataIndex: "待审核" }
      ],
      tableData: [
        {
          id: "001",
          title: "王小虎",
          type: "测试活动",
          status: "已结束",
          readNum: 200,
          signUpNum: 100,
          auditNum: 100
        },
        {
          id: "002",
          title: "王小虎",
          type: "测试活动",
          status: "已结束",
          readNum: 200,
          signUpNum: 100,
          auditNum: 100
        },
        {
          id: "003",
          title: "王小虎",
          type: "测试活动",
          status: "已结束",
          readNum: 200,
          signUpNum: 100,
          auditNum: 100
        },
        {
          id: "004",
          title: "王小虎",
          type: "测试活动",
          status: "已结束",
          readNum: 200,
          signUpNum: 100,
          auditNum: 100
        }
      ]
    };
  },
  created: function() {
    this.init();
    console.log(this.aheaderData);
    console.log(this.atableData);
  },
  computed: {
    filteredTableData: function() {
      var type = this.currentType;
      return this.tableData.filter(function(data) {
        if (type == "全部" || type == "") {
          return true;
        } else {
          return data.type == type;
        }
      });
    }
  },
  methods: {
    init: function() {
      axios
        .get("/SpringVueTest/NGdept?from=0&to=100")//查询所有
        .then(function(response) {
            this.tableData=response;
            console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleSelect: function(row, column, cell, event) {
      if (column.label == "操作") {
        this.$router.push("/activeManage/detail/page1");
      } else if (column.type == "selection") {
        row.$info = !row.$selected;
      } else {
        row.$selected = !row.$selected;
        row.$info = row.$selected;
      }
    },
    selectionchange: function(val) {
      var arr = [];
      val.forEach(function(item) {
        arr.push(item.id);
      });
      this.selectItems = arr;
      this.activeNum = this.selectItems.length;
    },
    handleRemove: function() {
        var url = "/SpringVueTest/NGdept?" + "del = ";
      var tableData = this.tableData;
      this.selectItems.forEach(function(id) {
        tableData.forEach(function(data) {
          if (id == data.id) {
            //tableData.splice(tableData.indexOf(data), 1);
            url = url  + this.input + ",";
          }
        });
      });
      url.substr(0,url.length-1);

      axios
      .delete(url)           //批量删除 id
      .then(function(response) {
        console.log(response);
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.selectItems = [];
        this.init();
      })
      .catch(function(err) {
        this.$message.error('删除失败');
        console.log(err);
      });

    },
    handleQuery: function(){
        axios
        .get("/SpringVueTest/NGdept/" + this.input + "?from=0&to=100")//查询 id
        .then(function(response) {
            this.tableData=response;
            console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
<style>

</style>
