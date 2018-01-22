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
  <el-form :rules="formRuls" :model="form">
    <!-- :model="form" -->
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
    <h1>{{formWindow.col[1].value}}</h1>
    <el-form-item v-for="item in formWindow.col" :key="item.name" :label="item.label" :prop="item.name" label-width="120px">
      prop:{{item.name}} value:{{item.value}}<el-input v-model="item.value"  @change="doSomethingElse(item.name,item.value)"></el-input>
    </el-form-item>
  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleFormOK">确 定</el-button>
  </div>
</el-dialog>

  <el-table :data="filteredTableData"  style="width: 100%" @cell-click="handleSelect" @selection-change="selectionchange">
    <el-table-column type="selection" width="50"></el-table-column>

    <template id="allData">
    <template v-for="item in headerData">
        <el-table-column  :key="item.dataIndex" :label="item.dataIndex" :prop="item.name" ></el-table-column>
    </template>
    </template>

    <el-table-column  fixed="right" label="操作" align="center" property="id">
    <template slot-scope="scope">
      <el-button type="text" size="mini" >详情/更改</el-button>
    </template>
    </el-table-column>
  </el-table>

  <el-row type="flex" justify="end" style="padding:20px 0; ">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :total="totalData">
    </el-pagination>
  </el-row>
</el-card>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ctable",
  props: ['headerData','server','tableName','aform','aformWindow','formRuls'],
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
      formWindow:{},
      tableData: [],
      pageSize : 10,
      nowPage : 1,
      totalData : 1000
    };
  },
  created: function() {
    this.init();
    console.log(this.formRuls)
    console.log(this.aform)
    console.log(this.aformWindow)
    console.log(this.form)
  },
  watch: {
    formWindow: function(curVal,oldVal) {
      console.log(curVal)
      console.log("输出输出")
      console.log(oldVal)
    }
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
        .get( this.server + "?nowPage="+this.nowPage+"&pageSize="+this.pageSizes)//查询所有
        .then(function(response) {
           // this.totalData=                          //获取总页数
            this.tableData=response;
            console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
        this.form =this.aform;
        this.formWindow =this.aformWindow;
     },
    handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.nowPage = val
      this.init()
    },
    handleFormOK:function(){
      var list = this.form;
      this.formWindow.col.forEach(function(item,index,array){  //赋值
        for(var key in list){
          if(item.name===key){
            list[key]=item.value
          }
        }
      })
      this.form = list;

      console.log(this.form)

      if(this.formType=='add')
        this.handleAdd();
      else if(this.formType=='update')
        this.handleUpdate();
    },
    handleUpdate: function(){
        axios
        .put( this.server ,this.form)  //更新
        .then(function(response) {
            this.tableData=response;
            console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
        this.form =this.aform;
        this.dialogFormVisible = false;
    },
    handleAdd:function(){
      axios
      .post( this.server + "/Add",this.form)  //添加
      .then(function(response) {
          this.tableData=response;
          console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
      this.form =this.aform;
      this.dialogFormVisible = false;
    },
    clickAdd: function(){
      // this.formWindow.col.forEach(function(item,index,array){  //清空
      //   item.value=""
      // })
      this.formTitle = "新增";
      this.formType='add';
      this.dialogFormVisible = true;
    },
    handleSelect: function(row, column, cell, event) {
      if (column.label == "操作") {
        //this.$router.push("/activeManage/detail/page1");
        //this.form=row;
        this.formWindow.col.forEach(function(item,index,array){  //赋值
          item.value=""
          for(var key in row){
            if(item.name==key)
              item.value=row[key]
          }
        })
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
        .get(this.server + "/" + this.input + "?nowPage="+this.nowPage+"&pageSize="+this.pageSizes)//模糊查询
        .then(function(response) {
            this.tableData=response.total;
            console.log(response.list);
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    doSomethingElse: function(arr,value){
      // var arr1 = arr.filter(function(item){
      //     return item.age === 2;
      // })
      // console.log(arr1[0].value);

      this.form[arr] = value
    }
  }
};
</script>
<style>

</style>
