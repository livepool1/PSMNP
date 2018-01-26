<template>
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/NewsUnit" :tableName="tableName"></ctable>
</template>

<script>
export default {
  name: "d_dept",
data: function() {
   return {
     tableName:"报刊管理",
     ruls:{
       issueNo:[ { required: true, message: '请输入刊期编号', trigger: 'blur' }],
       dayModulus:[ { required: true, message: '请输入日价系数', trigger: 'blur' }],
       weekModulus:[ { required: true, message: '请输入周价系数', trigger: 'blur' }],
       halfMonthModulus:[ { required: true, message: '请输入半月价系数', trigger: 'blur' }],
       monthModulus:[ { required: true, message: '请输入月价系数', trigger: 'blur' }],
       seasonModulus:[ { required: true, message: '请输入季价系数', trigger: 'blur' }],
       halfYearModulus:[ { required: true, message: '请输入半年价系数', trigger: 'blur' }],
       yearModulus:[ { required: true, message: '请输入年价系数', trigger: 'blur' }]
     },
     addWindows:{
       col: [
       {label:'刊期编号' ,name:'issueNo',value:'',type:''},
       {label:'日价系数' ,name:'dayModulus',value:'',type:''},
       {label:'周价系数' ,name:'weekModulus',value:'',type:''},
       {label:'半月价系数' ,name:'halfMonthModulus',value:'',type:''},
       {label:'月价系数' ,name:'monthModulus',value:'',type:''},
       {label:'季价系数' ,name:'seasonModulus',value:'',type:''},
       {label:'半年价系数' ,name:'halfYearModulus',value:'',type:''},
       {label:'年价系数' ,name:'yearModulus',value:'',type:''}]
     },
     allCol:{
       issueNo: '',
       dayModulus: '',
       weekModulus: '',
       halfMonthModulus: '',
       monthModulus: '',
       seasonModulus: '',
       halfYearModulus: '',
       yearModulus: ''  
     },
     headerData: [
       { name: "issueNo", dataIndex: "员工编号" },
       { name: "weekModulus", dataIndex: "周价系数" },
       { name: "monthModulus", dataIndex: "月价系数" },
       { name: "seasonModulus", dataIndex: "季价系数" },
       { name: "halfYearModulus", dataIndex: "半年价系数" },
       { name: "yearModulus", dataIndex: "年价系数" }
     ]
   };
}
};
</script>

<style>
</style>