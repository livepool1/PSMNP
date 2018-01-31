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
        transUnitNo:[ { required: true, message: '请输入运输单位编号', trigger: 'blur' }],
        locName:[ { required: true, message: '请输入地区名称', trigger: 'blur' }],
        postalCode:[ { required: true, message: '请输入地区名称', trigger: 'blur' }],
        transUnitName:[ { required: true, message: '请输入地区名称', trigger: 'blur' }]
      },
      addWindows:{
        col: [
        {label:'运输单元编码' ,name:'transUnitNo',value:'',type:''},
        {label:'地区名称' ,name:'locName',value:'',type:''},
        {label:'邮政编码变更备注' ,name:'postalCode',value:'',type:''},
        {label:'运输单元名称' ,name:'transUnitName',value:'',type:''}
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
        { name: "transUnit.transUnitNo", dataIndex: "运输单位编号" },
        { name: "locName", dataIndex: "地区名称" },
        { name: "postalCode", dataIndex: "邮政编码地区名称" },
        { name: "transUnit.transUnitName", dataIndex: "运输单位编号" },
      ]
    };
 }
};
</script>

<style>
</style>