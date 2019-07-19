<template>
    <div id="app"
         class="app-main"
         ref="Main">
        <router-view v-if="isRouterAlive" />
    </div>
</template>

<script>
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

<style>
@import "sass/base.scss";
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
    background-color: white;
    /*overflow-y: auto;*/
}
</style>
