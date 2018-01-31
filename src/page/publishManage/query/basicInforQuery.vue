<template>
  <div>
    <el-select v-model="select" style="margin-left:50px;margin-top:20px" placeholder="请选择查询项目">
      <el-option label="报刊查询" value="1"></el-option>
      <el-option label="报社查询" value="2"></el-option>
      <el-option label="运输站查询" value="3"></el-option>
      <!-- <el-option label="优惠信息查询" value="4"></el-option> -->
    </el-select>
    <queryTable :headerData="headerData" :allCol="allCol" :service="service"></queryTable>
  </div>
</template>

<script>
export default {
  created:function(){
    this.select = '1'
  },
  watch: {
    select: function() {
      if (this.select == 1) {
        this.headerData = this.headerData1;
        this.allCol = this.allCol1;
        this.service = this.service1;
      } else if (this.select == 2) {
        this.headerData = this.headerData2;
        this.allCol = this.allCol2;
        this.service = this.service2;
      } else if (this.select == 3) {
        this.headerData = this.headerData3;
        this.allCol = this.allCol3;
        this.service = this.service3;
      }
    }
  },
  data: function() {
    return {
      select: "",
      //报刊查询
      headerData1: [
        { prop: "newspaperNo", label: "报刊编号" },
        { prop: "newspaperType.newspaperTypeName", label: "报刊类别" },
        { prop: "newspaperName", label: "报刊名" },
        { prop: "newsUnit.newsUnitName", label: "所属发行社" },
        { prop: "price", label: "单价" }
      ],
      allCol1: [
        { prop: "issue.issueName", label: "报刊性质" },
        { prop: "issueRate", label: "发行费率" }
      ],
      service1: "/api/HEUPOMS/Newspaper",
      //报社查询
      headerData2: [
        { prop: "newsUnitNo", label: "报社编号" },
        { prop: "newsUnitName", label: "报社名称" },
        { prop: "loc.locName", label: "所在地区" },
        { prop: "loc.postalCode", label: "地区编码" }
      ],
      allCol2: [
        { prop: "newsUnitPersonName", label: "负责人姓名" },
        { prop: "newsUnitPersonContact", label: "负责人电话" }
      ],
      service2: "/api/HEUPOMS/NewsUnit",
      //运输站查询
      headerData3: [
        { prop: "transUnitNo", label: "运输单位编号" },
        { prop: "transUnitName", label: "运输单位名称" },
        { prop: "loc.locName", label: "所在地区" },
        { prop: "loc.postalCode", label: "地区编码" }
      ],
      allCol3: [
        { prop: "transUnitPersonName", label: "负责人姓名" },
        { prop: "transUnitPersonContact", label: "负责人电话" }
      ],
      service3: "/api/HEUPOMS/TransUnit",
      //优惠信息查询
      headerData: [],
      allCol: [],
      service: ""
    };
  }
};
</script>

<style>

</style>
