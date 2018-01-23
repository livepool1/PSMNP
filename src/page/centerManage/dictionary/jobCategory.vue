<template>
<div>  <p>bbbbb</p>

<el-row :gutter="20">
    <el-col :span="10"><div class="grid-content bg-purple"><div class="block">
    <!-- <span class="demonstration">请选择您要查询的月</span> -->
    <el-date-picker
      v-model="value4"
      type="month"
      placeholder="请选择您要查询的月">
    </el-date-picker>
  </div><el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      align="center"
      prop="name"
      label="发行站"
      width="180">
    </el-table-column>
    <el-table-column
    align="center"
      prop="address"
      label="订购量">
    </el-table-column>
  </el-table></div></el-col><el-col :span="14"><div class="grid-content bg-purple"><echarts_pie></echarts_pie></div></el-col>

  <!-- <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> -->
</el-row>

  </div>


</template>

<style>
.demonstration {
  /* display: block; */
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
  margin-bottom: 80px;
  margin-right: 40px;
}
</style>


<script>
export default {
  name:'job',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '南岗站',
        address: '200'
      }, {
        date: '2016-05-04',
        name: '道外站',
        address: '400'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '327'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '64'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '64'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '64'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '64'
      }],
      value4 : {}
    }
  }
}
</script>


