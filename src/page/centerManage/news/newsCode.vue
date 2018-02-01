<template>
  
  <ctable :formRuls="ruls" :aformWindow='addWindows' :aform="allCol" :headerData="headerData" server="/api/HEUPOMS/Newspaper" :tableName="tableName"></ctable>

</template>

<script>
export default {
  name: "d_dept",
  data: function() {
    return {
      tableName:"报刊管理",
      ruls:{
        newspaperTypeNo:[ { required: true, message: '请输入报刊类型编号', trigger: 'blur' }],
        newspaperName:[ { required: true, message: '请输入报刊名称', trigger: 'blur' }],
        newsUnitNo:[ { required: true, message: '请输入报社编号', trigger: 'blur' }],
        unsubscribeFlag:[ { required: true, message: '请输入是否可退订', trigger: 'blur' }],
        transferFlag:[ { required: true, message: '请输入是否可转址', trigger: 'blur' }],
        price:[ { required: true, message: '请输入单价', trigger: 'blur' }],
        issueNo:[ { required: true, message: '请输入刊期编号', trigger: 'blur' }],
        issueRate:[ { required: true, message: '请输入发行率', trigger: 'blur' }],
        initDate:[ { required: true, message: '请输入创刊日期', trigger: 'blur' }]
      },
      addWindows:{
        col: [
        {label: "报刊类型编号", name: "newspaperTypeNo", value:"", type:""},
        {label: "报刊名称", name: "newspaperName", value:"", type:""},
        {label: "报社编号", name: "newsUnitNo", value:"", type:""},
        {label: "是否可退订", name: "unsubscribeFlag", value:"", type:""},
        {label: "是否可转址", name: "transferFlag", value:"", type:""},
        {label: "单价", name: "price", value:"", type:""},
        {label: "刊期编号", name: "issueNo", value:"", type:""},
        {label: "发行率", name: "issueRate", value:"", type:""},
        {label: "创刊日期", name: "initDate", value:"", type:""}
        ]
      },
      allCol:{
          newspaperNo: "",
          newspaperType: {
              newspaperTypeNo: "",
              newspaperTypeName: "儿童",
              newspaperTypeRemark: null
          },
          newspaperName: "",
          newsUnit: {
              newsUnitNo: "",
              newsUnitName: "北京日报社",
              loc: null,
              newsUnitPersonName: null,
              newsUnitPersonContact: null
          },
          unsubscribeFlag: "",
          transferFlag: "",
          price: "",
          issue: {
              issueNo: "",
              issueName: "半年刊",
              dayModulus: 1,
              weekModulus: 1,
              halfMonthModulus: 1,
              monthModulus: 1,
              seasonModulus: 1,
              halfYearModulus: 1,
              yearModulus: 1
          },
          issueRate: "",
          initDate: ""
      },
      headerData: [
        {name: "newspaperNo", dataIndex: "报刊编号"},
        {name: "newspaperType.newspaperTypeName", dataIndex: "报刊类型"},
        {name: "newspaperName", dataIndex: "报刊名称"},
        {name: "newsUnit.newsUnitName", dataIndex: "报社名称"},
        // {name: "unsubscribeFlag", dataIndex: "是否可退订"},
        // {name: "transferFlag", dataIndex: "是否可转址"},
        {name: "price", dataIndex: "单价"},
        {name: "issue.issueNo", dataIndex: "刊期编号"},
        {name: "issueRate", dataIndex: "发行率"}
      ]
    };
  },
};
</script>

<style>
</style>