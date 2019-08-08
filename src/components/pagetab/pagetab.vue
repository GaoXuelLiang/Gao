<template>
    <div class="tag">
        <div class="tagname">
            <Tag
            type="dot"
            :color="checkname==tag.name?'primary':''"
            :key="index"
            v-for="(tag,index) in pageOpenTagList"
            closable
            :name="tag.name"
            @click.native="handleChange(tag)"
            :disable-transitions="false"
            @on-close="handleClose(tag)">
            {{tag.title}}
            </Tag>
        </div>
        <div class="cleartag">
            <Dropdown trigger="hover" transfer @on-click="handleTagsOption">
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
import Bus from '../../lib/bus'
export default {
    data(){
        return{
            //pageOpenTagList:[],
            tagname:'选择标签',
            list:[{name:'关闭所有'},{name:"关闭其他"}],
            checkname:'home'
        }
    },
    mounted(){
        // 通过Bus兄弟组件接收menu传过来tag名称
        Bus.$on('checkname',(e)=>{
            this.checkname=e
        })
    },
    methods:{
        //关闭标签
        handleClose(tag){
            //如果不是home标签直接切割移除数组中tag当前标签
            if(tag.name!='home'){
                this.pageOpenTagList.splice(this.pageOpenTagList.indexOf(tag),1)
                // 如果当前选中的tag标签和点击关闭的标签一样，那么checkname状态值给前一位（实现就是直接获取vuex中的最后一个tagname）
                if(tag.name==this.checkname){
                    this.checkname=this.pageOpenTagList[this.pageOpenTagList.length-1].name
                }
            }
        },
        // 获取到当前点击的tag.name保存到checkname为当前然后在 循环的tag标签中做判断是否等于checkname，等于说明为触发的标签
        handleChange(tag){
            this.checkname=tag.name 
        },
        handleTagsOption(name){
            if(name=="关闭所有"){
                this.$store.commit("clearAllTags")
                this.checkname='home'
            }else{
                this.$store.commit("clearOtherTags")
                this.checkname=this.pageOpenTagList[this.pageOpenTagList.length-1].name
            }
        }
        // changetagname(name){
        //     this.tagname=name
        // }
    },
    //获取$store的pageOpenTagList
    computed:{
        pageOpenTagList(){
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

