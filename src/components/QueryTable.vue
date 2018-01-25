<template>
    <div class="queryTable">
        <el-row type="flex" align="middle" style="padding:20px 0;">
            <el-col :offset="12">
                <el-form :inline="true" class="demo-form-inline" style=" margin-top: 20px;" cell-style="{style='font-size:50%;background:#00FF00;'}">
                    <el-form-item>
                        <el-input v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :plain="true" @click.native="handleQuery" type="info">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <el-table :data="mainTableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">

                        <!-- <el-form-item v-for="item in headerData" :key=item.dataIndex label=item.dataIndex>
                            <span>{{ props.row[item.dataIndex] }}</span>
                        </el-form-item> -->

                        <el-form-item label="结束订购时间">
                            <span>{{ props.row.finishDate }}</span>
                        </el-form-item>
                        <el-form-item label="剩余刊期数">
                            <span>{{ props.row.remaining }}</span>
                        </el-form-item>
                        <el-form-item label="支付方式编号">
                            <span>{{ props.row.paymentNo }}</span>
                        </el-form-item>
                        <el-form-item label="收费方式编号">
                            <span>{{ props.row.chargeNo }}</span>
                        </el-form-item>
                        <el-form-item label="办理时间">
                            <span>{{ props.row.handleDate }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="订单编号" prop="orderNo"></el-table-column>
            <el-table-column label="报刊名编号" prop="newspaperNo"></el-table-column>
            <el-table-column label="客户编号" prop="consumerNo"></el-table-column>
            <el-table-column label="办理人编号" prop="empNo"></el-table-column>
            <el-table-column label="总价" prop="totalPrice"></el-table-column>

            <el-table-column label="操作" align="center" property="id" width="180px">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="handleDelay(scope.$index, scope.row)">续订</el-button>
                    <el-button type="text" size="mini" @click="handleSub(scope.$index, scope.row)">退订/转址</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "queryTable",
  props: ['headerData','allCol']
};
</script>

<style>

</style>