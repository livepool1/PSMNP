<template>
  
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/HEUPOMS/Dept" :tableName="tableName"></ctable>

</template>

<script>
export default {
  name: "d_dept",
  data: function() {
    return {
      tableName:"部门管理",
      ruls:{
        deptNo:[ { required: true, message: '请输入部门编码', trigger: 'blur' }],
        deptName:[ { required: true, message: '请输入部门名称', trigger: 'blur' }]
      },
      addWindows:{
        col: [
        {label:'部门编码' ,name:'deptNo',value:'',type:''},
        {label:'部门名称' ,name:'deptName',value:'',type:''},
        ]
      },
      allCol:{
        deptNo: '',
        deptName: '',
      },
      headerData: [
        { name: "deptNo", dataIndex: "部门编码" },
        { name: "deptName", dataIndex: "部门名称" },
      ]
    };
  },
};
</script>

<style>
</style>