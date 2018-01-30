<template>
  <div class="alterBook" v-loading="loading">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>更改订单信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" align="middle" style="padding:20px 0;">
      <el-col :offset="12">
        <el-form :inline="true" class="demo-form-inline" style=" margin-top: 20px;" cell-style="{style='font-size:50%;background:#00FF00;'}">
          <el-form-item>
            <el-tooltip class="item" effect="dark" content="根据订单编号、报刊名、客户姓名、办理人查询" placement="top-start">
              <el-input v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button :plain="true" @click.native="handleQuery" type="info">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="formData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="起始订购时间">
              <span>{{ props.row.startDate }}</span>
            </el-form-item>
            <el-form-item label="结束订购时间">
              <span>{{ props.row.finishDate }}</span>
            </el-form-item>
            <el-form-item label="办理时间">
              <span>{{ props.row.handleDate }}</span>
            </el-form-item>
            <el-form-item label="份数">
              <span>{{ props.row.orderCount }}</span>
            </el-form-item>
            <!-- <el-form-item label="剩余刊期数">
              <span>{{ props.row.remaining }}</span>
            </el-form-item> -->
            <el-form-item label="支付方式">
              <span>{{ props.row.payment.paymentName }}</span>
            </el-form-item>
            <el-form-item label="收费方式">
              <span>{{ props.row.charge.chargeName }}</span>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" prop="orderNo"></el-table-column>
      <el-table-column label="报刊名" prop="newspaper.newspaperName"></el-table-column>
      <el-table-column label="客户姓名" prop="consumer.consumerName"></el-table-column>
      <el-table-column label="办理人" prop="emp.empName"></el-table-column>
      <el-table-column label="总价" prop="totalPrice"></el-table-column>

      <!-- <el-table-column label="起始订购时间" prop="startDate" ></el-table-column>
        <el-table-column label="结束订购时间" prop="finishDate" ></el-table-column>
        <el-table-column label="剩余刊期数" prop="remaining" ></el-table-column>
        <el-table-column label="支付方式编号" prop="paymentNo" ></el-table-column>
        <el-table-column label="收费方式编号" prop="chargeNo" ></el-table-column> -->

      <el-table-column label="操作" align="center" property="id" width="180px">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleDelay(scope.$index, scope.row)">续订</el-button>
          <el-button type="text" size="mini" @click="handleSub(scope.$index, scope.row)">退订/转址</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" justify="end" style="padding:20px 0; ">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="totalData">
      </el-pagination>
    </el-row>

    <!-- 续订 -->
    <el-dialog title="订单续订" :visible.sync="dialog2" >
      <el-form :model="delayForm" ref="delayForm" :rules="rules1">
        <el-form-item label="订单到期时间" label-width="150px">
          <el-date-picker v-model="delayForm.finishDate" readonly type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="延期到" label-width="150px" prop="delayDate">
          <el-date-picker v-model="delayForm.delayDate" type="date" placeholder="选择日期" style="width: 100%;" @blur="getDelayMoney"></el-date-picker>
        </el-form-item>
        <el-form-item label="补交金额" label-width="150px">
          <el-input v-model="delayForm.money" :readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDelayUp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "alterBook",
  data: function() {
    return {
      formData: [],
      form: {},
      dialog2: false,
      delayForm: {
        delayDate: "",
        finishDate: "",
        money: ""
      },
      nowRow: {},
      pageSize: 10,
      nowPage: 1,
      totalData: 1000,
      input: "",
      loading: false,
      rules1:{
        delayDate: [
          { required: true, message: "延期日期不能为空" }
          ,
          { validator: (rule, value, callback) => {
            var oldTime = value.getTime();
            var curTime = new Date(oldTime).format("yyyy-MM-dd");
            if (value === '') {
              callback(new Error('请输入要延期到的日期'));
            } else if (curTime <= this.delayForm.finishDate) {
              callback(new Error('延期不能早于当前时间'));
            } else {
              callback();
            }
          }, trigger: 'blur' }
        ]
      }
    };
  },
  watch:{
    dialog2:function(){
      if(this.dialog2==false){
         this.delayForm.delayDate=''
         this.delayForm.money=''
      }
    }
  },
  created: function() {
    Date.prototype.format = function(fmt) { 
         var o = { 
            "M+" : this.getMonth()+1,                 //月份 
            "d+" : this.getDate(),                    //日 
            "h+" : this.getHours(),                   //小时 
            "m+" : this.getMinutes(),                 //分 
            "s+" : this.getSeconds(),                 //秒 
            "q+" : Math.floor((this.getMonth()+3)/3), //季度 
            "S"  : this.getMilliseconds()             //毫秒 
        }; 
        if(/(y+)/.test(fmt)) {
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        }
         for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
             }
         }
        return fmt; 
    }
    this.init();
  },
  computed: {},
  methods: {
    init: function() {
      var self = this;
      self.loading = true;
      axios
        .get(
          "/api/HEUPOMS/Order?nowPage=" +
            this.nowPage +
            "&pageSize=" +
            this.pageSize
        ) //模糊查询
        .then(function(response) {
          self.totalData = response.data.total;
          self.formData = response.data.list;
          console.log("aaaaaaaaaaaa")
          console.log(self.formData)
          self.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          self.loading = false;
        });
    },
    handleDelay: function(index, row) {
      this.delayForm.finishDate = JSON.parse(JSON.stringify(row.finishDate));
      this.nowRow = row;
      this.dialog2 = true;
    },
    handleDelayUp: function() {
      //this.nowRow.finishDate = this.delayForm.delayDate;
      var self = this;
      this.$refs["delayForm"].validate(valid => {
        if (valid) {
         axios
         .post("/api/HEUPOMS/Order/RenewConfirm", this.nowRow) // 修改截止日期
         .then(function(response) {
           console.log(response);
           self.$notify({
             title: "成功",
             message: "续订成功",
             type: "success"
           });
           self.init();
         })
         .catch(function(err) {
           self.$notify({
             title: "失败",
             message: "续订失败",
             type: "error"
           });
           console.log(err);
         });
         this.dialog2 = false;
        } else {
          console.log("error submit!!");
        }
      });
    },
    getDelayMoney: function() {
      var lastDate = this.nowRow.finishDate
      var oldTime = this.delayForm.delayDate.getTime();
      var curTime = new Date(oldTime).format("yyyy-MM-dd");
      this.nowRow.finishDate = curTime
      var self = this;
      console.log(this.nowRow)
      axios
        .post("/api/HEUPOMS/Order/Renew", this.nowRow)    // 截止日期的补交金额
        .then(function(response) {
          console.log(response);
          self.delayForm.money=response.data;
          self.nowRow.finishDate = lastDate
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleSub: function(index, row) {
      var no = row.orderNo;
      this.$router.push({
        // path: "/2/commo/bookSubOrder",
        name: "bookSubOrder",
        params: {
          name: "ooo",
          // dataObj: row,
          bookNo: no
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.nowPage = val;
      this.init();
    },
    handleQuery() {
      var self = this;
      self.loading = true;
      axios
        .get(
          "/api/HEUPOMS/Order?param=" +
            this.input +
            "&nowPage=" +
            this.nowPage +
            "&pageSize=" +
            this.pageSize
        ) //模糊查询
        .then(function(response) {
          console.log(response.data.list);
          self.totalData = response.data.total;
          self.formData = response.data.list;
          self.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          self.loading = false;
        });
    }
  }
};
</script>

<style>
/* 路由切换动效 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>