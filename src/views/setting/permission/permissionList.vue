<!-- 角色列表 -->
<template>
    <div class=''>
        <el-button type="primary" @click="dialogFormVisible=true">新增权限</el-button>
        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column
            prop="remark"
            label="名称"
            >
                <template slot-scope="scope">
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
            label="创建时间"
            prop="created_at"
            >
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
        <!-- 权限新增弹窗 -->
        <el-dialog title="权限新增" :visible.sync="dialogFormVisible" width='30%'>
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
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { AddPermission , PermissionList} from '../../../api/setting/permission.js'
export default {
    components: {},
    data() {
        //这里存放数据
        return {
            dialogFormVisible: false, //权限弹框
            form:{
                remark: '',
                parent_id:  ''
            },
            list:[]
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
        submit () {
            AddPermission(this.form)
            .then ( res => {
                //点击提交清空输入框，并且关闭弹窗
                this.dialogFormVisible = false;
                this.form.remark="";
            })
        },
        // 切换下级是否展开
	    treeClick:function(item,index){
	    	if(item.open){
	    		this.collapse(item,index);
	    	}else{
	    		this.expand(item,index);
	    	}
        },
        // 展开
		expand(item,index) {
			if(!item.children){
				return index;
			}
			//展开
			for(var i=0;item.children && i<item.children.length;i++){
				var child = item.children[i];
				this.list.splice(++index,0,child);
				if(child.children && child.children.length > 0 && child.open){
					index = this.expand(child,index);
				}
			}
			item.open = true;
			return index;
        },
        //
		collapse(item,index) {
			if(!item.children){
				return index;
			}
			//收缩
			item.open = false;
			var len = 0;
			for(var i=index+1;i<this.list.length-1;i++){
				var xcode = this.list[i].xcode;
				if(xcode.startsWith(item.xcode+"-")){
					len ++;
				}else{
					break;
				}
			}
			this.list.splice(index+1,len);
        },
        // 权限列表中添加一个参数
        treeTableXcode (data,xcode,level) {
            xcode = xcode || "";
            level = level || 0 ;
            for(var i=0;i<data.length;i++){
                    var item = data[i];
                    item.xcode = xcode + i;
                    item.level = level + 1
                    if(item.children && item.children.length > 0){
                        this.treeTableXcode(item.children,item.xcode+"-",item.level);
                }
            }
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        PermissionList ()
        .then ( res => {
            this.list = res.data
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