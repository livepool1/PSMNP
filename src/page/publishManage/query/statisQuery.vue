<template>

  <queryTable :headerData="headerData" :allCol="allCol" service="/api/HEUPOMS/Dept"></queryTable>

</template>

<script>
export default {
  name: "statisQuery",
  data: function() {
    return {
      //'headerData','allCol'
        headerData: [
          { prop: "deptNo", label: "部门编码" },
          { prop: "deptName", label: "部门名称" },
        ],
         allCol:[
           { prop: "deptNo", label: "部门编码" },
           { prop: "deptName",label: "部门名称" },
           { prop: "deptName", label: "部门名称" },
         ],
         data:[
           {deptNo:1,deptName:2,deptName:3 },
         {deptNo:1,deptName:2,deptName:3 }
         ]
    };
  },
};
</script>

<style>
</style>