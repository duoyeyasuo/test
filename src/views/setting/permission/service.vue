<template>
  <div class="wraper">
 
    <p class="titleserve">客服管理</p>
    <template>
  <el-table
    :data="serveData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
     <el-table-column
    label="ID"
      type="index"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="用户头像">
    </el-table-column>
       <el-table-column
      prop="Profile"
      label="客服名称">
    </el-table-column>
         <el-table-column
      label="是否显示">
          <el-switch
           v-model="value3"
           active-text="开"
           inactive-text="关">
      </el-switch>
    </el-table-column>
         <el-table-column
      prop="date"
      label="添加时间">
    </el-table-column>
         <el-table-column
      prop="date"
      label="操作" width="280">
       <template slot-scope="scope" >
         <!-- 聊天记录 -->
       
            <el-button
            type="primary"
           @click="look(scope.row,scope.$index)"
          >查看聊天</el-button>

          <!-- 编辑信息 --   -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="edit(scope.row.id)"
            
          ></el-button>
          <!-- 删除信息 -->
          <el-button type="danger" icon="el-icon-delete" @click="del(scope.$index)" circle></el-button>
            </template>

    </el-table-column>

      </el-table>
    </template>
     <!-- 聊天弹窗信息 -->
 <el-dialog title="聊天记录" :visible.sync="dialogVisible" width="40%" >
   <el-table
    :data="serveData"
    style="width: 100%">
    <el-table-column
    label="ID"
      type="index"
      >
    </el-table-column>
    <el-table-column
      prop="date"
      label="用户名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="客服头像"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作">
<el-button type="danger" icon="el-icon-delete" ></el-button>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :total="100">
</el-pagination>
    </el-dialog>
    <!-- 编辑弹窗 -->
       <!-- <el-dialog title="编辑客服信息" :visible.sync="dialogVisible" width="30%" >
      <div>
        <el-form ref="form" :model="editUser" label-width="40px">
          <el-form-item label="微信用户名称">
            <el-input v-model="editUser.name"></el-input>
          </el-form-item>
          <el-form-item label="客服头像">
            <el-input v-model="editUser.address"></el-input>
          </el-form-item>
          <el-form-item label="客服名称">
            <el-input v-model="editUser.name"></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker
              v-model="editUser.date"
              type="date"
              placeholder="请选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>  -->
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
  export default {
  
    data() {
      return {
        value3: true,
        dialogVisible: false,
              dialogVisible: false, //编辑弹框显示默认不显示
      editUser: {
        name: "",
        address: "",
      
        date: "",
      },
        serveData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
           Profile:'小诸葛'
          
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          Profile:'小诸葛'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          Profile:'小诸葛'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          Profile:'小诸葛'
        }]
      }
      
    },
      methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      //聊天记录弹窗
          look(item, idx) {
      this.userIndex = idx;
      // this.editUser = {
      //   name: item.name,
      //   tel: item.tel,
      //   tips: item.tips,
      //   time: item.time,
      // };
      this.dialogVisible = true;
    },
    //删除客服
        del(idx) {
      MessageBox.confirm("此操作将永久删除该表单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.serveData.splice(idx, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
//编辑客服信息
    // edit(item, idx) {
    //   this.userIndex = idx;
    //   this.editUser = {
    //     name: item.name,
    //     address: item.address,
        
    //     date: item.date,
    //   };
    //   this.dialogVisible = true;
    // },
    // confirm() {
    //   this.dialogVisible = false;
    //   //this.tableData[this.userIndex] = this.editUser   由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。深入响应式原理
    //   Vue.set(this.tableData, this.userIndex, this.editUser);
    // },
    },
  }
</script>

<style lang="scss" scoped>

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .wraper{
    padding: 30px;
  }
  .wraper .titleserve{
    line-height: 40px;
    border: 1px solid  #efefef;
    padding: 15px;
    box-sizing: border-box;
    font-size: 20px;
    color: #17233D;

  }
  el-pagination{
    height: 200px;
    width: 200px;
    background-color: red;
  }
  .chatting-records{
margin-left: 5px;
  }

</style>
