<template>
    <div class="myinformation" @click='back()'>
         <Table border :columns="columns" :data="data"></Table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            columns: [
                    {
                        title: 'Mine',
                        key: 'name'
                    },
                    {
                        title: 'Particulars',
                        key: 'address'
                    }
                ],
                data: [
                    {
                        name: 'John Brown',
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
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
        width: 70%;
        height: 700px;
        top: 25%;
        left: 20%;
    }
</style>
