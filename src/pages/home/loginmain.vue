<template>
    <div class="main">
        <!-- 头部 -->
        <div class="header">
            <div class="logo">
                <img src="../../../static/homeimg/logo.jpg" alt="" width="80" @click="backhome()">
            </div>
            <div class="authority">
                TWO UMBRELLA
            </div>         
        </div>
        <transition name="component-fade"
                    mode="out-in">
            <div class="common-lrf">
                <router-view />
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        components:{
            
        },
        mounted(){
        
        },
        computed:{
            
        },
        methods:{
            //返回主页
            backhome(){
                this.close()
            },
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
        font-family: "Yuanti SC";
    } 
}
.section{
        display: flex;
        .left{
            width: 200px;
            background-color: #495060;
            height: 1000px;
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
                height: 42px;
                display: flex;
                padding-top: 5px;
                border-bottom: 1px solid #193545
            }
        }
    }
.common-lrf {
    height: calc(100% - 150px);
    background: url(../../../static/homeimg/logo.jpg) left top no-repeat;
    background-size: 100% 800px;
}
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.2s ease;
}
.component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
}
</style>

