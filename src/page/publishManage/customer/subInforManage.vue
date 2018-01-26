<template>
  
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/Consumer" :tableName="tableName"></ctable>

</template>

<script>
export default {
  name: "subInforManage",
data: function() {
   return {
     tableName:"客户管理",
     ruls:{
       consumerNo:[ { required: true, message: '请输入客户编号', trigger: 'blur' }],
       consumerName:[ { required: true, message: '请输入客户姓名', trigger: 'blur' }],
       consumerPhone:[ { required: true, message: '请输入客户电话', trigger: 'blur' }],
       consumerTypeNo:[ { required: true, message: '请输入客户属性', trigger: 'blur' }],
       consumerEmail:[ { required: true, message: '请输入电子邮件地址', trigger: 'blur' }]
     },
     addWindows:{
       col: [
       {label:'客户编号' ,name:'consumerNo',value:'',type:''},
       {label:'客户姓名' ,name:'consumerName',value:'',type:''},
       {label:'客户电话' ,name:'consumerPhone',value:'',type:''},
       {label:'邮件地址' ,name:'consumerEmail',value:'',type:''},
       {label:'客户编号' ,name:'consumerTypeNo',value:'',type:''},
       {label:'客户名称' ,name:'consumerTypeName',value:'',type:''},
       {label:'折扣系数' ,name:'discountModulus',value:'',type:''},
       ]
     },
     allCol:{
       consumerNo: '',
       consumerName: '',
       consumerPhone: '',
       consumerType:{
         consumerTypeNo: '',
         consumerTypeName: '',
         discountModulus: 1
       },
       consumerEmail: ''  
     },
     headerData: [
       { name: "consumerNo", dataIndex: "客户编号" },
       { name: "consumerName", dataIndex: "客户姓名" },
       { name: "consumerPhone", dataIndex: "客户电话" },
       { name: "consumerType.consumerTypeName", dataIndex: "客户属性" },
      //  { name: "consumerEmail", dataIndex: "邮件地址" }
     ]
   };
}
};
</script>

<style>
</style>