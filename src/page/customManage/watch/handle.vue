<template>
  <div v-loading="loading">
    <div style="height:20px">
      <i class="el-icon-circle-plus da" @click="dialog2 = true" style="  font-size:30pt;  position:absolute; right:130px; buttom:-20px; z-index:500;"></i>
    </div>
    <!-- 添加 -->
    <el-dialog title="添加反馈" :visible.sync="dialog2">
      <el-form :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="反馈类型" label-width="150px" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择反馈类型" style="width:100%">
            <el-option label="投诉" value="投诉"></el-option>
            <el-option label="建议" value="建议"></el-option>
            <el-option label="表扬" value="表扬"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" label-width="150px" prop="phone">
          <el-input v-model.number="addForm.phone" @change="getOneByPhone">
          </el-input>
        </el-form-item>
        <el-form-item label="订户姓名" label-width="150px" prop="consumerName">
          <el-input readonly v-model="addForm.consumerName"></el-input>
        </el-form-item>
        <el-form-item label="会员类型" label-width="150px" prop="consumerType">
          <el-input readonly v-model="addForm.consumerType"></el-input>
        </el-form-item>
        <el-form-item label="接收时间" label-width="150px" prop="getDate">
          <el-input readonly v-model="addForm.getDate"></el-input>
        </el-form-item>
        <el-form-item label="发行站名称" label-width="150px" prop="publishName">
          <el-autocomplete style="width:100%" v-model="addForm.publishName" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <el-form-item label="发行站编号" label-width="150px" prop="publishNo">
          <el-input readonly v-model="addForm.publishNo"></el-input>
        </el-form-item>
        <el-form-item label="反馈内容" label-width="150px" prop="content">
          <el-input type="textarea" v-model="addForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!--监督内容 el-icon-error-->
    <div v-for="(item,index) in watchData" :key="item.supervisionNo">
      <i class="el-icon-error di" @click="delSupvis(index)" style="font-size:20pt; color:red; position:absolute; left:325px; buttom:-20px; z-index:500;"></i>
    <el-row style="margin-bottom: 18px;" >
      <el-card :body-style="{ padding: '0px' }">
        <div slot="header" style="height:15px">
          <el-row>
            <el-col :span="2">
              <el-tag v-if="item.supervisionType=='投诉'" size="medium" type="danger">投诉</el-tag>
              <el-tag v-if="item.supervisionType=='表扬'" size="medium" type="success">表扬</el-tag>
              <el-tag v-if="item.supervisionType=='建议'" size="medium" type="primary">建议</el-tag>
            </el-col>
            <el-col :span="4">
              <span>From：{{item.consumer.consumerName}}</span>
            </el-col>
            <el-col :span="5" :offset="9">
              <span style="font-size:10pt">接收时间：{{item.initDate}}</span>
            </el-col>
            <el-col :span="3">
              <el-button type="warning" plain size="mini" @click="toPublish(index)">下发到发行站</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 14px;margin-bottom: 18px;margin-left: 20px;margin-top: 18px;">
          {{item.supervisionInfo}}
        </div>
      </el-card>
    </el-row>
    </div>
    <!--监督END-->

    <el-row type="flex" justify="end" style="padding:20px 0; ">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="totalData">
      </el-pagination>
    </el-row>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "handle",
  data: function() {
    return {
      dialog2: false,
      addForm: {
        type: "",
        content: "",
        phone: "",
        consumerName: "",
        consumerType: "",
        consumerNo: "",
        getDate: "",
        publishNo: "",
        publishName: ""
      },
      nowSupervis:{
          supervisionNo: null,
          supervisionType: "",
          distribution: {
              distributionNo: null,
              distributionName: "",
              loc: null,
              distributionPersonName: null,
              distributionPersonContact: null
          },
          consumer: {
              consumerNo: 2,
              consumerName: "",
              consumerPhone: "",
              consumerType: null,
              consumerEmail: null
          },
          initDate: "",
          handleDate: "",
          supervisionInfo: "",
          handleFlag: false,
          sentFlag: false
      },
      addFormRules: {
        content: [{ required: true, message: "反馈内容不能为空" }],
        type: [{ required: true, message: "投诉类型不能为空" }],
        phone: [{ required: true, message: "电话不能为空" }],
        consumerName: [{ required: true, message: "客户必须存在" }],
        publishName: [{ required: true, message: "发行站名称" }],
        publishNo: [{ required: true, message: "发行站必须存在" }]
      },
      nowCus: {},
      watchData: [],
      pageSize: 10,
      nowPage: 1,
      totalData: 1000,
      loading: false
    };
  },
  created: function() {
    this.addForm.getDate = this.getNowFormatDate();
    this.init();
  },
  methods: {
    init() {
      var self = this;
      self.loading = true;
      axios
        .get(
          "/api/HEUPOMS/Supervision/Service/Unsent?nowPage=" +
            this.nowPage +
            "&pageSize=" +
            this.pageSize
        ) //获取客服系统所有的反馈
        .then(function(response) {
          console.log(response.data);
          self.totalData = response.data.total;
          self.watchData = response.data.list;
          console.log(self.watchData);
          self.loading = false;
        })
        .catch(function(err) {
          self.$message.error("服务器错误");
          console.log(err);
          self.loading = false;
        });
    },
    handleAdd() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          var self = this;
          self.nowSupervis.supervisionType = self.addForm.type;                 //转换-------
          self.nowSupervis.distribution.distributionNo = self.addForm.publishNo;
          self.nowSupervis.consumer.consumerNo = self.addForm.consumerNo;
          self.nowSupervis.initDate = self.addForm.getDate;
          self.nowSupervis.supervisionInfo = self.addForm.content;
          self.nowSupervis.sentFlag = false
          console.log(self.nowSupervis)
          axios
            .post("/api/HEUPOMS/Supervision/Service/Add ", self.nowSupervis) //添加反馈
            .then(function(response) {
              console.log(response.data);
              self.$notify({
                title: "成功",
                message: "反馈添加成功",
                type: "success"
              });
              // for(var key in self.addForm)
              //      self.addForm[key]=''
              self.dialog2 = false
              self.init();
            })
            .catch(function(err) {
              self.$message.error("服务器错误，添加失败");
              console.log(err);
            });
        } else {
          console.log("error submit!!");
        }
      });
    },
    getOneByPhone() {
      var self = this;
      axios
        .get("/api/HEUPOMS/Consumer/" + this.addForm.phone) //根据电话查找客户
        .then(function(response) {
          console.log(response.data);
          self.nowCus = response.data;
          self.addForm.consumerName = self.nowCus.consumerName;
          self.addForm.consumerType = self.nowCus.consumerType.consumerTypeName;
          self.addForm.consumerNo = self.nowCus.consumerNo;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    querySearchAsync(queryString, cb) {
      var ls = [];
      var self = this;
      axios
        .get("/api/HEUPOMS/Distribution" + "/" + queryString) //发行站名称查编号
        .then(function(response) {
          self.restaurants = response.data.list;
          console.log(response.data.list);
          self.restaurants.forEach(function(item) {
            ls.push({
              value: item["distributionName"],
              index: item["distributionNo"]
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
        if (item["distributionNo"] == val.index) {
          self.addForm.publishNo = item.distributionNo;
        }
      });
    },
    toPublish(index) {
      var self = this;
      axios
        .put("/api/HEUPOMS/Supervision/Service/Send/"+self.watchData[index].supervisionNo) // 下发
        .then(function(response) {
          console.log(response.data);
          self.$notify({
            title: "成功",
            message: "下发成功",
            type: "success"
          });
          self.init();
        })
        .catch(function(err) {
          self.$notify({
            title: "失败",
            message: "下发失败",
            type: "error"
          });
          console.log(err);
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
    delSupvis(index){
      console.log(index)
      var self = this;
      axios
        .delete("/api/HEUPOMS/Supervision/Service/Del/"+self.watchData[index].supervisionNo) // 删除
        .then(function(response) {
          console.log(response.data);
          self.init();
        })
        .catch(function(err) {
          self.$message.error("删除失败");
          console.log(err);
        });
    }
  }
};
</script>

<style>
.da:hover {
  box-shadow: 1px 1px 10px #333;
  border-radius: 50% 50%;
}
.di:hover {
  box-shadow: 1px 1px 10px rgb(150, 51, 51);
  border-radius: 50% 50%;
}
</style>
