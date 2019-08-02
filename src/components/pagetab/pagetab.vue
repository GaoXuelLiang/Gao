<template>
    <div class="tag">
        <div class="tagname">
            <el-tag
            :key="tag.title"
            v-for="tag in pageOpenTagList"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.title}}
            </el-tag>
        </div>
        <div class="cleartag">
            <Dropdown trigger="hover" transfer>
                <Button type="primary">
                    {{tagname}}
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="(item,index) in list" :key="index" :name='item.name'>{{item.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            //pageOpenTagList:[],
            tagname:'选择标签',
            list:[{name:'关闭所有'},{name:"关闭其他"}]
        }
    },
    methods:{
        handleClose(tag){
            this.pageOpenTagList.splice(this.pageOpenTagList.indexOf(tag),1)
        },
        // changetagname(name){
        //     this.tagname=name
        // }
    },
    //获取$store的pageOpenTagList
    computed:{
        pageOpenTagList:function(){
            return this.$store.state.app.pageOpenTagList
        }
    }
}
</script>
<style lang="scss" scoped>
    .tag{
        position: relative;
        .tagname{
            margin-left:10px; 
        }
        .cleartag{
            position: absolute;
            right: 20px;
        }
    }
</style>

