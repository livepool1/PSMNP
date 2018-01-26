<template>

  <queryTable></queryTable>

</template>

<script>
export default {
  name: "statisQuery",
  data: function() {
    return {
      //'headerData','allCol'
      headerData:{
        headerData: [
          { name: "deptNo", dataIndex: "部门编码" },
          { name: "deptName", dataIndex: "部门名称" },
        ],
         allCol:[
           { name: "deptNo", dataIndex: "部门编码" },
           { name: "deptName", dataIndex: "部门名称" },
           { name: "deptName", dataIndex: "部门名称" },
         ],
         data:[
           {deptNo:1,deptName:2,deptName:3 },
         {deptNo:1,deptName:2,deptName:3 }
         ]
      }
    };
  },
};
</script>

<style>
</style>