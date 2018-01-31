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
        { prop: "order.orderNo", label: "订单编号" },
        { prop: "alterInitDate", label: "订单变更时间" },
        { prop: "alterPrice", label: "订单变化金额" },
        { prop: "alter.alterNo", label: "变更类型编号" },
        { prop: "alter.alterName", label: "变更类型" }
      ],
      allCol: [
        { prop: "order.newspaper.issue.issueName", label: "报刊性质" },
        { prop: "order.newspaper.newspaperName", label: "报刊名" },
        { prop: "order.consumer.consumerName", label: "订户姓名" },
        { prop: "order.consumer.consumerPhone", label: "订户电话" },
        { prop: "order.emp.empName", label: "操作员名称" },
        { prop: "order.handleDate", label: "处理时间" }
      ],
      service: "/api/HEUPOMS/OrderAlter"
    };
  }
};
</script>

<style>

</style>