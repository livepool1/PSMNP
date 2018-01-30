<template>
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/Emp" :tableName="tableName"></ctable>
</template>

<script>
export default {
  name: "d_dept",
data: function() {
   return {
     tableName:"员工管理",
     ruls:{
       empNo:[ { required: true, message: '请输入员工编号', trigger: 'blur' }],
       empName:[ { required: true, message: '请输入员工姓名', trigger: 'blur' }],
       empSex:[ { required: true, message: '请输入员工性别', trigger: 'blur' }],
       empContact:[ { required: true, message: '请输入员工联系方式', trigger: 'blur' }],
       positionNo:[ { required: true, message: '请输入职务编号', trigger: 'blur' }]
     },
     addWindows:{
       col: [
       {label:'员工编号' ,name:'empNo',value:'',type:''},
       {label:'员工姓名' ,name:'empName',value:'',type:''},
       {label:'员工性别' ,name:'empSex',value:'',type:''},
       {label:'员工联系方式' ,name:'empContact',value:'',type:''},
       {label:'职务编号' ,name:'positionNo',value:'',type:''}]
     },
     allCol:{
         empNo: "",
         empId: "",
         empName: "",
         empSex: "",
         empContact: "",
         password: null,
         position: {
             positionNo: "",
             positionName: "",
             baseSalary: "",
            //  dept: {
            //      deptNo: "",
            //      deptName: ""
            //  }
         }
        //  distribution: {
        //      distributionNo: "",
        //      distributionName: "",
        //      loc: null,
        //      distributionPersonName: null,
        //      distributionPersonContact: null
        //  }
     },
     headerData: [
       { name: "empNo", dataIndex: "员工编号" },
       { name: "empName", dataIndex: "员工姓名" },
       { name: "empSex", dataIndex: "员工性别" },
       { name: "empContact", dataIndex: "联系方式" },
       { name: "position.positionNo", dataIndex: "职务编号" }
     ]
   };
}
};
</script>

<style>
</style>