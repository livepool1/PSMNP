<template>
  <div class="newBook"  v-loading="loading">
    <el-steps :space="200" :active="nowStep" finish-status="success" style="margin-left: 200px; margin-right: auto;">
      <el-step title="选择报刊"></el-step>
      <el-step title="填写信息"></el-step>
      <el-step title="结算"></el-step>
    </el-steps>
    <!-- <router-view></router-view> -->
    <div v-show="pageV1" class="content">
      <el-form ref="formBook" :model="formBook" label-width="80px">
        <el-form-item :rules="[
          { required: true, message: '报刊名不能为空',trigger: 'blur'},
        ]" label="报刊名称" class="formItem">
          <el-autocomplete  style="width:100%" v-model="bookName" :fetch-suggestions="querySearchAsync" placeholder="请输入报刊名" @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <el-form-item :rules="[
          { required: true, message: '找不到报刊编号',trigger: 'blur'},
        ]" label="报刊编号" class="formItem">
          <el-input  placeholder="报刊编号" v-model="formBook.no" readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="报刊类型" class="formItem">
          <el-input placeholder="报刊类型" v-model="formBook.type" readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="报社编码" class="formItem">
          <el-input placeholder="所属报社编码" v-model="formBook.officeNo" readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="单价" class="formItem">
          <el-input placeholder="单价" v-model="formBook.price" readonly="true">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="pageV2" class="content">
      <el-form :rules="rules2" ref="nowOrder" :model="nowOrder" label-width="100px">
        <el-form-item label="报刊编号" class="formItem">
          <el-input v-model="formBook.no" readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="操作员编号" class="formItem">
          <el-input v-model="nowEmp" readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="订户姓名" class="formItem" >
          <el-input v-model="nowOrder.consumer.consumerName">
          </el-input>
        </el-form-item>
        <el-form-item label="电话" class="formItem">
          <el-input v-model="nowOrder.consumer.consumerPhone">
          </el-input>
        </el-form-item>
        <el-form-item label="更改地区" class="formItem">
          <el-select placeholder="请选择地区" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" class="formItem">
          <el-input v-model="a">
          </el-input>
        </el-form-item>
        <el-form-item label="起始订购时间" class="formItem" prop="startTime">
          <el-date-picker type="date" placeholder="选择起始日期" v-model="nowOrder.startDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="起始订购时间" class="formItem" prop="endTime">
          <el-date-picker type="date" placeholder="选择结束日期" v-model="nowOrder.finishDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="总价" class="formItem">
          <el-input placeholder="ajax后台获取" v-model="allPrice" :disabled="true">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="pageV3" class="content">
      <el-form ref="formInfo" :model="formInfo" label-width="100px">
        <el-form-item label="期刊数量" class="formItem">
          <el-input v-model="formBook.no" :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="单价" class="formItem">
          <el-input v-model="userNo" :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="总价" class="formItem">
          <el-input v-model="userNo" :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="付款方式" class="formItem">
          <el-input v-model="userNo" >
          </el-input>
        </el-form-item>
        <el-form-item label="支付方式" class="formItem">
          <el-input v-model="userNo" >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-col :offset="17">
        <el-button type="info" @click="nowStep=nowStep-1" :disabled="lastButton">上一步</el-button>
        <el-col>
        </el-col>
        <el-button v-if="OK" type="primary" @click="nowStep=nowStep+1">下一步</el-button>
        <el-button v-else type="primary" @click="submitOrder">完成付款</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "newBook",
  data: function() {
    return {
      nowOrder:{},
      nowStep: 0,
      pageV1: true,
      pageV2: false,
      pageV3: false,
      lastButton: true,
      bookName: "",
      formBook: {
        no: "",
        type: "",
        price: "",
        officeNo: ""
      },
      allPrice: "",
      userNo: "",
      OK: true,
      restaurants:[],
      nowEmp:'',
      loading:true,
      rules2: {
        startTime: [
          { validator: this.startTime, trigger: 'blur' }
        ],
        endTime: [
          { validator: this.endTime, trigger: 'blur' }
        ],
        userName:[
          {}
        ]
      }
    };
  },
  watch: {
    nowStep: function() {
      if (this.nowStep === 1) {
        this.pageV1 = false;
        this.pageV2 = true;
        this.pageV3 = false;
        this.lastButton = false;
        this.OK = true;
      } else if (this.nowStep === 0) {
        this.pageV1 = true;
        this.pageV2 = false;
        this.pageV3 = false;
        this.lastButton = true;
      } else if (this.nowStep === 2) {
        this.pageV1 = false;
        this.pageV2 = false;
        this.pageV3 = true;
        this.OK = false;
      }
    }
  },
  computed: {},
  created: function() {
    //this.userNo = this.getCookie(username);
    var self = this
    axios
    .get("/api/HEUPOMS/Order") //模糊查询
    .then(function(response) {
      console.log(response.data.list[0])
      self.nowOrder = response.data.list[0]
      self.nowOrder.consumer.consumerName = ""
      self.nowOrder.consumer.consumerPhone= ""
      self.nowOrder.startDate= ""
      self.nowOrder.finishDate= ""
      self.loading =false
    })
    .catch(function(err) {
      console.log(err);
      self.loading =false
    });//.startDate
    //this.nowEmp = getCookie("username") ;
  },
  methods: {
    startTime(rule, value, callback){
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
      if (value === '') {
        callback(new Error('请输入起始时间'));
      } else if (value <= s2) {  
        callback(new Error('不能早于今天'));
      } else {
        callback();
      }
    },
    endTime(rule, value, callback){
      if (value === '') {
        callback(new Error('请输入结束时间'));
      } else if (value <= self.nowOrder.startDate) {  
        callback(new Error('结束订购不能早于订购时间'));
      } else {
        callback();
      }
    },
    submitOrder() {
      var self = this
      axios
      .post("/api/HEUPOMS/Newspaper" + "/" + this.bookName) //提交订单
      .then(function(response) {
        self.$notify({
          title: '成功',
          message: '付款成功，订单已提交',
          type: 'success'
        });
      })
      .catch(function(err) {
        console.log(err);
        self.$notify({
          title: '失败',
          message: '提交订单失败',
          type: 'error'
        });
      });
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    },
    querySearchAsync(queryString, cb) {
      var ls = [];
      var self = this
      axios
        .get("/api/HEUPOMS/Newspaper" + "/" + this.bookName) //模糊查询
        .then(function(response) {
          self.restaurants = response.data.list;
          console.log(response.data.list)
          self.restaurants.forEach(function(item){
            ls.push({value:item['newspaperName'],index:item['newspaperNo']})
          })
          cb(ls);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleSelect(val) {
      var self = this
      this.restaurants.forEach(function(item){
        if(item['newspaperNo']==val.index)
        {
           self.formBook.no = item.newspaperNo;
           self.formBook.type = item.issue.issueName;
           self.formBook.price = item.price;
           self.formBook.officeNo = item.newsUnit.newsUnitName;
           self.nowOrder.newspaper = item;
        }
      })
    }
  }
};
</script>

<style>
.content {
  margin-left: 100px;
  margin-top: 50px;
  margin-bottom: 50px;
}
.formItem {
  width: 80%;
}
</style>