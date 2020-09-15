<!-- 角色列表 -->
<template>
    <div class=''>
        <el-button type="primary" @click="dialogFormVisible=true">新增权限</el-button>
        <el-table
            :data="list"
            border
            style="width: 100%">
            <el-table-column
           
            label="创建时间"
            prop="created_at"
            >
            </el-table-column>
            <el-table-column
            prop="remark"
            label="名称"
            >
         <template slot-scope="scope">
             <!-- 树状表格 -->
           <div @click="treeClick(scope.row,scope.$index)" style="cursor: pointer;">
                        <template v-if="scope.row.children && scope.row.children.length > 0">
                            <i class="el-icon-arrow-down" :style="'margin-left:'+(scope.row.level-1)*2+'px;'" v-if="scope.row.open"></i>
                            <i class="el-icon-arrow-right" :style="'margin-left:'+(scope.row.level-1)*2+'px;'" v-else></i>
                            <span >{{ scope.row.remark }}</span>
                        </template>
                        <span v-else :style="'margin-left:'+(scope.row.level-1)*2+'em;'">{{ scope.row.remark }}</span>
                    </div>
          

         </template>
            </el-table-column>
            <el-table-column
            label="父级"
            >
          <template slot-scope="scope">{{ParentId(scope.row.parent_id)}}</template> 
            </el-table-column>
            <el-table-column
            label="操作"
            >
                 <template slot-scope="scope">
          <!-- 编辑信息 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="edit(scope.row.id)"
            circle
          ></el-button>
          <!-- 删除信息 -->
          <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)" circle></el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 权限新增 -->
        <el-dialog title="权限新增" :visible.sync="dialogFormVisible" width='35%'>
            <el-form :model="form">
                <el-form-item label="权限名称" >
                    <el-input v-model="form.remark" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级">
                    <el-select v-model="form.parent_id" placeholder="请选择父级">
                        <el-option :label="item.remark" :value="item.id" v-for="(item,index) in list " :key ='index'></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="Add">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑权限信息 -->
 <el-dialog title="修改权限" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
     
        <el-form :model="form">
              <el-form-item label="创建时间" >
                    <el-input v-model="editUser.updated_at" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限名称" >
                    <el-input v-model="editUser.remark" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级">
                    <el-select v-model="editUser.parent_id" placeholder="请选择父级">
                   <el-option :label="item.remark" :value="item.id" v-for="(item,index) in list " :key ='index'></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
  
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消修改</el-button>
        <el-button type="primary" @click="confirm">确定修改</el-button>
      </span>
    </el-dialog> 
    <!-- 编辑权限信息结束 -->
    </div>
</template>

<script>
import { Level } from 'chalk';
import { AddPermission , PermissionList,editPermission,delPermissionList,upDatePermission} from '../../../api/stting/permission.js'
import { MessageBox } from "element-ui";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            dialogFormVisible: false, //权限弹框
         
            form:{
                remark: '',
                parent_id:  ''
            },
               dialogVisible: false, //编辑弹框
                   editUser: {
                           updated_at: "",
                           remark: "",
                           parent_id: "",
                           
       
                 },
                 userIndex: 0,
            list:[],
             
               //
        };
    },
    //监听属性 类似于data概念
    computed: {
         ParentId() {
            return (id) =>{
                const list = this.list
                for (var i=0;i<list.length;i++) {
                    if ( id == list[i].id) {
                        return list[i].remark
                    }
                }
            }
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
  
       //向下切换是否展开
       treeClick:function(item,index){
           if(item.open){
               this.collapse(item,index);
           }else{
               this.expand(item,index);
           }
       },
       //展开
       expand(item,index){
          if(!item.children){
                  return index
             }
             //展开
             for(var i =0;item.children && i<item.children.length;i++){
                 var child =item.children[i];
                 this.list.splice(++index,0,child);
                 if(child.children && child.children.length>0 &&child.open){
                     index=this.expand(child,index);
                 }
             }
             item.open =true;
             return index; 
       },
       //
       collapse(item,index){
           if(!item.children){
               return index;
           }
           //收缩列表
           item.open =false;
           var len =0;
           for(var i =index+1;i<this.list.length-1;i++){
               var xcode =this.list[i].xcode;
               if(xcode.startsWith(item.xcode+"-")){
                   len++;
               }else{
                   break;
               }
           }
           this.list.splice(index+1,len);
       },
       //权限列表中添加一个参数
       treeTableXcode(data,xcode,level){
           xcode =xcode||"";
           level=level||0;
           for(var i=0;i<data.length;i++){
               var item=data[i];
               item.xcode =xcode +1;
               item.level=level+1
               if(item.children&&item.children.length>0){
                   this.treeTableXcode(item.children,item.xcode+"-",item.level);
               }
           }
       },
       //新增权限
             Add () {
            AddPermission({
                remark: this.form.remark,
                parent_id: this.form.parent_id
            })
            .then ( res => {
                this.dialogFormVisible = false

            })
        } ,
       //删除权限
          del(id) {
              //删除掉本地储存的id
        localStorage.setItem('deleteId',id)
        //调用删除接口
     delPermissionList().then(() => {
         //this.tableData.splice(idx, 1);
         this.$message({
            type: "success",
            message: "删除成功!",
          });
     
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });;

    },
    //x关闭弹窗
        handleClose() {
      this.dialogVisible = false;
    },
    //权限编辑
    edit(item, id) {
        editPermission(parent_Id).then(()=>{

            console.log(res.data,"权限数据请求成功")

        }).catch(()=>{
            console.log(error,"权限数据请求失败");
        })
    //   this.listIndex = id;
    //   this.editUser = {
    //      updated_at: item.updated_at,
    //          remark:item.remark,
    //          parent_id: item.parent_id,
    //   };
      this.dialogVisible = true;

    },
    //权限提交
    confirm(parent_Id) {

        upDatePermission(parent_Id).then(()=>{

            console.log(res.data,"权限数据修改成功")

        }).catch(()=>{
            console.log(error,"权限数据修改失败");
        })



      this.dialogVisible = false;




     //  由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。深入响应式原理
    //   this.$set(this.list, this.userIndex, this.editUser);
    //   console.log(this.list, this.userIndex, this.editUser);
    },
    //修改操作完
  
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        PermissionList ()
        .then ( res => {
            this.list = res.data
       //
     this.treeTableXcode(this.list)

        })
    },
}
</script>

<style lang='scss' scoped>
.el-form-item{
    display: flex;
}
</style>