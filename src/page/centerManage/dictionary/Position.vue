<template>
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/Position" :tableName="tableName"></ctable>
</template>

<script>
export default {
  name: "d_dept",
data: function() {
   return {
     tableName:"职务管理",
     ruls:{
       positionName:[ { required: true, message: '请输入职务姓名', trigger: 'blur' }],
       baseSalary:[ { required: true, message: '请输入基础工资', trigger: 'blur' }],
       deptNo:[ { required: true, message: '请输入部门编号', trigger: 'blur' }]
     },
     addWindows:{
       col: [
       {label:'职务姓名' ,name:'positionName',value:'',type:''},
       {label:'基础工资' ,name:'baseSalary',value:'',type:''},
       {label:'部门编号' ,name:'deptNo',value:'',type:''}]
     },
     allCol:{
       positionNo: '',
       positionName: '',
       baseSalary: '',
       dept:{
           deptNo: '',
           deptName: ''
       }
     },
     headerData: [
       { name: "positionNo", dataIndex: "职务编号" },
       { name: "positionName", dataIndex: "职务姓名" },
       { name: "baseSalary", dataIndex: "基础工资" },
       { name: "dept.deptName", dataIndex: "部门名称" }
     ]
   };
},
};
</script>

<style>
</style>