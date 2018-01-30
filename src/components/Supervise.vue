<template>
  <div>
    <div style="height:20px;back-groud:red">
      <i class="el-icon-circle-plus da" @click="dialog2 = true" style="  font-size:30pt;  position:absolute; right:130px; buttom:-20px; z-index:500;"></i>
    </div>
    <!-- 添加 -->
    <el-dialog title="添加反馈" :visible.sync="dialog2">
      <el-form :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="反馈类型" label-width="150px">
          <el-select v-model="addForm.type" placeholder="请选择反馈类型" style="width:100%"> 
            <el-option label="投诉" value="1"></el-option>
            <el-option label="建议" value="2"></el-option>
            <el-option label="表扬" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="反馈内容" label-width="150px" prop="delayDate">
          <el-input type="textarea" v-model="addForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-row style="margin-bottom: 18px; ">
      <el-card :body-style="{ padding: '0px' }">
        <div slot="header" style="height:15px">
          <el-tag size="medium">投诉</el-tag>
          <span style="margin-left:10px">From:{{}}</span>
          <span style="position:absolute; right:50px; font-size:10pt">接收时间：2017-2-2</span>
        </div>
        <div style="font-size: 14px;margin-bottom: 18px;margin-left: 20px;margin-top: 18px;">
          '列表内容'
        </div>
      </el-card>
    </el-row>
    <el-row style="margin-bottom: 18px">
      <el-card :body-style="{ padding: '0px' }">
        <div slot="header" style="height:15px">
          <el-tag size="medium" type="success">表扬</el-tag>
          <span style="margin-left:10px">From:</span>
          <span style="position:absolute; right:50px; font-size:10pt">接收时间：2017-2-2</span>
        </div>
        <div style="font-size: 14px;margin-bottom: 18px;margin-left: 20px;margin-top: 18px;">
          '列表内容'
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "supervise",
  data: function() {
    return {
      dialog2: false,
      addForm: {
        type: "",
        content: ""
      },
      addFormRules: {}
    };
  },
  methods: {
    handleAdd() {
      console.log("addd");
      var self= this 
      axios
      .post("/api/HEUPOMS/Order/Add", self.addForm) //添加反馈
      .then(function(response) {
        console.log(response.data);
        self.allPrice = response.data;
        self.nowStep = self.nowStep + 1;
      })
      .catch(function(err) {
        self.$message.error("服务器错误，添加失败");
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
</style>
