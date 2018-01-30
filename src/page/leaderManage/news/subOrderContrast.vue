<template>
<div>  <p>bbbbb</p>
<div class="block">
  <span class="demonstration">请选择时间</span>
  <el-date-picker
    v-model="value3"
    type="datetimerange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期">
  </el-date-picker>{{value3}}{{startTime}}
</div>

<el-button @click="will">aaa</el-button>

  <echarts_pie :options="option"></echarts_pie></div>


</template>

<script>
import axios from 'axios'
export default {
  name:'job',
  data  :function() {
    return {
      value3:[],
      option : {

          title : {
              text: '同名数量统计',
              subtext: '纯属虚构',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          // legend: {
          //     type: 'scroll',
          //     orient: 'vertical',
          //     right: 10,
          //     top: 20,
          //     bottom: 20,
          //     data: data.legendData,

          //     selected: data.selected
          // },
          series : [
              {
                  name: '姓名',
                  type: 'pie',
                  radius : '55%',
                  center: ['40%', '50%'],
                  data: [
                    ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      }
    }
  },
  methods : {
    will() {
      var haha = this.option.series[0].data
      this.option.series[0].data.push(
        {
          name : "haha",
          value : 500
        }
      )

      console.log(this.option.series[0].data)
    }
  },
  computed : {
    startTime: function() {
      return new Date(this.value3[0]).format("yyyy-MM-dd")
      
    },
    finishTime: function()  {
      return new Date(this.value3[1]).format("yyyy-MM-dd")
    }
  },
  watch : {
    value3 :function() {
      var self = this
      var opt = {
        "startDate": self.startTime,
        "finishDate": self.finishTime
      }

      axios
      .get("/api/HEUPOMS/Statistics/Distribution"
      ,{params : opt})
      .then(
        function(reponse) {
          for ( var x in reponse.data ) {
                      var data = {}
          data.name = reponse.data[x].statisticsName
          data.value = reponse.data[x].count
          self.option.series[0].data.push(data)
          }
          console.log(reponse)
          console.log(self.option.series[0].data)

        }
      )
      console.log(opt)
    }
  }
}
</script>


