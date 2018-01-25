<template>
  <div class="bookSubOrder" v-loading="loading">
    <!-- 
    subOrderNo  子刊订单编号
    orderNo   订单编号
    issueDate  刊期时间
    subOrderLocNo  子订单地区编号
    subOrderLocDetail    子订单详细地址
    postalCode    邮政编码
    deliverFlag     投送标志
     -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/2/commo/alterBook' }">更改订单信息</el-breadcrumb-item>
      <el-breadcrumb-item >{{form.orderNo}}号订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" align="middle"  style="padding:20px 0;margin-top:50px">
      <el-col  :span="3" style="width: 160px;text-align: center;">
        已选择{{ activeNum }}
      </el-col>
      <el-col :span="9">
        <el-button :plain="true" @click="handleBack" type="danger">退订</el-button>
        <el-button :plain="true" @click="dialogFormVisible = true" type="primary">转址</el-button>
      </el-col>
    </el-row>
    

    <el-dialog title="转址" :visible.sync="dialogFormVisible">
      <el-form >
        <el-form-item label="当前地址" label-width="120px">
          <el-input auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="更改地区" label-width="120px">
          <el-select  placeholder="请选择地区" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更改地址" label-width="120px">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleRedirect">确 定</el-button>
        </div>
    </el-dialog>



    <el-table :data="subData" style="width: 100%" @selection-change="selectionchange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="子刊订单编号" prop="subOrderNo"></el-table-column>
      <el-table-column label="刊期时间" prop="issueDate"></el-table-column>
      <el-table-column label="地区编号" prop="subOrderLocNo"></el-table-column>
      <el-table-column label="详细地址" prop="subOrderLocDetail"></el-table-column>
      <el-table-column label="邮政编码" prop="postalCode"></el-table-column>
      <el-table-column label="投送标志" prop="deliverFlag"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "bookSubOrder",
  data: function() {
    return {
      dialogFormVisible :false,
      form: {},
      selectItems: [],
      subData: [
        {
          subOrderNo: "11",
          issueDate: "22",
          subOrderLocNo: "11",
          subOrderLocDetail: "22",
          postalCode: "11",
          deliverFlag: "22"
        }
      ],
      loading: false,
      activeNum: 0
    };
  },
  created: function() {
    let routerParams = this.$route.params.dataObj;
    this.form = routerParams;
    this.init();
  },
  methods: {
    init: function() {
      var self = this;
      axios
        .get("") //查询所有
        .then(function(response) {
          console.log(response);
          var tem = response.data;
          self.subform = tem["list"];
          self.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          self.$message.error("数据获取失败");
          self.loading = false;
        });
    },
    selectionchange: function(val) {
      var arr = [];
      val.forEach(function(item) {
        for (var key in item) {
          arr.push(item[key]);
          break;
        }
      });
      this.selectItems = arr;
      this.activeNum = this.selectItems.length;
    },
    handleBack: function(index, row) {
      this.$confirm('退订将返还10元', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        //
        var tableData = this.subData
        var delArray = [];
        var delObj;
        this.selectItems.forEach(function(id) {
          tableData.forEach(function(data) {
            var iid
            for(var key in data){
               iid=data[key];
               break;
            }
            if (id == iid) {
              var temp={
                id:id
                };
              delArray.push(temp);
            }
          });
        });
        delObj = {
          res:delArray
        };
        var self=this;
        //
        axios
        .post("",delObj)      //删除
        .then(function(response) {
          console.log(response);
          this.$message({
            type: 'success',
            message: '退订成功!'
          });
          this.init();
        })
        .catch(function(err) {
          self.$message.error('退订失败');
          console.log(err);
        });
      }).catch(() => {
        console.log("取消操作")     
      });
    },
    handleRedirect: function(index, row) {
      //
      var tableData = this.subData
      var delArray = [];
      var delObj;
      this.selectItems.forEach(function(id) {
        tableData.forEach(function(data) {
          var iid
          for(var key in data){
             iid=data[key];
             break;
          }
          if (id == iid) {
            var temp={
              id:id
              };
            delArray.push(temp);
          }
        });
      });
      delObj = {
        
        res:delArray
      };
      var self=this;
      //
    }
  }
};
</script>

<style>

</style>