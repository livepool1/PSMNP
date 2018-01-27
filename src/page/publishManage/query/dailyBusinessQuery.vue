<template>
  
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/HEUPOMS/Dept" :tableName="tableName"></ctable>

</template>

<script>
export default {
  name: "dictionary",
  data: function() {
    return {
      tableName:"员工管理",
      ruls:{
        empId:[ { required: true, message: '请输入员工编号', trigger: 'blur' }],
        empName:[ { required: true, message: '请输入员工姓名', trigger: 'blur' }],
        dsbtId:[ { required: true, message: '请输入发行站编号', trigger: 'blur' }],
        work:[ { required: true, message: '请输入职务', trigger: 'blur' }],
        achievement:[ { required: true, message: '请输入业绩统计', trigger: '  blur' }],
        tel:[ { required: true, message: '请输入联系方式', trigger: 'blur' }],
        salary:[ { required: true, message: '请输入工资', trigger: 'blur' }]
      },
      addWindows:{
        col: [
        {label:'编号' ,name:'id',value:'',type:''},
        {label:'员工编号' ,name:'empId',value:'',type:''},
        {label:'员工姓名' ,name:'empName',value:'',type:''},
        {label:'发行站编号' ,name:'dsbtId',value:'',type:''},
        {label:'职务' ,name:'work',value:'',type:''},
        {label:'业绩统计' ,name:'achievement',value:'',type:''},
        {label:'联系方式' ,name:'tel',value:'',type:''},
        {label:'家庭住址' ,name:'add',value:'',type:''},
        {label:'工资' ,name:'salary',value:'',type:''}
        ]
      },
      allCol:{
        id: '',
        empId: '',
        empName: '',
        dsbtId: '',
        work: '',
        achievement: '',
        tel:'',
        add:'',
        salary: ''
      },
      headerData: [
        { name: "title", dataIndex: "员工编号" },
        { name: "type", dataIndex: "员工姓名" },
        { name: "status", dataIndex: "发行站编号" },
        { name: "readNum", dataIndex: "职务" },
        { name: "signUpNum", dataIndex: "业绩统计" },
        { name: "auditNum", dataIndex: "联系方式" }
      ]
    };
  },
};
</script>

<style>
</style>