<template>
    <div class="tag">
        <div>
            <el-tag
            :key="tag"
            v-for="tag in Tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
            </el-tag>
        </div>
        <div class="cleartag">
            <Dropdown>
                <Button type="primary">
                    选择标签
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>关闭所有</DropdownItem>
                    <DropdownItem>关闭其他</DropdownItem> 
                </DropdownMenu>
            </Dropdown>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            Tags:["nice","pace","prettry","grateful"]
        }
    },
    methods:{
        handleClose(tag){
            this.Tags.splice(this.Tags.indexOf(tag),1)
        }
    }
}
</script>
<style lang="scss" scoped>
    .tag{
        position: relative;
        .cleartag{
            position: absolute;
            right: 0;
        }
    }
</style>

