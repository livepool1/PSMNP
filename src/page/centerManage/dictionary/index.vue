<template>
  
  <ctable :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/SpringVueTest/NGdept" :tableName="tableName"></ctable>

</template>

<script>
import ctable from "../../CustomTable.vue";

export default {
  name: "dictionary",
  data: function() {
    return {
      tableName:"部门管理",
      addWindows:[
        {label:'编号' ,name:'id',value:'',type:''},
        {label:'员工编号' ,name:'empId',value:'',type:''},
        {label:'员工姓名' ,name:'empName',value:'',type:''},
        {label:'发行站编号' ,name:'dsbtId',value:'',type:''},
        {label:'职务' ,name:'work',value:'',type:''},
        {label:'业绩统计' ,name:'achievement',value:'',type:''},
        {label:'联系方式' ,name:'tel',value:'',type:''},
        {label:'家庭住址' ,name:'add',value:'',type:''},
        {label:'工资' ,name:'salary',value:'',type:''}
      ],
      allCol:{
        id: '',
        empId: '',
        empName: '',
        dsbtId: '',
        work: '',
        achievement: '',
        tel:'',
        add:'',
        salary: ''
      },
      headerData: [
        { name: "title", dataIndex: "员工编号" },
        { name: "type", dataIndex: "员工姓名" },
        { name: "status", dataIndex: "发行站编号" },
        { name: "readNum", dataIndex: "职务" },
        { name: "signUpNum", dataIndex: "业绩统计" },
        { name: "auditNum", dataIndex: "联系方式" }
      ]
    };
  },
};
</script>

<style>
</style>