<template>
<div>  
  <!-- <p>bbbbb</p> -->
<div class="block" style="margin:0 auto; text-align: center;">
  <h3>订户性质分析</h3>
  <el-date-picker
    v-model="value3"
    type="datetimerange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期">
  </el-date-picker>
  <el-button :class="{ 'el-button--primary' : active }" @click="will(1)">销量</el-button>
<el-button :class="{ 'el-button--primary' : !active }" @click="will(2)">营业额</el-button>
</div>



  <echarts_pie :options="option"></echarts_pie></div>


</template>

<script>
import axios from 'axios'
export default {
  name:'job',
  data  :function() {
    return {
      value3:[],
      data:[[],[],[]],
      active: true,
      option : {

          title : {
              // text: '同名数量统计',
              // subtext: '纯属虚构',
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
    will(value) {
      if( value == 1 ) {
        this.active = true
        this.option.series[0].data = this.data[1]
      } else {
        this.active = false
        this.option.series[0].data = this.data[2]
      }
      // var haha = this.option.series[0].data
      // this.option.series[0].data.push(
      //   {
      //     name : "haha",
      //     value : 500
      //   }
      // )  

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
      .get("/api/HEUPOMS/Statistics/ConsumerType"
      ,{params : opt})
      .then(
        function(reponse) {self.data[1] = [];self.data[
          2
        ] = []
          for ( var x in reponse.data ) {
                      var data = {}
          data.name = reponse.data[x].statisticsName
          data.value = reponse.data[x].count
          self.option.series[0].data.push(data)
          console.log(data)
          self.data[1].push(data);data = JSON.parse( JSON.stringify(data) )
          
          data.value = reponse.data[x].sum
          console.log(data)
          self.data[2].push(data)
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


