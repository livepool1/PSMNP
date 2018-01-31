<template>
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/NewsUnit" :tableName="tableName"></ctable>
</template>

<script>
export default {
  name: "d_dept",
data: function() {
   return {
     tableName:"发行站管理",
     ruls:{
       newsUnitNo:[ { required: true, message: '请输入报社编号', trigger: 'blur' }],
       newsUnitName:[ { required: true, message: '请输入报社名称', trigger: 'blur' }],
       locNo:[ { required: true, message: '请输入报社位置编码', trigger: 'blur' }],
       newsUnitPersonName:[ { required: true, message: '请输入报社负责人', trigger: 'blur' }],
       newsUnitPersonContact:[ { required: true, message: '请输入负责人联系方式', trigger: 'blur' }]
     },
     addWindows:{
       col: [
       {label:'报社编号' ,name:'newsUnitNo',value:'',type:''},
       {label:'报社名称' ,name:'newsUnitName',value:'',type:''},
       {label:'报社位置编码' ,name:'locNo',value:'',type:''},
       {label:'报社负责人' ,name:'newsUnitPersonName',value:'',type:''},
       {label:'负责人联系方式' ,name:'newsUnitPersonContact',value:'',type:''}]
     },
     allCol:{
       newsUnitNo: "",
       newsUnitName: "",
       loc: {
           locNo: "",
           locName: "",
           postalCode: "",
           transUnit: null
       },
       newsUnitPersonName: "",
       newsUnitPersonContact: ""
     },
     headerData: [
       { name: "newsUnitNo", dataIndex: "报社编号" },
       { name: "newsUnitName", dataIndex: "报社名称" },
       { name: "loc.locName", dataIndex: "报社位置编码" },
       { name: "newsUnitPersonName", dataIndex: "报社负责人" },
       { name: "newsUnitPersonContact", dataIndex: "负责人联系方式" }
     ]
   };
}
};
</script>

<style>
</style>