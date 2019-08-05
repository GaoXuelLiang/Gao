<template>
    <div class="myinformation">
        <Table border :columns="columns" :data="data" :loading="loading">
           
        </Table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:true,
            columns: [
                    {
                        title: 'Mine',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    },
                                     on: {
                                        click: () => {
                                            this.back()
                                        }
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Particulars',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '移除')
                            ]);
                        }
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
    created(){
        this.ready()
    },
    methods:{
        ready(){
            setInterval(() => {
                this.loading=false
            }, 4000)
        },
        back(){
            this.$emit('close')
        },
        show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data[index].name}<br>Address：${this.data[index].address}`
                })
            },
        remove (index) {
                this.data.splice(index, 1);
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
