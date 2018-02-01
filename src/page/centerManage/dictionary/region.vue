<template>
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/Location" :tableName="tableName"></ctable>
</template>

<script>
export default {
  name: "d_dept",
 data: function() {
    return {
      tableName:"地区管理",
      ruls:{
        locNo:[ { required: true, message: '请输入地区编号', trigger: 'blur' }],
        locName:[ { required: true, message: '请输入地区名称', trigger: 'blur' }],
        postalCode:[ { required: true, message: '请输入地区名称', trigger: 'blur' }],
        transUnitNo:[ { required: true, message: '请输入地区编号', trigger: 'blur' }]
      },
      addWindows:{
        col: [
        {label:'地区编号' ,name:'locNo',value:'',type:''},
        {label:'地区名称' ,name:'locName',value:'',type:''},
        {label:'邮政编码' ,name:'postalCode',value:'',type:''},
        {label:'运输单位编号' ,name:'transUnitNo',value:'',type:''}
        ]
      },
      allCol:{
            locNo: "",
            locName: "",
            postalCode: "",
            transUnit: {
                transUnitNo: "",
                transUnitName: "",
                loc: null,
                transUnitPersonName: null,
                transUnitPersonContact: null
            }
      },
      headerData: [
        { name: "locNo", dataIndex: "地区编码" },
        { name: "locName", dataIndex: "地区名称" },
        { name: "postalCode", dataIndex: "邮政编码" },
        { name: "transUnit.transUnitName", dataIndex: "运输单位名称" },
      ]
    };
 }
};
</script>

<style>
</style>