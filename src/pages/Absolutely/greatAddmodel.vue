<template>
    <div class="cover">
        <div class="box">
            <Spin size="large" fix v-if="spinShow"></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="mouse"
                          size="16"
                          style="margin-right: 10px;"></Icon>new图纸资料
                </div>
                <Button type="text"
                        @click="handleReset">
                    <!-- <Icon type="close-round"
                          size="16"></Icon> -->
                </Button>
            </div>
            <Form class="form"
                  ref="upFormData"
                  :model="upFormData"
                  :rules="ruleValidate"
                  :label-width="135">
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="客户名称"
                              prop="cusName">
                        <span @dblclick="clearCus">
                            <Input v-model="upFormData.cusName"
                                   icon="search"
                                   :readonly="true"
                                   placeholder="请选择客户"
                                   @on-click="searchCusData" />
                        </span>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="配电室"
                              prop="cabBaseid">
                        <Select v-model="upFormData.cabBaseid"
                                placeholder="请选择配电室">
                            <Option v-for="item in switchList"
                                    :value="item.id"
                                    :key="item.id">{{ item.wcrName }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="资料名称"
                              prop="picName">
                        <Input v-model="upFormData.picName"
                               placeholder="请输入资料名称"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <!-- <Col span="21"
                         offset="1">
                    <FormItem label="资料附件"
                              prop="fileKeys">
                        <uploadAnnex @uploadLogo="uploadLogo"
                                     @fileKey='fileKey'
                                     ref="uploadAnnex"></uploadAnnex>
                    </FormItem>
                    </Col> -->
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem label="备注"
                              prop="memo">
                        <Input v-model="upFormData.memo"
                               type="textarea"
                               placeholder="备注"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <Row type="flex"
                         justify="end">
                        <FormItem>
                            <Button type="primary"
                                    @click="handleSubmit">保存</Button>
                            <Button type="ghost"
                                    @click="handleReset">取消</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </div>
        <!-- <transition name="fade">
            <searchCustom v-show="openCustom"
                          @closeCustom="closeCustom"
                          @changeinputCustom="changeinputCustom"
                          ref="searchCustom"></searchCustom>
        </transition> -->
    </div>
</template>
<script>

export default {
    data () {
        return {
            spinShow:false,
            switchList: [],
            switchId: '',
            openCustom: false,
            upFormData: {
                id: '',
                cusId: '',
                cusName: '',
                picName: '',
                fileKeys: '',
                cabBaseid: '',
                fileStatus: '',
                memo: ''
            },
            ruleValidate: {
                cusName: [
                    { required: true, message: "客户名称不能为空", trigger: 'change' },
                ],
                cabBaseid: [
                    { required: true, message: "配电室不能为空", trigger: 'change' },
                ]
            },
        }
    },
    mounted () {
    },
    props: {
        logType: String,
        curStatus: String,
    },
    components: {
        // searchCustom,
        // uploadAnnex
    },
    methods: {
        initRoom (cusId) {
            const t = this
            let data = {
                _mt: 'Skswitcroom.selectBySwitcroomPageList',
                rows: 0,
                page: 1,
                sort: 'id',
                order: 'asc',
                cusId: cusId
            }
            for (const dat in data) {
                if (data[dat] === '' || data[dat] === undefined) {
                    delete data[dat]
                }
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.switchList = res.data.content[0]['rows']
                }
            })
        },
        getData (id) {
            this.spinShow = true
            HROgetUpTableDataById(this, 'Skpicture.selectByIds', id, this.callbackById)
        },
        callbackById (data) {
            let t = this;
            t.upFormData.id = data.id;
            t.upFormData.cusId = data.cusId;
            t.upFormData.cusName = data.cusName;
            t.upFormData.picName = data.picName;
            t.upFormData.fileKeys = data.fileKeys;
            t.upFormData.fileStatus = data.fileStatus;
            t.upFormData.cabBaseid = data.cabBaseid;
            t.upFormData.memo = data.memo;
            if (data.fileKeys) {
                t.loadFile(data.fileKeys)
            }
            t.spinShow = false
        },
        loadFile (data) {
            let t = this,
                arr = JSON.parse(data),
                brr = [];
            for (let i = 0; i < arr.length; i++) {
                let obj = {
                    name: ''
                }
                obj.name = arr[i].fileName
                brr.push(obj)
            }
            // t.$refs.uploadAnnex.fileArray = brr
            // t.$refs.uploadAnnex.obS = JSON.parse(data)
        },
        uploadLogo (fileName, fileKey) {
            this.upFormData.fileKeys = fileName + ',' + fileKey
        },
        fileKey (fileKey) {
            this.upFormData.fileKeys = fileKey
        },
        searchCusData () {
            // this.$refs.searchCustom.getData()
            this.openCustom = true
        },
        clearCus () {
            this.upFormData.cusId = '';
            this.upFormData.cusName = '';
        },
        closeCustom () {
            this.openCustom = false
        },
        changeinputCustom (id, name) {
            this.upFormData.cusId = id;
            this.upFormData.cusName = name;
            this.initRoom(id)
        },
        handleReset () {
            this.openCustom = false;
            // this.$refs.uploadAnnex.fileArray = [];
            // this.$refs.uploadAnnex.obS = [];
            this.$emit('closeAddOrUp')
            this.$refs.upFormData.resetFields()
        },
        handleSubmit () {
            let t = this;
            console.log(t.upFormData, "t.upFormData")
            t.upFormData.fileStatus = t.curStatus
            t.$refs.upFormData.validate((valid) => {
                if (valid) {
                    if ('新增' == t.logType) {
                        submitTableData(t, 'Skpicture.insert', t.addOrUpCallBack)
                    } else {
                        submitTableData(t, 'Skpicture.updateById', t.addOrUpCallBack)
                    }
                }
            })
        },
        addOrUpCallBack (data) {
            let t = this;
            t.handleReset();
            if('新增' == t.logType){
                t.$emit('getAddOrUpData', data);
            }else{
                t.$emit('updataTable', data)
            }       
        }
    },
}
</script>
<style lang="scss" scoped>
// @import "../../sass/updateAndAdd.scss";
</style>
