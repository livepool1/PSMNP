<template>
  <div>
    <el-select v-model="select" style="margin-left:50px;margin-top:20px" placeholder="请选择查询项目">
      <el-option label="已过期订单" value="1"></el-option>
      <el-option label="最近一周过期订单" value="2"></el-option>
      <el-option label="最近一个月过期订单" value="3"></el-option>
      <!-- <el-option label="优惠信息查询" value="4"></el-option> -->
    </el-select>
    <queryTable :headerData="headerData" :allCol="allCol" :service="service"></queryTable>
  </div>
</template>

<script>
export default {
  name: "dictionary",
  created: function() {
    this.init();
    this.select = "1";
  },
  watch: {
    select: function() {
      if (this.select == 1) {
        this.service = this.service1;// +'/' + this.distributionNo;
        console.log("dsada")
      } else if (this.select == 2) {
        this.service = this.service2;// +'/' + this.distributionNo;
      } else if (this.select == 3) {
        this.service = this.service3;//+'/' + this.distributionNo;
      }
    }
  },
  data: function() {
    return {
      select: "",
      //已过期订单
      service1: "/api/HEUPOMS/Order/Expired",
      //最近一周过期
      service2: "/api/HEUPOMS/Order/Expiring/Week",
      //最近一月过期
      service3: "/api/HEUPOMS/Order/Expiring/Month",
      //表头
      headerData: [
        { prop: "newspaper.newspaperName", label: "订购报刊名称" },

        { prop: "consumer.consumerName", label: "顾客姓名" },
        { prop: "consumer.consumerPhone", label: "顾客电话" },

        { prop: "startDate", label: "订单起始时间" },
        { prop: "finishDate", label: "订单结束时间" }
      ],
      allCol: [
        { prop: "orderNo", label: "订单编号" },
        { prop: "newspaper.newspaperNo", label: "订购报刊编号" },
        {
          prop: "newspaper.newspaperType.newspaperTypeName",
          label: "订购报刊类型"
        },
        { prop: "newspaper.newsUnit.newsUnitName", label: "订购报刊所属报社" },
        { prop: "newspaper.price", label: "订购报刊单价" },
        { prop: "newspaper.issue", label: "订购报刊性质" },
        { prop: "consumer.consumerType.consumerTypeName", label: "客户类别" },
        { prop: "emp.empName", label: "处理员工名称" },
        { prop: "emp.distribution.distributionName", label: "员工所属发行站" },
        { prop: "handleDate", label: "订单办理时间" },
        { prop: "payment.paymentName", label: "付款方式" },
        { prop: "charge.chargeName", label: "支付方式" }
      ],
      service: "",
      distributionNo: ""
    };
  },
  methods: {
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    },
    init() {
<<<<<<< HEAD
      var self = this
      var s = self.getCookie("session");
=======
      var s = this.getCookie("session");
>>>>>>> 40b29873835c7e133c2d3486c6450665eb35a97e
      var distributionNo = s.substr(0, 2);
      this.distributionNo = distributionNo;
      this.distributionNo = "";
    }
  }
};
</script>

<style>

</style>