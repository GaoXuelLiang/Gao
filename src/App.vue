<template>
    <div id="app"
         class="app-main"
         ref="Main">
        <router-view v-if="isRouterAlive" />
    </div>
</template>

<script>
//本页为消除空白引入
export default {
    name: 'app',
    provide () {
        return {
            reload: this.reload,
        }
    },
    data () {
        return {
            isRouterAlive: true,
        }
    },
    mounted () {
        if (window.location.hash.replace("#/", "") === 'employeeHomeNew' || window.location.hash.replace("#/", "") === 'employeeHome') {
            this.$refs.Main.style.overflow = 'auto'
        }
        this.$Message.config({
            top: 120,
            duration: 2
        });
    },
    methods: {
        reload () {
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        },
    },
}
</script>

<style lang="scss">
/* @import "sass/base.scss"; */
html,
body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main {
    width: 100%;
    height: 100%;
    background-color:  #0d0a0a;
    /*overflow-y: auto;*/
}
//我的信息
 .el-menu{
    border-right: solid 0px #0a0a0a;
}
.ivu-table-wrapper{
    border:solid 0px #fff;
    border-radius: 7px
}
</style>
