
//兄弟组件通信
//引入js文件传值定义方法然后Bus.$emit('msg','值'),接受Bus.$on('msg',(e)=>{this.msg=e})
import Vue from 'vue'
export default new Vue