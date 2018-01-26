<template>
    <div class="queryTable">
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
            <el-table-column 
            v-for="item in headerDataa"
            :key="item.label"
             :label="item.label" 
             :prop="item.prop">
             </el-table-column>

            <el-table-column label="操作" align="center" property="id" width="180px">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="handleDelay(scope.$index, scope.row)">续订</el-button>
                    <el-button type="text" size="mini" @click="handleSub(scope.$index, scope.row)">退订/转址</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "queryTable",
  props: ['headerData','allCol'],
  data() {
      return {
          mainTableData: [
            {
              orderNo: "1",
              newspaperNo: "2",
              consumerNo: "3",
              empNo: "4",
              handleDate: "1",
              startDate: "2",
              finishDate: "1",
              totalPrice: "2",
              remaining: "1",
              paymentNo: "啊啊啊",
              center: "1",
              chargeNo: "2"
            },{
              orderNo: "2",
              newspaperNo: "2",
              consumerNo: "2",
              empNo: "2",
              handleDate: "2",
              startDate: "2",
              finishDate: "2",
              totalPrice: "2",
              remaining: "2",
              paymentNo: "2",
              center: "2",
              chargeNo: "2"
            },
          ],

          headerDataa: [
              {label:"订单编号1", prop:"orderNo"},
              {label:"订单编号2", prop:"newspaperNo"},
              {label:"订单编号3", prop:"consumerNo"},
              {label:"订单编号4", prop:"empNo"},
              {label:"订单编号5", prop:"handleDate"},
              {label:"订单编号6", prop:"startDate"}
          ],
          allCola: [
              {label:"订单编号1", prop:"finishDate"},
              {label:"订单编号2", prop:"totalPrice"},
              {label:"订单编号3", prop:"remaining"},
              {label:"订单编号4", prop:"paymentNo"},
              {label:"订单编号5", prop:"center"},
          ]
      }
  },
  created () {
      console.log(this.headerDataa)

  },

  methods: {
      inP(obj, text) {
          return obj[text]
      }
  }
};
</script>

<style>
</style>