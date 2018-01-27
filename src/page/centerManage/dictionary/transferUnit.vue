<template>
<div>  <p>bbbbb</p>
    <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/TransUnit" :tableName="tableName"></ctable></div>


</template>

<script>
export default {
  name:'job',
  data: function() {
     return {
       tableName:'',
       ruls:{
         transUnitNo:[ { required: true, message: '请输入运输单位编码', trigger: 'blur' }],
         transUnitName:[ { required: true, message: '请输入单位名称', trigger: 'blur' }],
         locNo:[ { required: true, message: '请输入单位位置编号', trigger: 'blur' }],
         transUnitPersonName:[ { required: true, message: '请输入单位负责人', trigger: 'blur' }],
         transUnitPersonContact:[ { required: true, message: '请输入联系方式', trigger: 'blur' }]
       },
       addWindows:{
         col: [
         {label:'单位编号' ,name:'transUnitNo',value:'',type:''},
         {label:'单位名称' ,name:'transUnitName',value:'',type:''},
         {label:'单位位置编号' ,name:'locNo',value:'',type:''},
         {label:'单位负责人' ,name:'transUnitPersonName',value:'',type:''},
         {label:'联系方式' ,name:'transUnitPersonContact',value:'',type:''}]
       },
       allCol:{
         transUnitNo: '',
         transUnitName: '',
         loc: {
             locNo: '',
             locName: '',
             postalCode: '',
             transUnit: null
         },
         transUnitPersonName: '',
         transUnitPersonContact: '' 
       },
       headerData: [
         { name: "transUnitNo", dataIndex: "单位编号" },
         { name: "transUnitName", dataIndex: "单位名称" },
         { name: "loc.locNo", dataIndex: "单位位置编号" },
         { name: "transUnitPersonName", dataIndex: "单位负责人" },
         { name: "transUnitPersonContact", dataIndex: "联系方式" }
       ]
     };
  }
}
</script>


