<template>
 <div class="alterBook">
    <el-card class="box-card">
      <h3>更改订单信息</h3>

      <el-table  :data="mainTableData"  style="width: 100%" @cell-click="handleSelect" @selection-change="selectionchange">
        <el-table-column label="订单编号" prop="orderNo" ></el-table-column>
        <el-table-column label="报刊名编号" prop="newspaperNo" ></el-table-column>
        <el-table-column label="客户编号" prop="consumerNo" ></el-table-column>
        <el-table-column label="办理员工编号" prop="empNo" ></el-table-column>
        <el-table-column label="办理时间" prop="handleDate" ></el-table-column>
        <el-table-column label="总价" prop="totalPrice" ></el-table-column>
        <el-table-column label="剩余刊期数" prop="remaining" ></el-table-column>
        <!-- <el-table-column label="起始订购时间" prop="startDate" ></el-table-column>
        <el-table-column label="结束订购时间" prop="finishDate" ></el-table-column>

        <el-table-column label="支付方式编号" prop="paymentNo" ></el-table-column>
        <el-table-column label="收费方式编号" prop="chargeNo" ></el-table-column> -->
        <el-table-column  fixed="right" label="操作" align="center" property="id">
        <template slot-scope="scope">
          <el-button type="text" size="mini" >退订/转址</el-button>
          <el-button type="text" size="mini" >订单详情</el-button>
          <el-button type="text" size="mini" >订单详情</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-card >
 </div>
</template>
<script>
import axios from "axios";
export default {
  name: "alterBook",
  data: function() {
    return {
      mainTableData: [{
        orderNo:'1',
        newspaperNo:'2',
        consumerNo:'3',
        empNo:'4',
        handleDate:'',
        startDate:'',
        finishDate:'',
        totalPrice:'',
        remaining:'',
        paymentNo:'',
        center:'',
        chargeNo:''
      }]
    };
  },
  created: function() {

  },
  computed: {
  },
  methods: {
    selectionchange:function(){

    },
    handleSelect: function(){

    }
  }
};
</script>

<style>
</style>