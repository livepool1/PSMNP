<template>
<div>  
  <p>bbbbb</p>
  <echarts_pie :options=this.option> </echarts_pie>
  
  </div>
</template>

<script>
export default {
  name:'job',
  data () {
    return {
      option : {
          label: {
            show: true,  

          },
          xAxis: {
              type: 'category',
              data: ['发行站1', '发行站2', '发行站3', '发行站4', '发行站5', '发行站6', '发行站7']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [500, 200, 150, 80, 70, 110, 130],
              type: 'bar'
          }]
      }

    }
  }
}
</script>


