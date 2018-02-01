<template>
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/NewspaperType" :tableName="tableName"></ctable>
</template>

<script>
export default {
  name: "d_dept",
data: function() {
   return {
     tableName:"报刊类别设置",
     ruls:{
       newspaperTypeName:[ { required: true, message: '请输入报刊类别名称', trigger: 'blur' }],
       newspaperTypeRemark:[ { required: false, message: '请输入报刊类别备注', trigger: 'blur' }],
     },
     addWindows:{
       col: [
       {label:'报刊类别名称' ,name:'newspaperTypeName',value:'',type:''},
       {label:'报刊类别备注' ,name:'newspaperTypeRemark',value:'',type:''}]
     },
     allCol:{
         newspaperTypeNo: "",
         newspaperTypeName: "",
         newspaperTypeRemark: null
     },
     headerData: [
       { name: "newspaperTypeNo", dataIndex: "报刊类别编号" },
       { name: "newspaperTypeName", dataIndex: "报刊类别名称" },
       { name: "newspaperTypeRemark", dataIndex: "报刊类别备注" }
     ]
   };
}
};
</script>

<style>
</style>