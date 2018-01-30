<template>
  
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/Dept" :tableName="tableName"></ctable>

</template>

<script>
export default {
  name: "d_dept",
  data: function() {
     return {
       tableName:"发行站管理",
       ruls:{
         distributionNo:[ { required: true, message: '请输入报社编号', trigger: 'blur' }],
         distributionName:[ { required: true, message: '请输入报社名称', trigger: 'blur' }],
         locNo:[ { required: true, message: '请输入报社位置编码', trigger: 'blur' }],
         distributionPersonName:[ { required: true, message: '请输入报社负责人', trigger: 'blur' }],
         distributionPersonContact:[ { required: true, message: '请输入负责人联系方式', trigger: 'blur' }]
       },
       addWindows:{
         col: [
         {label:'报社编号' ,name:'distributionNo',value:'',type:''},
         {label:'报社名称' ,name:'distributionName',value:'',type:''},
         {label:'报社位置编码' ,name:'locNo',value:'',type:''},
         {label:'报社负责人' ,name:'distributionPersonName',value:'',type:''},
         {label:'负责人联系方式' ,name:'distributionPersonContact',value:'',type:''}]
       },
       allCol:{
           distributionNo: "",
           distributionName: "",
           loc: {
               locNo: "",
               locName: "",
               postalCode: "",
               transUnit: null
           },
           distributionPersonName: null,
           distributionPersonContact: null
       },
       headerData: [
         { name: "distributionNo", dataIndex: "报社编号" },
         { name: "distributionName", dataIndex: "报社名称" },
         { name: "loc.locNo", dataIndex: "报社位置编码" },
         { name: "distributionPersonName", dataIndex: "报社负责人" },
         { name: "distributionPersonContact", dataIndex: "负责人联系方式" }
       ]
     };
  }
};
</script>

<style>
</style>