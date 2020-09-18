<!--  -->
<template>
    <div class=''>
        <el-button type="primary" @click="dialogFormVisible=true">新增角色</el-button>
        <el-table
            :data="list"
            border
            style="width: 100%">
            <el-table-column
            type="index"
            label="编号"
            width="100"
            >
            </el-table-column>
            <el-table-column
            prop="remark"
            label="名称"
            >
            </el-table-column>
            <el-table-column
            label="权限"
            >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ role(scope.row.permissions) }}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="操作"
            >
                <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit"></el-button>
                <el-button type="danger" icon="el-icon-delete"></el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增权限角色" :visible.sync="dialogFormVisible" width='30%'>
            <el-form :model="form">
                <el-form-item label="角色名称" >
                    <el-input v-model="form.remark" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-tree
                        :data="permission"
                        :props="prop"
                        show-checkbox
                        node-key='id'
                        @check-change="handleCheckChange"
                        >
                    </el-tree>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="Add">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { roleList , roleAdd} from '@/api/setting/role'
import { PermissionList } from '@/api/setting/permission'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    dialogFormVisible: false,
    list:[], //角色列表
    permission:[], // 权限列表
    form:{
        remark:'',
        permissions:[]
    },
    prop:{
        label:'remark'
    }
};
},
//监听属性 类似于data概念
computed: {
    role () {
        return (data) => {
            
            // for (var i=0;i++;i<data.length) {
            //     console.log(data[i])
            // }
        }
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    Add () {
        roleAdd(this.form)
        .then ( res => {
            this.dialogFormVisible = false
        })
    },
    handleCheckChange (data) {
        this.form.permissions.push(data.id)
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    roleList ()
    .then ( res => {
        this.list = res.data
    })
    PermissionList ()
    .then ( res=> {
        this.permission = res.data
    })
},
}
</script>
<style lang='scss' scoped>
.el-form-item{
    display: flex;
}
</style>