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
                    <Dropdown>
                        <a href="javascript:void(0)" style="color:white">
                            下拉菜单
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>驴打滚</DropdownItem>
                            <DropdownItem>炸酱面</DropdownItem>
                            <DropdownItem>豆汁儿</DropdownItem>
                            <DropdownItem>冰糖葫芦</DropdownItem>
                            <DropdownItem>北京烤鸭</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
        <div class="section">
            <hrmenu ref="menu" class="left">
            
            </hrmenu>
            <div class="right">
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
               
            }
        },
        components:{
            hrmenu,
            pagetab
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
            background-color: #495060
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
            left: 200px;
            .pagetab{
                height: 40px;
                display: flex
            }
        }
    }
</style>

