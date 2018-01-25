<template>
<div>
  <el-row style="margin-bottom: 18px">
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header" style = "height:15px">
        <el-tag size="medium">投诉</el-tag>
        <span style="margin-left:10px">From:</span>
        <span style="position:absolute; right:50px; font-size:10pt">发送时间：2017-2-2</span>
      </div>
      <div style="font-size: 14px;margin-bottom: 18px;margin-left: 20px;margin-top: 18px;">
       '列表内容'
      </div>
    </el-card>
  </el-row>
  <el-row style="margin-bottom: 18px">
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header" style = "height:15px">
        <el-tag size="medium" type="success">表扬</el-tag>
        <span style="margin-left:10px">From:</span>
        <span style="position:absolute; right:50px; font-size:10pt">发送时间：2017-2-2</span>
      </div>
      <div style="font-size: 14px;margin-bottom: 18px;margin-left: 20px;margin-top: 18px;">
       '列表内容'
      </div>
    </el-card>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'supervise',
  data: function() {
  return {
     }
  }
}
</script>

<style>
</style>
