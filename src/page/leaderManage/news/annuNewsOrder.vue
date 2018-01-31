<template>
<div>  
  <!-- <p>bbbbb</p> -->
  <h3>历年报刊订量统计</h3>
<div class="block"
style="margin:0 auto; ">
  <!-- <span class="demonstration">请选择时间</span> -->
  <!-- <el-date-picker
  style="margin-left:80px;"
    v-model="value3"
    type="datetimerange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期">
  </el-date-picker> -->
  <!-- {{value3}}{{startTime}} -->
  <!-- <el-select v-model="value" placeholder="请选择"> -->
    <!-- <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"> -->
      <!-- <el-option
      label="2018"
      value="value">
      2018
      </el-option>
      <el-option
      label="报社"
      value="value1">
      报社
      </el-option>
  </el-select> -->
  <el-button :class="{ 'el-button--primary': active}" style="width:auto;" @click="will(1)">销量</el-button>
  <el-button v-bind:class="{ 'el-button--primary': !active}" style="width:auto;" @click="will(2)">营业额</el-button>
   <echarts_pie :options="option"></echarts_pie>
</div>



 
  
  </div>


</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
export default {
  name:'job',
  data  :function() {
    return {
      value3:[],
      active:true,
      dataAxis: [],
      data: [[1,2,3],[],[]],
      yMax: 500,
      dataShadow: [],
value: "value",
      option: {
          // title: {
          //     text: '特性示例：渐变色 阴影 点击缩放',
          //     subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
          // },
          xAxis: {
              data: [],
              axisLabel: {
                  inside: false,
                  textStyle: {
                      color: '#fff'
                  }
              },
              axisTick: {
                  show: false
              },
              axisLine: {
                  show: false
              },
              z: 10
          },
          yAxis: {
              axisLine: {
                  show: false
              },
              axisTick: {
                  show: false
              },
              axisLabel: {
                  textStyle: {
                      color: '#999'
                  }
              }
          },
          dataZoom: [
              {
                  type: 'inside'
              }
          ],
          series: [
              {
                  type: 'bar',
                  itemStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                  {offset: 0, color: '#83bff6'},
                                  {offset: 0.5, color: '#188df0'},
                                  {offset: 1, color: '#188df0'}
                              ]
                          )
                      },
                      emphasis: {
                          color: new echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                  {offset: 0, color: '#2378f7'},
                                  {offset: 0.7, color: '#2378f7'},
                                  {offset: 1, color: '#83bff6'}
                              ]
                          )
                      }
                  },
                  data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
              }
          ]
      }

    }
  },
  created : function () {
      window.vuee = this
      var self = this
      axios
      .get("/api/HEUPOMS/Statistics/Month")
      .then(
        function(reponse) {
          // for ( var x in reponse.data ) {
          //             var data = {}
          // data.name = reponse.data[x].statisticsName
          // data.value = reponse.data[x].count
          // self.option.series[0].data.push(data)
          // }
          for( var x in reponse.data ) {
            self.dataAxis.push(reponse.data[x].statisticsNo)
            self.data[1].push(reponse.data[x].count)
            self.data[2].push(reponse.data[x].sum)
          } 
          console.log(reponse)
          console.log(self.option.series[0].data);self.will(1)

        }
      )
      console.log(opt)
  },
  methods : {
    will(value) {
      // var haha = this.option.series[1].data
      // this.option.series[1].data.push(
      //   {
      //     name : "haha",
      //     value : 500.0
      //   }
      // )

    

      this.option.xAxis.data = this.dataAxis

      if(value == 1) {
        this.option.series[0].data = this.data[1]
        this.active = true
      }else {
        this.option.series[0].data = this.data[2]
        this.active = false
      }

      console.log(this.option.series[0].data)

      // this.dataAxis.push("哈哈")
      // this.data.push(100)
      // console.log("aaaa")
      // console.log(this.data)
      // console.log(this.option)

      // console.log(this.option.series[1].data)
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
        if( this.value != null){
      var self = this
      var opt = {
        "startDate": self.startTime,
        "finishDate": self.finishTime
      }
      if(self.value == "value") {
          var url = "/api/HEUPOMS/Statistics/NewsUnit"
      } if(self.value == "value1") {
          var url = "/api/HEUPOMS/Statistics/NewspaperType"
      }

      axios
      .get(url
      ,{params : opt})
      .then(
        function(reponse) {
          // for ( var x in reponse.data ) {
          //             var data = {}
          // data.name = reponse.data[x].statisticsName
          // data.value = reponse.data[x].count
          // self.option.series[0].data.push(data)
          // }
          for( var x in reponse.data ) {
            self.dataAxis.push(reponse.data[x].statisticsName)
            self.data[1].push(reponse.data[x].count)
            self.data[2].push(reponse.data[x].sum)
          } 
          console.log(reponse)
          console.log(self.option.series[0].data);self.will(1)

        }
      )
      console.log(opt)
        }
        

    },

    value : function() {
        if(this.value3 != null) {
            var self = this
        var opt = {
          "startDate": self.startTime,
          "finishDate": self.finishTime
        }
        if(self.value == "value") {
            var url = "/api/HEUPOMS/Statistics/NewsUnit"
        } if(self.value == "value1") {
            url = "/api/HEUPOMS/Statistics/NewspaperType"
        }

        axios
        .get(url
        ,{params : opt})
        .then(
          function(reponse) {
            // for ( var x in reponse.data ) {
            //             var data = {}
            // data.name = reponse.data[x].statisticsName
            // data.value = reponse.data[x].count
            // self.option.series[0].data.push(data)
            // }
            self.dataAxis = []
            self.data[1] = []
            self.data[2] = []
            for( var x in reponse.data ) {
              self.dataAxis.push(reponse.data[x].statisticsName)
              self.data[1].push(reponse.data[x].count)
              self.data[2].push(reponse.data[x].sum)
            } 
            console.log(reponse)
            console.log(self.option.series[0].data);self.will(1)

          })
        }
        
    }
  }
}
</script>

<style>
.active {

}
</style>



