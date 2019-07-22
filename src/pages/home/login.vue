<template>
    <div>
        {{a}}
    </div>
</template>
<script>
import Bus from '../bus'
export default {
    data(){
        return {
            a:'xxxxxxxxxxxxxx'
        }
    },
    mounted(){
        Bus.$on('msg',(e)=>{
            this.a=e
            console.log(`${e}`)
        })
    }
}
</script>
<style>

</style>
