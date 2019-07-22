<template>
    <div>
        <button @click="bus">按钮</button>
    </div>
</template>
<script>
import Bus from '../bus'
export default {
    data(){
        return {
            message:""
        }
    },
    methods:{
        bus () {
          Bus.$emit('msg', '我要传给兄弟组件们，你收到没有')
       }
    },
}
</script>
<style>

</style>
