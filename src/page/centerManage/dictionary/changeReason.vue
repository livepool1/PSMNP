<template>
  
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/Dept" :tableName="tableName"></ctable>

</template>

<script>
export default {
  name: "d_dept",
  data: function() {
     return {
       tableName:"变更管理",
       ruls:{
         alterName:[ { required: true, message: '请输入变更名称', trigger: 'blur' }],
         alterRemark:[ { required: true, message: '请输入变更备注', trigger: 'blur' }]
       },
       addWindows:{
         col: [
         {label:'变更名称' ,name:'alterName',value:'',type:''},
         {label:'变更备注' ,name:'alterRemark',value:'',type:''}
         ]
       },
       allCol:{
         alterNo: '',
         alterName: '',
         alterRemark: ''  
       },
       headerData: [
         { name: "alterNo", dataIndex: "变更编码" },
         { name: "alterName", dataIndex: "变更名称" },
         { name: "alterRemark", dataIndex: "变更备注" }
       ]
     };
  }
};
</script>

<style>
</style>