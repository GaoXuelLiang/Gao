<template>
    <div class="myinformation" @click="back()">
        返回
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        back(){
            this.$emit('close')
        }
    }
}
</script>
<style lang="scss" scoped>
    .myinformation{
        position: absolute;
        top:50px;

    }
</style>
