<template>
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/ConsumerType" :tableName="tableName"></ctable>
</template>

<script>
export default {
  name: "d_dept",
data: function() {
   return {
     tableName:"优惠信息设置",
     ruls:{
       consumerTypeName:[ { required: true, message: '请输入客户类型名称', trigger: 'blur' }],
       discountModulus:[ { required: true, message: '请输入优惠折扣', trigger: 'blur' }],
     },
     addWindows:{
       col: [
       {label:'客户类型名称' ,name:'consumerTypeName',value:'',type:''},
       {label:'优惠折扣' ,name:'discountModulus',value:'',type:''}]
     },
     allCol:{
         consumerTypeNo: "",
         consumerTypeName: "",
         discountModulus: ""
     },
     headerData: [
       { name: "consumerTypeNo", dataIndex: "客户类型编号" },
       { name: "consumerTypeName", dataIndex: "客户类型名称" },
       { name: "discountModulus", dataIndex: "优惠折扣" }
     ]
   };
}
};
</script>

<style>
</style>