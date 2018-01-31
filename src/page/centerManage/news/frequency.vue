<template>
  
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/Issue" :tableName="tableName"></ctable>

</template>

<script>
export default {
  name: "d_dept",
  data: function() {
    return {
      tableName:"刊期管理",
      ruls:{
        issueName:[ { required: true, message: '请输入刊期名称', trigger: 'blur' }],
        dayModulus:[ { required: true, message: '请输入日价折扣', trigger: 'blur' }],
        weekModulus:[ { required: true, message: '请输入周价折扣', trigger: 'blur' }],
        halfMonthModulus:[ { required: true, message: '请输入半月折扣', trigger: 'blur' }],
        monthModulus:[ { required: true, message: '请输入月份折扣', trigger: 'blur' }],
        seasonModulus:[ { required: true, message: '请输入季度折扣', trigger: 'blur' }],
        halfYearModulus:[ { required: true, message: '请输入半年折扣', trigger: 'blur' }],
        yearModulus:[ { required: true, message: '请输入年度折扣', trigger: 'blur' }]
      },
      addWindows:{
        col: [
        {label:"刊期名称",name:"issueName",value:"",type:""},
        {label:"日价折扣",name:"dayModulus",value:"",type:""},
        {label:"周价折扣",name:"weekModulus",value:"",type:""},
        {label:"半月折扣",name:"halfMonthModulus",value:"",type:""},
        {label:"月份折扣",name:"monthModulus",value:"",type:""},
        {label:"季度折扣",name:"seasonModulus",value:"",type:""},
        {label:"半年折扣",name:"halfYearModulus",value:"",type:""},
        {label:"年度折扣",name:"yearModulus",value:"",type:""}]
      },
      allCol:{
          issueNo: "",
          issueName: "",
          dayModulus: "",
          weekModulus: "",
          halfMonthModulus: "",
          monthModulus: "",
          seasonModulus: "",
          halfYearModulus: "",
          yearModulus: ""
      },
      headerData: [
        { name: "issueNo", dataIndex: "刊期编码" },
        { name: "issueName", dataIndex: "刊期名称" },
        { name: "dayModulus", dataIndex: "日价折扣" },
        { name: "weekModulus", dataIndex: "周价折扣" },
        { name: "halfMonthModulus", dataIndex: "半月折扣" },
        { name: "monthModulus", dataIndex: "月份折扣" },
      ]
    };
  },
};
</script>

<style>
</style>