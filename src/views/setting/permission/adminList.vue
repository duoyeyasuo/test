<!-- 管理员列表 -->
<template>
    <div class=''>
        <el-button type="primary" @click="dialogFormVisible=true">新增管理员</el-button>
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
            prop="name"
            label="名称"
            >
            </el-table-column>
            <el-table-column
            prop="role_remark"
            label="权限名称"
            >
            </el-table-column>
            <el-table-column
            label="操作"
            >
            </el-table-column>
        </el-table>
        <el-dialog title="权限新增" :visible.sync="dialogFormVisible" width='30%'>
            <el-form :model="form">
                <el-form-item label="管理员" >
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称" >
                    <el-input v-model="form.nickname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" >
                    <el-input v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="form.role" placeholder="请选择角色">
                        <el-option :label="item.remark" :value="item.id" v-for="(item,index) in role" :key='index'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="请选择状态">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="暂停" value="2"></el-option>
                    </el-select>
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
import { adminList ,adminAdd } from '@/api/stting/admin'
import { roleList } from '@/api/stting/role'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
    //这里存放数据
    return {
        form:{},
        dialogFormVisible:false,
        list:[],
        role:[]
    };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        Add () {
            adminAdd(this.form)
            .then ( res => {
            console.log("Add -> res", res)
                
            })
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        adminList()
        .then ( res => {
            this.list = res.data
        })
        roleList()
        .then ( res => {
            this.role = res.data
            
        })
    },
}
</script>
<style lang='scss' scoped>
.el-form-item{
    display: flex;
}
</style>