<template>
  <div class="bookSubOrder" v-loading="loading">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/2/commo/alterBook' }">更改订单信息</el-breadcrumb-item>
      <el-breadcrumb-item >{{routerParams}}号订单</el-breadcrumb-item>
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
        <el-form-item label="更改地区" label-width="120px">
          <el-select  placeholder="请选择地区" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更改地址" label-width="120px">
          <el-input v-model="changeAdd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleRedirect">确 定</el-button>
        </div>
    </el-dialog>



    <el-table :data="subData" style="width: 100%" @selection-change="selectionchange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="刊期时间" prop="issueDate"></el-table-column>
      <el-table-column label="地区" prop="location.locName"></el-table-column>
      <el-table-column label="详细地址" prop="subOrderLocDetail"></el-table-column>
      <el-table-column label="邮政编码" prop="location.postalCode"></el-table-column>
      <el-table-column label="投送标志" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.deliverFlag==true" type="primary"  close-transition>是</el-tag>
          <el-tag v-else type="success"  close-transition>否</el-tag>
        </template>
      </el-table-column>

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
      selectItems: [],
      subData: [],
      loading: false,
      activeNum: 0,
      routerParams: '',
      changeAdd: ''
    };
  },
  created: function() {
    this.routerParams = this.$route.params.bookNo;
    var self =this
    axios
    .get("/api/HEUPOMS/SubOrder/" + this.routerParams) //模糊查询
    .then(function(response) {
      console.log(response.data.subOrders);
      self.subData = response.data.subOrders;
      self.loading = false;
    })
    .catch(function(err) {
      console.log(err);
      self.loading = false;
    });
  },
  methods: {
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
    handleBack: function() {
      this.$confirm('退订将返还'+this.selectItems.length*this.subData[0].singlePrice+'元', '提示', {
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
        .post("/api/HEUPOMS/SubOrder/Del",delObj)      //删除
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
    handleRedirect: function() {
      //
      var tableData = this.subData
      var delArray = [];
      var delObj;
      var self = this
      this.selectItems.forEach(function(id) {
        tableData.forEach(function(data) {
          var iid
          for(var key in data){
             iid=data[key];
             break;
          }
          if (id == iid) {
            var tem=data[key]
            tem.location.locNo =   1;    //地区编号
            tem.subOrderLocDetail = self.changeAdd   //地址
            delArray.push(tem);
          }
        });
      });
      delObj = {
        subOrders:delArray
      };
      //
      axios
      .post("/api/HEUPOMS/SubOrder/Transfer",delObj)      //转址
      .then(function(response) {
        console.log(response);
        this.$message({
          type: 'success',
          message: '转址成功!'
        });
        this.init();
      })
      .catch(function(err) {
        self.$message.error('转址失败');
        console.log(err);
      });
    }
  }
};
</script>

<style>

</style>