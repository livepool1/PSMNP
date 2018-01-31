<template>
  <div>
    <queryTable :headerData="headerData" :allCol="allCol" :service="service"></queryTable>
  </div>
</template>

<script>
export default {
  name: "statisQuery",
  watch: {
  },
  data: function() {
    return {
      headerData: [
        { prop: "newspaperType.newspaperTypeName", label: "报刊类型名称" },
        { prop: "newspaperName", label: "报刊名称" },
        { prop: "newsUnit.newsUnitName", label: "报社名称" },
        { prop: "issue.issueName", label: "刊期名称" },
        { prop: "issueRate", label: "发行率" },
        { prop: "initDate", label: "创刊日期" }
      ],
      allCol: [
        { prop: "issue.dayModulus", label: "日折扣" },
        { prop: "issue.weekModulus", label: "周折扣" },
        { prop: "issue.halfMonthModulus", label: "半月折扣" },
        { prop: "issue.monthModulus", label: "月折扣" },
        { prop: "issue.seasonModulus", label: "季度折扣" },
        { prop: "issue.halfYearModulus", label: "半年折扣" },
        { prop: "issue.yearModulus", label: "年折扣" }
      ],
      service: "/api/HEUPOMS/Newspaper"
    };
  }
};
</script>

<style>

</style>