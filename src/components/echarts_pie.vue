<template>

  <div id="echarts_pie">
    <!-- <el-button>默认按钮</el-button> -->
    <div class="charts">
        <div id="myChart" :style="{height: '220px', width: '200px'}"></div>
    </div>
  </div>

</template>

<script>
  import echarts from 'echarts'


export default {
  name: 'echarts_pie',
  props: ['options'],
  data () {
      return {
          option : {

              title: {
                  text: '折线图堆叠'
              },
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                  data:['南岗站','道外站','道外站','太平战','搜索引擎']
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              toolbox: {
                  feature: {
                      saveAsImage: {}
                  }
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
              },
              yAxis: {
                  type: 'value'
              },
              series: [
                  {
                      name:'南岗站',
                      type:'line',
                      stack: '总量',
                      data:[120, 132, 101, 134, 90, 230, 210]
                  },
                  {
                      name:'道外站',
                      type:'line',
                      stack: '总量',
                      data:[220, 182, 191, 234, 290, 330, 310]
                  },
                  {
                      name:'道外站',
                      type:'line',
                      stack: '总量',
                      data:[150, 232, 201, 154, 190, 330, 410]
                  },
                  {
                      name:'太平战',
                      type:'line',
                      stack: '总量',
                      data:[320, 332, 301, 334, 390, 330, 320]
                  },
                  {
                      name:'搜索引擎',
                      type:'line',
                      stack: '总量',
                      data:[820, 932, 901, 934, 1290, 1330, 1320]
                  }
              ]
          }
      }
  },
  mounted () {
      if ( this.options !=null) {
          this.option = this.options
      }
      let chartBox = document.getElementsByClassName('charts')[0]
      let myChart = document.getElementById('myChart')
      // 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
      function resizeCharts () {
        myChart.style.width = chartBox.offsetWidth + 'px'
        myChart.style.height = '400px'
        console.log(chartBox.offsetWidth)
        console.log("judge")
      }
      // 设置容器高宽
      resizeCharts()
      let mainChart = echarts.init(myChart)
      mainChart.setOption(this.option)
  },
  watch: {
      options: {
          handler(newVal,oldVal) {
        //   this.option = options
        //   console.log(this.option)
        this.option = newVal
        console.log("出发了更新")

        let chartBox = document.getElementsByClassName('charts')[0]
        let myChart = document.getElementById('myChart')
        // 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
        function resizeCharts () {
          myChart.style.width = chartBox.offsetWidth + 'px'
          myChart.style.height = '400px'
          console.log(chartBox.offsetWidth)
          console.log("judge")
        }
        // 设置容器高宽
        resizeCharts()
        let mainChart = echarts.init(myChart)
        mainChart.setOption(this.option)
      },
      deep:true
      }
  }
}
</script>

