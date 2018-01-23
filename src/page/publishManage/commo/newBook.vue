<template>
  <div class="newBook">
    <el-card class="box-card">
      <el-steps :space="200" :active="nowStep" finish-status="success" style="margin-left: 200px; margin-right: auto;">
        <el-step title="选择报刊"></el-step>
        <el-step title="填写信息"></el-step>
        <el-step title="结算"></el-step>
      </el-steps>
      <!-- <router-view></router-view> -->
      <div v-show="pageV1" class="content">
        <el-form ref="formBook" :model="formBook" label-width="80px">
          <el-form-item label="报刊名称" class="formItem">
            <el-autocomplete style="width:100%" v-model="bookName" :fetch-suggestions="querySearchAsync" placeholder="请输入报刊名" @select="handleSelect"></el-autocomplete>
          </el-form-item>
          <el-form-item label="报刊编号" class="formItem">
            <el-input placeholder="报刊编号" v-model="formBook.no" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="报刊类型" class="formItem">
            <el-input placeholder="报刊类型" v-model="formBook.type" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="报社编码" class="formItem">
            <el-input placeholder="所属报社编码" v-model="formBook.officeNo" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="单价" class="formItem">
            <el-input placeholder="单价" v-model="formBook.price" :disabled="true">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="pageV2" class="content">
        <el-form ref="formInfo" :model="formInfo" label-width="100px">
          <el-form-item label="报刊编号" class="formItem">
            <el-input v-model="formBook.no" :disabled="true">
          </el-input>
          </el-form-item>
          <el-form-item label="操作员编号" class="formItem">
            <el-input v-model="userNo" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="起始订购时间" class="formItem">
            <el-date-picker type="date" placeholder="选择起始日期" v-model="formInfo.startTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="起始订购时间" class="formItem">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="formInfo.endTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="总价" class="formItem">
            <el-input placeholder="ajax后台获取" v-model="formInfo.allPrice" :disabled="true">
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
        </el-form>
      </div>
      <el-row>
        <el-col :offset="17">
          <el-button type="info" @click="nowStep=nowStep-1" :disabled="lastButton">上一步</el-button>
          <el-col>
          </el-col>
          <el-button v-if="OK" type="primary" @click="nowStep=nowStep+1" >下一步</el-button>
          <el-button v-else type="primary" @click="submitOrder" >完成付款</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "newBook",
  data: function() {
    return {
      nowStep: 1,
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
      formInfo: {
        startTime:"",
        endTime:"",
        allPrice:""
      },
      userNo: "",
      OK: true
    };
  },
  watch: {
    nowStep: function() {
      if (this.nowStep === 2) {
        this.pageV1 = false;
        this.pageV2 = true;
        this.pageV3 = false;
        this.lastButton = false;
        this.OK = true;
      } else if (this.nowStep === 1) {
        this.pageV1 = true;
        this.pageV2 = false;
        this.pageV3 = false;
        this.lastButton = true;
      } else if (this.nowStep === 3) {
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
  },
  methods: {
    submitOrder(){

    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    },
    querySearchAsync(queryString, cb) {
      var restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      axios
        .get(this.server + "/" + this.bookName) //模糊查询
        .then(function(response) {
          restaurants = response.data;
          cb(results);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item); //给formBook赋一波值
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