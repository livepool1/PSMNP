<template>
  <div class="ctable" v-loading="loading">

    <h3>{{tableName}}</h3>
    <el-row type="flex" align="middle" :gutter="20" style="padding:20px 0;">
      <el-col :span="3" style="width: 160px;text-align: center;">
        已选择{{ activeNum }}
      </el-col>
      <!-- <el-col :span="3" style="width: 140px;">
      <el-select v-model="currentType" placeholder="请选择活动分类">
        <el-option v-for="type in types" :value="type" :key="type">
        </el-option>
      </el-select>
    </el-col> -->
      <el-col :span="9">
        <!--<el-button :plain="true" type="info">设置活动分类</el-button>-->
        <el-button :plain="true" @click="clickAdd" type="primary">添加</el-button>
        <el-button :plain="true" @click.native="handleRemove" type="danger">删除</el-button>
        <!-- <el-button :plain="true" @click.native="handleMoveToTop" type="info">置顶</el-button>
      <el-button :plain="true" @click.native="handleCopy" type="info">复制</el-button> -->
      </el-col>
      <el-col :span="12">
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

    <!-- 模态 ADD -->
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
      <el-form :rules="formRuls" :model="form" ref="form">
        <el-form-item v-for="item in formWindow.col" :key="item.name" :label="item.label" :prop="item.name" label-width="120px">
          <el-input v-if="item.type === 'inputID'" v-model="item.value" :disabled="true" @blur="doSomethingElse(item.name,item.value)" @change="doSomethingElse(item.name,item.value)"></el-input>
          <el-input v-else-if="item.type === 'input'" v-model="item.value" @blur="doSomethingElse(item.name,item.value)" @change="doSomethingElse(item.name,item.value)" clearable></el-input>
          <el-input v-else-if="item.type === 'number'" v-model="item.value" @blur="doSomethingElse(item.name,item.value)" @change="doSomethingElse(item.name,item.value)" clearable></el-input>
          <el-input v-else v-model="item.value" @blur="doSomethingElse(item.name,item.value)" @change="doSomethingElse(item.name,item.value)" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFormOK('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" @cell-click="handleSelect" @selection-change="selectionchange">
      <el-table-column type="selection" width="50"></el-table-column>

      <template id="allData">
        <template v-for="item in headerData">
          <el-table-column :key="item.dataIndex" :label="item.dataIndex" :prop="item.name"></el-table-column>
        </template>
      </template>

      <el-table-column fixed="right" label="操作" align="center" property="id">
        <template slot-scope="scope">
          <el-button type="text" size="mini">详情/更改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" justify="end" style="padding:20px 0; ">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="totalData">
      </el-pagination>
    </el-row>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ctable",
  props: [
    "headerData",
    "server",
    "tableName",
    "aform",
    "aformWindow",
    "formRuls"
  ],
  data: function() {
    return {
      input: "",
      activeNum: 0,
      selectItems: [],
      dialogFormVisible: false,
      formType: "add",
      formTitle: "添加",
      form: {},
      formWindow: {},
      // tableData: [{deptNo: '11',
      // deptName: '333'}],
      tableData: [],
      pageSize: 10,
      nowPage: 1,
      totalData: 1000,
      loading: true,
      arJson:[]
    };
  },
  created: function() {
    this.init();
    console.log("当前表格",this.aform)
  },watch : {
    dialogFormVisible: function(oldVal, newVal) {
      if(newVal) {
        
      this.form = JSON.parse(JSON.stringify(this.aform));
      this.formWindow = JSON.parse(JSON.stringify(this.aformWindow));

      console.log(this.aform)
      console.log(this.aformWindow)

      console.log("已重置")
      } else {
        for( var x in this.formWindow.col) {
          console.log("啊")
          this.updateAnd(this.formWindow.col[x].name,this.form,this.formWindow.col[x].value,1);
        }
        console.log(this.form)
        console.log(this.formWindow)
        console.log("啊啊啊")
      }

    }
  },
  methods: {
    init: function() {
      var self = this;
      self.loading = true;
      axios
        .get(
          this.server +
            "?nowPage=" +
            this.nowPage +
            "&pageSize=" +
            this.pageSize
        ) //查询所有
        .then(function(response) {
          console.log(response);
          var tem = response.data;
          self.totalData = tem["total"];
          self.tableData = tem["list"];
          self.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          self.$message.error("数据获取失败");
          self.loading = false;
        });
      this.form = JSON.parse(JSON.stringify(this.aform));
      this.formWindow = JSON.parse(JSON.stringify(this.aformWindow));
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.nowPage = val;
      this.init();
    },
    handleFormOK: function(formName) {
      console.log(this.form)
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form);
          if (this.formType == "add") this.handleAdd();
          else if (this.formType == "update") this.handleUpdate();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleUpdate: function() {
      var self = this;
      axios
        .put(this.server, this.form) //更新
        .then(function(response) {
          // self.tableData = response;
          self.$message({
            message: "更新成功",
            type: "success"
          });
          self.init();
          console.log(response);
        })
        .catch(function(err) {
          self.$message.error("更新失败");
          console.log(err);
        });
      this.form = this.aform;
      this.dialogFormVisible = false;
    },
    handleAdd: function() {
      var self = this;
      console.log("dasdasd")
      console.log( this.form)
      axios
        .post(this.server + "/Add", this.form) //添加
        .then(function(response) {
          // self.tableData = response;
          self.$message({
            message: "添加成功",
            type: "success"
          });
          self.init();
          console.log(response);
        })
        .catch(function(err) {
          self.$message.error("添加失败");
          console.log(err);
        });
      console.log("我提交的是",this.form)
      this.form = this.aform;
      this.dialogFormVisible = false;
    },
    clickAdd: function() {
      // this.formWindow.col.forEach(function(item,index,array){  //清空
      //   item.value=""
      // })
      // for(var key in this.form)
      //   this.form[key]=""

      this.formTitle = "新增";
      this.formType = "add";
      this.dialogFormVisible = true;
    },
    refining:  function(arJsonNesting) {
      for (var key in arJsonNesting) {
        if ( typeof(arJsonNesting[key]) == "object") {
          this.refining(arJsonNesting[key]);
        } else {
          this.arJson.push( {
            name: key,
            value: arJsonNesting[key]
          })
        }
      }
    },
    handleSelect: function(row, column, cell, event) {
      this.refining(row);
      console.log(this.arJson);
      var ooo =this.arJson
      if (column.label == "操作") {
        this.formWindow.col.forEach(function(item) {
          item.value = "";
          ooo.forEach(function(item1){
             if (item.name == item1.name)
                item.value = item1.value
          })
        });
        // this.arJson =[];
        this.formTitle = "详情/更新";
        this.formType = "update";
        this.dialogFormVisible = true;
      } else if (column.type == "selection") {
        row.$info = !row.$selected;
      } else {
        row.$selected = !row.$selected;
        row.$info = row.$selected;
      }
              this.arJson =[];
    },
    selectionchange: function(val) {
      var arr = [];
      val.forEach(function(item) {
        for (var key in item) {
          arr.push(item[key]);
          break;
        }
      });
      this.selectItems = arr;
      this.activeNum = this.selectItems.length;
    },
    handleRemove: function() {
      var tableData = this.tableData;
      var delArray = [];
      var delObj;
      this.selectItems.forEach(function(id) {
        tableData.forEach(function(data) {
          var iid;
          for (var key in data) {
            iid = data[key];
            break;
          }
          if (id == iid) {
            var temp = {
              id: id
            };
            delArray.push(temp);
          }
        });
      });
      delObj = {
        res: delArray
      };
      var self = this;
      axios
        .post(this.server + "/Del", delObj) //删除
        .then(function(response) {
          console.log(response);
          self.$message({
            message: "删除成功",
            type: "success"
          });
          self.selectItems = [];
          self.init();
        })
        .catch(function(err) {
          self.$message.error("删除失败");
          console.log(err);
        });
    },
    handleQuery: function() {
      var self = this;
      self.loading = true;
      axios
        .get(
          this.server +
            "/" +
            this.input +
            "?nowPage=" +
            this.nowPage +
            "&pageSize=" +
            this.pageSize
        ) //模糊查询
        .then(function(response) {
          var tem = response.data;
          self.totalData = tem["total"];
          self.tableData = tem["list"];
          console.log(response.list);
          self.loading = false;
        })
        .catch(function(err) {
          console.log(err);
          self.$message.error("数据获取失败");
          self.loading = false;
        });
    },
    doSomethingElse: function(arr, value) {
      // this.form[arr] = value;
      console.log("现在写入的是",value)
      this.updateAnd(arr, this.form, value);
      // this.form[arr] = value;
    },
    updateAnd: function (text, obj, value, init) {
      var self = this
      // if(text in qt)
        if(text in obj) {
            obj[text] = value;
            if(init == null) {
              this.form[text] = value;
              console.log("非初始化")
            }

            return
        }
        for( var x in obj) {
            if(typeof obj[x] == "object") {
                self.updateAnd(text, obj[x], value, init)
            }
        }
        console.log(obj,"hahaha")
    }
  }
};
</script>
<style>

</style>
