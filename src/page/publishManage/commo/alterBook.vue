<template>
  <div class="alterBook">
    <h3>更改订单信息</h3>

    <el-table :data="mainTableData" style="width: 100%">
      <el-table-column label="订单编号" prop="orderNo"></el-table-column>
      <el-table-column label="报刊名编号" prop="newspaperNo"></el-table-column>
      <el-table-column label="客户编号" prop="consumerNo"></el-table-column>
      <el-table-column label="办理员工编号" prop="empNo"></el-table-column>
      <el-table-column label="办理时间" prop="handleDate"></el-table-column>
      <el-table-column label="总价" prop="totalPrice"></el-table-column>

      <!-- <el-table-column label="起始订购时间" prop="startDate" ></el-table-column>
        <el-table-column label="结束订购时间" prop="finishDate" ></el-table-column>
        <el-table-column label="剩余刊期数" prop="remaining" ></el-table-column>
        <el-table-column label="支付方式编号" prop="paymentNo" ></el-table-column>
        <el-table-column label="收费方式编号" prop="chargeNo" ></el-table-column> -->

      <el-table-column label="操作" align="center" property="id" width="180px">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleMore(scope.$index, scope.row)">详情</el-button>
          <el-button type="text" size="mini" @click="handleDelay(scope.$index, scope.row)">续订</el-button>
          <el-button type="text" size="mini" @click="handleSub(scope.$index, scope.row)">退订/转址</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详情 -->
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
      <el-form :v-model="form">
        <el-form-item label="订单编号" label-width="150px">
          <el-input v-model="form.orderNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="报刊名编号" label-width="150px">
          <el-input v-model="form.newspaperNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户编号" label-width="150px">
          <el-input v-model="form.consumerNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="办理员工编号" label-width="150px">
          <el-input v-model="form.empNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="办理时间" label-width="150px">
          <el-input v-model="form.handleDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="总价" label-width="150px">
          <el-input v-model="form.totalPrice" disabled></el-input>
        </el-form-item>
        <el-form-item label="起始订购时间" label-width="150px">
          <el-input v-model="form.startDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="结束订购时间" label-width="150px">
          <el-input v-model="form.finishDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="剩余刊期数" label-width="150px">
          <el-input v-model="form.remaining" disabled></el-input>
        </el-form-item>
        <el-form-item label="支付方式编号" label-width="150px">
          <el-input v-model="form.paymentNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="收费方式编号" label-width="150px">
          <el-input v-model="form.chargeNo" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 续订 -->
    <el-dialog title="订单续订" :visible.sync="dialog2">
      <el-form :v-model="form">
        <el-form-item label="订单到期时间" label-width="150px">
          <el-date-picker disabled type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="延期到" label-width="150px">
          <el-date-picker v-model="delayDate" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="补交金额" label-width="150px">
          <el-input disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog2 = false">确 定</el-button>
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
      mainTableData: [
        {
          orderNo: "1",
          newspaperNo: "2",
          consumerNo: "3",
          empNo: "4",
          handleDate: "",
          startDate: "",
          finishDate: "",
          totalPrice: "",
          remaining: "",
          paymentNo: "",
          center: "",
          chargeNo: ""
        }
      ],
      dialogFormVisible: false,
      form: {},
      dialog2: false,
      delayDate: ""
    };
  },
  created: function() {},
  computed: {},
  methods: {
    handleMore: function(index, row) {
      this.form = row;
      this.dialogFormVisible = true;
    },
    handleDelay: function(index, row) {
      this.dialog2 = true;
    },
    handleSub: function(index, row) {
      this.$router.push({
        path: "/2/commo/bookSubOrder",
        params: {
          dataObj: row
        }
      })
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
</style>