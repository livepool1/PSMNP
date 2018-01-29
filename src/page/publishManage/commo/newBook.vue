<template>
  <div class="newBook" v-loading="loading">
    <el-steps :space="200" :active="nowStep" finish-status="success" style="margin-left: 200px; margin-right: auto;">
      <el-step title="选择报刊"></el-step>
      <el-step title="填写信息"></el-step>
      <el-step title="结算"></el-step>
    </el-steps>
    <!-- <router-view></router-view> -->
    <div v-show="pageV1" class="content">
      <el-form ref="formBook" label-width="80px" :rules="rules1" :model="formBook">
        <el-form-item label="报刊名称" class="formItem" prop="bookName">
          <el-autocomplete style="width:100%" v-model="formBook.bookName" :fetch-suggestions="querySearchAsync" placeholder="请输入报刊名" @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <!-- nowOrder.newspaper.newspaperNo -->
        <el-form-item label="报刊编号" class="formItem" prop="no">
          <el-input placeholder="报刊编号" v-model="formBook.no" :readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="报刊类型" class="formItem">
          <el-input placeholder="报刊类型" v-model="formBook.type" :readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="报社编码" class="formItem">
          <el-input placeholder="所属报社编码" v-model="formBook.officeNo" :readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="单价" class="formItem">
          <el-input placeholder="单价" v-model="formBook.price" :readonly="true">
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <!-- 会员办理 -->
    <el-dialog title="会员办理" :visible.sync="vipVisible">
      <el-form :model="vipForm" ref="vipForm" :rules="vipRules">
        <el-form-item label="用户姓名" label-width="150px" prop="userName">
          <el-input placeholder="用户姓名" v-model="vipForm.userName"> </el-input>
        </el-form-item>
        <el-form-item label="电话号码" label-width="150px" prop="phoneNum">
          <el-input placeholder="电话号码" v-model.number="vipForm.phoneNum"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleVIP">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 会员办理 END -->

    <div v-show="pageV2" class="content">
      <el-form label-width="100px" :model="form2" ref="form2" :rules="rules2">
        <el-form-item label="报刊编号" class="formItem">
          <el-input v-model="formBook.no" :readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="操作员编号" class="formItem">
          <el-input v-model="nowEmp" :readonly="true">
          </el-input>
        </el-form-item>

        <!-- nowOrder.consumer.consumerPhone = form2.phoneNum -->
        <el-form-item label="电话" class="formItem" prop="phoneNum">
          <el-input v-model.number="form2.phoneNum" @change="getOneByPhone">
          </el-input>
        </el-form-item>

        <!-- nowOrder.consumer.consumerName = form2.consumerName -->
        <el-form-item label="订户姓名" prop="consumerName">
          <el-input style="width: 77%;" v-model="form2.consumerName">
          </el-input>
          <el-button type="text" @click="becomeVip">成为会员</el-button>
        </el-form-item>

        <el-form-item label="会员类型" class="formItem" prop="vipType">
          <el-input v-model="form2.vipType" readonly>
          </el-input>
          <!-- <el-select disabled no-data-text="普通用户" v-model="form2.vipType" style="width:100%">
            <el-option label="普通用户" value="1"></el-option>
            <el-option label="大客户" value="2"></el-option>
            <el-option label="会员" value="3"></el-option>
          </el-select> -->
        </el-form-item>

        <!-- nowOrder.location = form2.addS-->
        <el-form-item label="地区" class="formItem" prop="addS">
          <el-select v-model="form2.addS" placeholder="请选择地区" style="width:100%">
            <el-option v-for="item in locationList" :key="item.locNo" :label="item.locName" :value="item.locNo"></el-option>
          </el-select>
        </el-form-item>
        <!-- nowOrder.subOrderLocDetail = form2.add-->
        <el-form-item label="详细地址" class="formItem" prop="add">
          <el-input v-model="form2.add">
          </el-input>
        </el-form-item>

        <el-form-item label="订购份数" class="formItem" prop="howMany">
          <el-input v-model.number="form2.howMany" @change="becomeBig">
          </el-input>
        </el-form-item>

        <el-form-item label="订购时间" class="formItem" prop="date">
          <el-date-picker style="width: 100%;" v-model="form2.date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="vvv">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="pageV3" class="content">
      <el-form label-width="100px" ref="form3" :rules="rules3" :model="form3">
        <!-- <el-form-item label="期刊数量" class="formItem">
          <el-input v-model="backData.bookNum" :readonly="true">
          </el-input>
        </el-form-item> -->
        <el-form-item label="单价" class="formItem">
          <el-input v-model="nowOrder.newspaper.price" :readonly="true">
          </el-input>
        </el-form-item>
        <el-form-item label="总价" class="formItem">
          <el-input v-model="allPrice" :readonly="true">
          </el-input>
        </el-form-item>
        <!-- nowOrder.payment.paymentNo = form3.payment-->
        <el-form-item label="付款方式" class="formItem" prop="payment">
          <el-select v-model="form3.payment" placeholder="请选择付款方式" style="width:100%">
            <el-option label="现金" value="1"></el-option>
            <el-option label="支票" value="2"></el-option>
            <el-option label="现金+支票" value="3"></el-option>
            <el-option label="增卡分别送报" value="4"></el-option>
            <el-option label="其他" value="5"></el-option>
          </el-select>
        </el-form-item>
        <!-- nowOrder.charge.chargeNo = form3.charge-->
        <el-form-item label="支付方式" class="formItem" prop="charge">
          <el-select v-model="form3.charge" placeholder="请选择支付方式" style="width:100%">
            <el-option label="普通收费" value="1"></el-option>
            <el-option label="先定报后收费" value="2"></el-option>
            <el-option label="电话订报上门收费" value="3"></el-option>
            <el-option label="异地收费" value="4"></el-option>
            <el-option label="集体收费" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-col :offset="17">
        <el-button type="info" @click="toLast" :disabled="lastButton">上一步</el-button>
        <el-col>
        </el-col>
        <el-button v-if="OK" type="primary" @click="toNext">下一步</el-button>
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
      allPrice: "",
      nowOrder: {},
      nowStep: 0,
      pageV1: true,
      pageV2: false,
      pageV3: false,
      lastButton: true,
      formBook: {
        bookName: "",
        no: "",
        type: "",
        price: "",
        officeNo: ""
      },
      rules1: {
        bookName: [{ required: true, message: "报刊名不能为空" }],
        no: [{ required: true, message: "编号为空", trigger: "change" }]
      },
      form2: {
        consumerName: "",
        phoneNum: null,
        addS: null,
        add: "",
        date: "",
        howMany: "",
        vipType: ""
      },
      rules2: {
        consumerName: [
          { required: true, message: "请输入客户姓名" }//, trigger: "blur"
        ],
        phoneNum: [
          { required: true, message: "请输入电话号码" },
          { type: "number", message: "电话必须为数字值" }
        ],
        howMany: [
          { required: true, message: "请输入订购份数" },
          { type: "number", message: "必须为数字值" }
        ],
        addS: [{ required: true, message: "请选择地区", trigger: "change" }],
        add: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
        date: [
          {
            // type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ]
      },
      form3: {
        payment: "",
        charge: ""
      },
      rules3: {
        payment: [{ required: true, message: "请选择付款方式" }],
        charge: [{ required: true, message: "请选择支付方式" }]
      },
      OK: true,
      restaurants: [],
      nowEmp: "",
      loading: true,
      locationList: [],
      vipVisible: false,
      vipForm: {
        userName: "",
        phoneNum: ""
      },
      vipRules: {
        userName: [{ required: true, message: "请填写姓名" }],
        phoneNum: [
          { required: true, message: "请填写电话号码" },
          { type: "number", message: "必须为数字值" }
        ]
      },
      nowCus: {
        consumerType: {
          consumerTypeName: "普通客户",
          consumerTypeNo: null
        }
      }
      // self.nowCus.consumerType.consumerTypeName
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
    var self = this;
    axios
      .get("/api/HEUPOMS/Order") //模糊查询
      .then(function(response) {
        self.nowOrder = response.data.list[0];
        self.nowOrder.consumer.consumerName = "";
        self.nowOrder.consumer.consumerPhone = "";
        self.nowOrder.consumer.consumerNo = 0;
        self.nowOrder.consumer.consumerType.consumerTypeNo = 1;
        self.nowOrder.startDate = "";
        self.nowOrder.finishDate = "";
        self.loading = false;
        self.nowOrder.charge.chargeNo = "";
        self.nowOrder.payment.paymentNo = "";
        console.log(self.nowOrder);
      })
      .catch(function(err) {
        console.log(err);
        self.loading = false;
      }); //.startDate
    var s =  this.getCookie("session")
    this.nowEmp = s.substr(6,3);
    self.form2.vipType = "普通客户";
   // self.nowCus.consumerType.consumerTypeName = "普通客户";
  },
  methods: {
    vvv() {
      this.form2.date;
      var day1 = this.form2.date[0];
      var s1 =
        day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
      var day2 = this.form2.date[1];
      var s2 =
        day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
      this.nowOrder.startDate = s1;
      this.nowOrder.finishDate = s2;
    },
    submitOrder() {
      var self = this;
      this.$refs["form3"].validate(valid => {
        if (valid) {
          this.nowOrder.charge.chargeNo = parseInt(this.form3.charge);
          this.nowOrder.payment.paymentNo = parseInt(this.form3.payment);
          console.log("sssssssubmit");
          console.log(self.nowOrder);
          axios
            .post("/api/HEUPOMS/Order/AddConfirm", self.nowOrder) //提交订单
            .then(function(response) {
              self.$notify({
                title: "成功",
                message: "付款成功，订单已提交",
                type: "success"
              });
              self.$router.push({ path: "/2/commo/alterBook" });
            })
            .catch(function(err) {
              console.log(err);
              self.$notify({
                title: "失败",
                message: "提交订单失败",
                type: "error"
              });
            });
        } else {
          console.log("error submit!!");
        }
      });
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    },
    querySearchAsync(queryString, cb) {
      var ls = [];
      var self = this;
      axios
        .get("/api/HEUPOMS/Newspaper" + "/" + queryString) //模糊查询
        .then(function(response) {
          self.restaurants = response.data.list;
          console.log(response.data.list);
          self.restaurants.forEach(function(item) {
            ls.push({
              value: item["newspaperName"],
              index: item["newspaperNo"]
            });
          });
          cb(ls);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleSelect(val) {
      var self = this;
      this.restaurants.forEach(function(item) {
        if (item["newspaperNo"] == val.index) {
          self.formBook.no = item.newspaperNo;
          self.formBook.type = item.issue.issueName;
          self.formBook.price = item.price;
          self.formBook.officeNo = item.newsUnit.newsUnitName;
          self.nowOrder.newspaper = item;
        }
      });
    },
    toNext() {
      if (this.nowStep == 0) {
        this.$refs["formBook"].validate(valid => {
          if (valid) {
            // locationList
            var self = this;
            axios
              .get("/api/HEUPOMS/Location") //查找地区
              .then(function(response) {
                console.log(response.data.list);
                self.locationList = response.data.list;
              })
              .catch(function(err) {
                console.log(err);
              });
            //
            this.nowOrder.newspaper.newspaperNo = this.formBook.no;
            this.nowStep = this.nowStep + 1;
          } else {
            console.log("error submit!!");
          }
        });
      } else if (this.nowStep == 1) {
        var self = this;
        this.$refs["form2"].validate(valid => {
          if (valid) {
            this.nowOrder.consumer.consumerName = this.form2.consumerName;
            this.nowOrder.consumer.consumerPhone = this.form2.phoneNum;
            this.nowOrder.orderCount = this.form2.howMany;
            this.nowOrder.emp.empNo  = parseInt(this.nowEmp);
            self.locationList.forEach(function(item) {
              console.log("oooo");
              console.log(item);
              if (item.locNo == self.form2.addS) {
                console.log("ooookkkkkkk");
                console.log(item);
                self.nowOrder.location = item;
                return;
              }
            });
            this.nowOrder.subOrderLocDetail = this.form2.add;

            console.log(self.nowOrder);
            axios
              .post("/api/HEUPOMS/Order/Add", self.nowOrder) //获取总价
              .then(function(response) {
                console.log(response.data);
                self.allPrice = response.data;
                self.nowStep = self.nowStep + 1;
              })
              .catch(function(err) {
                self.$message.error("订购时间过短或服务器错误");
                console.log(err);
              });
          } else {
            console.log("error submit!!");
          }
        });
      }
    },
    toLast() {
      this.nowStep = this.nowStep - 1;
    },
    getOneByPhone() {
      var self = this;
      axios
        .get("/api/HEUPOMS/Consumer/" + this.form2.phoneNum) //根据电话查找客户
        .then(function(response) {
          if (response.data != "") {
            console.log("不为空");
            console.log(response.data);
            self.nowCus = response.data; //consumer
            self.form2.consumerName = self.nowCus.consumerName;
            self.form2.vipType = self.nowCus.consumerType.consumerTypeName;
            self.nowOrder.consumer.consumerType.consumerTypeNo =
              self.nowCus.consumerType.consumerTypeNo;
            self.nowOrder.consumer.consumerNo = self.nowCus.consumerNo; //consumerNo,consumerTypeNo
          } else {
            console.log("为空");
            console.log(self.nowCus);
            self.form2.consumerName = "";
            self.form2.vipType = "";
            self.nowOrder.consumer.consumerNo = 0;
            self.form2.vipType = self.nowCus.consumerType.consumerTypeName;
            self.nowOrder.consumer.consumerType.consumerTypeNo = 1;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    becomeVip() {
      //显示窗口
      this.vipForm.userName = this.form2.consumerName;
      this.vipForm.phoneNum = this.form2.phoneNum;
      this.vipVisible = true;
    },
    handleVIP() {
      this.form2.vipType = "会员用户";
      this.nowOrder.consumer.consumerType.consumerTypeNo = 3;  //consumer.consumerType.consumerTypeNo
      this.vipVisible = false;
    },
    becomeBig() {
      if (this.form2.howMany > 100) {
        this.form2.vipType = "大客户";
        this.nowOrder.consumer.consumerType.consumerTypeNo = 2;
      } else {
        this.form2.vipType = this.nowCus.consumerType.consumerTypeName;
        this.nowOrder.consumer.consumerType.consumerTypeNo = 1;
      }
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