<template>
    <div class="main">
        <div class="header">
            <div class="logo">
                <img src="../../static/homeimg/logo.jpg" alt="" width="80">
            </div>
            <div class="authority">
                AIRLINE-AWESOME
            </div>
            <div class="person-authority">
                <div class="">
                    <Dropdown transfer trigger="hover" @on-click="changeselectedname">
                        <a href="javascript:void(0)" style="color:white">
                            {{selectedname}}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for='(item,index) in list' :key='index' :name='item.name'>{{item.name}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
        <div class="section">
            <hrmenu ref="menu" class="left" @toggleClick="toggleClick">
            
            </hrmenu>
            <div class="right" :style="{left:shrink?'64px':'200px'}">
                <pagetab class="pagetab">

                </pagetab>
                <div>
                    <router-view>

                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import hrmenu from "../components/menu/menu"
    import pagetab from "../components/pagetab/pagetab"
    export default {
        data () {
            return {
               shrink:false,
               selectedname:'全部',
               list:[{name:'全部'},{name:'纳杰'},{name:'HRO'},{name:'SSC'},{name:'金柚'},{name:'西门子'}]
            }
        },
        components:{
            hrmenu,
            pagetab
        },
        methods:{
            //接收子组件传过来的shrink
            toggleClick(t){
                this.shrink=t
            },
            changeselectedname(name){           
                this.selectedname=name 
            }
        }
    }
</script>
<style lang="scss" scoped>
.main{
    height: 100%;
}
.header{
    width: 100%;
    height: 50px;
    background-color: #339fe2;
    position: relative;
    .logo{
        width: 150px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
    }
    .logo:hover {
        cursor: pointer;
        transition: all 0.5s;
        background-color: rgba(187, 182, 182, 0.1);
    }
    .authority{
        padding-left: 150px;
        height: 50px;
        line-height: 50px;
        font-weight: 700;
    }
    .person-authority{
        position: absolute;
        right: 15px;
        top: 15px;
        display: flex;
        align-items: center;
        justify-content: center
    }
    
}
.section{
        display: flex;
        .left{
            width: 200px;
            background-color: #495060;
            height: 800px;
        }
        .right{
            position: absolute;
            top: 50px;
            right: 0;
            bottom: 0;
            overflow-y: auto;
            overflow-x: hidden;
            background-color: #f0f0f0;
            // z-index: 1;
            transition: left 0.3s;
            // left: 200px;
            .pagetab{
                height: 40px;
                display: flex
            }
        }
    }
</style>

