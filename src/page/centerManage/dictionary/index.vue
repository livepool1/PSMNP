<template>
  
  <ctable :formWindow='addWindows' :aform="allCol" :headerData="headerData" :tableData="tableData" server="/SpringVueTest/NGdept" tableName="活动查询"></ctable>

</template>

<script>
import ctable from "../../CustomTable.vue";

export default {
  name: "dictionary",
  data: function() {
    return {
      addWindows:[
        {label:'编号' ,value:'form.id'},
        {label:'标题' ,value:'form.title'},
        {label:'类型' ,value:'form.type'},
        {label:'状态' ,value:'form.status'},
        {label:'11' ,value:'form.readNum'},
        {label:'22' ,value:'form.signUpNum'},
        {label:'33' ,value:'form.auditNum'}
      ],
      allCol:{
        id: '',
        title: '',
        type: '',
        status: '',
        readNum: '',
        signUpNum:'',
        auditNum: ''
      },
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
};
</script>

<style>
</style>