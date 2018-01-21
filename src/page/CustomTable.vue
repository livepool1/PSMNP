<template>
<div class="ctable">

<el-card class="box-card">
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
    <el-col :span="12" >
       <el-form :inline="true"  class="demo-form-inline" style=" margin-top: 20px;">
           <el-form-item >
             <el-input v-model="input" placeholder="请输入内容"></el-input>
          </el-form-item >
           <el-form-item >
          <el-button :plain="true" @click.native="handleQuery" type="info" >查询</el-button>
           </el-form-item >
       </el-form>
    </el-col>
  </el-row>

<!-- 模态 ADD -->
<el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <!-- <el-form-item label="活动名称" label-width="120px">
      <el-input v-model="form.id" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" label-width="120px">
      <el-select v-model="form.title" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item> -->
   
    <!-- 动态生成 -->

    <!-- <el-form-item v-for="item in formWindow" :key="item.value" :label="item.label" label-width="120px">
      <el-input v-model="item.value" auto-complete="off"></el-input>
    </el-form-item> -->
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleFormOK">确 定</el-button>
  </div>
</el-dialog>

  <el-table :data="filteredTableData"  style="width: 100%" @cell-click="handleSelect" @selection-change="selectionchange">
    <el-table-column type="selection" width="50"></el-table-column>

    <template v-for="item in headerData">
        <el-table-column  :key="item.dataIndex" :label="item.dataIndex" :prop="item.name" ></el-table-column>
    </template>

    <el-table-column  fixed="right" label="操作" align="center" property="id">
    <template slot-scope="scope">
      <el-button type="text" size="mini" >详情/更改</el-button>
    </template>
    </el-table-column>
  </el-table>

  <el-row type="flex" justify="end" style="padding:20px 0; ">
    <el-pagination
      :current-page="5"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-row>
</el-card>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ctable",
  props: ['headerData','tableData','server','tableName','aform','formWindow'],
  data: function() {
    return {
      input: "",
      activeNum: 0,
      currentType: "全部",
      selectItems: [],
      types: ["全部", "测试活动", "免费活动", "收费活动"],
      dialogFormVisible: false,
      formType: "add",
      formTitle: "添加",
      form:{},
      empty:{}
    //  formWindow:{}
    };
  },
  created: function() {
    this.init();
  },
  computed: {
    filteredTableData: function() {
      var type = this.currentType;
      return this.tableData.filter(function(data) {
        if (type == "全部" || type == "") {
          return true;
        } else {
          return data.type == type;
        }
      });
    }
  },
  methods: {
    init: function() {
      axios
        .get( this.server + "?from=0&to=100")//查询所有
        .then(function(response) {
            this.tableData=response;
            console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
        this.empty=this.aform;
        this.form =this.aform;
        //this.form = this.allCol;
    },
    handleFormOK:function(){
      if(this.formType=='add')
        this.handleAdd();
      else if(this.formType=='update')
        this.handleUpdate();
    },
    handleUpdate: function(){
        axios
        .put( this.server + form.id,form)  //更新
        .then(function(response) {
            this.tableData=response;
            console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
        this.dialogFormVisible = false;
    },
    handleAdd:function(){
      axios
      .post( this.server + "/Add",form)  //添加
      .then(function(response) {
          this.tableData=response;
          console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
      this.dialogFormVisible = false;
    },
    clickAdd: function(){
      this.form = this.empty;
      this.formTitle = "新增";
      this.formType='add';
      this.dialogFormVisible = true;
    },
    handleSelect: function(row, column, cell, event) {
      if (column.label == "操作") {
        //this.$router.push("/activeManage/detail/page1");
        this.form=row;
        this.formTitle = "详情/更新";
        this.formType='update';
        this.dialogFormVisible = true;
      } else if (column.type == "selection") {
        row.$info = !row.$selected;
      } else {
        row.$selected = !row.$selected;
        row.$info = row.$selected;
      }
    },
    selectionchange: function(val) {
      var arr = [];
      val.forEach(function(item) {
        arr.push(item.id);
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
          if (id == data.id) {
            var temp={
              id:id
              };
            delArray.push(temp);
          }
        });
      });
      delObj = {
        Res:delArray
      };
      console.log("okok");
      console.log(delObj);
      axios
      .post(this.server + "/Del",delObj)         //删除   
      .then(function(response) {
        console.log(response);
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.selectItems = [];
        this.init();
      })
      .catch(function(err) {
        this.$message.error('删除失败');
        console.log(err);
      });

    },
    handleQuery: function(){
        axios
        .get(this.server + "/" + this.input + "?from=0&to=100")//查询 id
        .then(function(response) {
            this.tableData=response;
            console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
<style>

</style>
