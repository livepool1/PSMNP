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
            <el-form-item label="报刊名编号">
              <span>{{ props.row.newspaper.newspaperNo }}</span>
            </el-form-item>
            <el-form-item label="客户编号">
              <span>{{ props.row.consumer.consumerNo }}</span>
            </el-form-item>
            <el-form-item label="办理人编号">
              <span>{{ props.row.emp.empName }}</span>
            </el-form-item>
            <el-form-item label="起始订购时间">
              <span>{{ props.row.startDate }}</span>
            </el-form-item>
            <el-form-item label="结束订购时间">
              <span>{{ props.row.finishDate }}</span>
            </el-form-item>
            <!-- <el-form-item label="剩余刊期数">
              <span>{{ props.row.remaining }}</span>
            </el-form-item> -->
            <el-form-item label="支付方式">
              <span>{{ props.row.payment.paymentName }}</span>
            </el-form-item>
            <el-form-item label="收费方式编号">
              <span>{{ props.row.charge.chargeName }}</span>
            </el-form-item>
            <el-form-item label="办理时间">
              <span>{{ props.row.handleDate }}</span>
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
    <el-dialog title="订单续订" :visible.sync="dialog2">
      <el-form >
        <el-form-item label="订单到期时间" label-width="150px">
          <el-date-picker v-model="finishDate" readonly type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="延期到" label-width="150px">
          <el-date-picker v-model="delayDate" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="补交金额" label-width="150px">
          <el-input disabled></el-input>
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
      delayDate: "",
      finishDate: "",
      nowRow:{},
      pageSize: 10,
      nowPage: 1,
      totalData: 1000,
      input:'',
      loading: false
    };
  },
  created: function() {
    this.init()
  },
  computed: {},
  methods: {
    init: function() {
      var self = this;
      self.loading = true;
      axios
        .get("/api/HEUPOMS/Order?nowPage=" + this.nowPage +"&pageSize=" + this.pageSize) //模糊查询
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

    },
    handleDelay: function(index, row) {
      this.finishDate = row.finishDate
      this.nowRow = row
      this.dialog2 = true;
    },
    handleDelayUp: function() {
      this.nowRow.finishDate  =  this.delayDate
      axios
      .post("/api/HEUPOMS/Order/Update",this.nowRow) // 修改截止日期
      .then(function(response) {
        console.log(response.data.list);
        self.formData = response.data.list;
      })
      .catch(function(err) {
        console.log(err);
      });
      this.dialog2 = false;
    },
    handleSub: function(index, row) {
      var no = row.orderNo
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
    handleQuery(){
      var self = this;
      self.loading = true;
      axios
        .get("/api/HEUPOMS/Order/"+this.input+ "?nowPage=" + this.nowPage +"&pageSize=" + this.pageSize) //模糊查询
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