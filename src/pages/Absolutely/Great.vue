<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>
                    &nbsp;&nbsp;图纸资料管理
                </p>
                <Row>
                    <Col span="20"
                         style="width:100% !important;">
                    <Row>
                        <span @dblclick="clearCus">
                            <Input v-model="cusName"
                                   icon="search"
                                   :readonly="true"
                                   placeholder="请选择客户"
                                   @on-click="searchCusData"
                                   style="width: 200px;cursor: pointer;" />
                        </span>
                        <Input v-model="searchName"
                               placeholder="请输入资料名称"
                               style="width: 200px;" />
                        <span style="margin: 0;"><Button type="primary"
                                    icon="ios-search"
                                    @click="search()"
                                    :loading="searchLoading">查询</Button></span>
                        <RadioGroup v-model="curStatus"
                                    @on-change="getSelect()"
                                    style="float:right;line-height:32px;">
                            <Radio :label="item.statusCode"
                                   v-for="(item,index) in nodeList"
                                   :key="index">{{item.nodeName}}</Radio>
                        </RadioGroup>
                        <Button 
                                v-for="(item,index) in buttonList"
                                @click="buttonClick(item.id)"
                                :key="index"
                                :type="item.type"
                                style="margin-left: 6px;">{{item.name}}</Button>
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Table :loading="loading"
                               :height="tableheight"
                               @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
                               @on-sort-change="sortable"
                               size="small"
                               border
                               ref="selection"
                               :columns="columns"
                               :data="data"></Table>
                    </row>
                    <Row style="display: flex">
                        <Page :total="total"
                              size="small"
                              show-elevator
                              show-sizer
                              show-total
                              placement="top"
                              :current="page"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"></Page>
                        <Button type="ghost"
                                size="small"
                                shape="circle"
                                icon="ios-sync"
                                style="margin-left: 20px;display: inline-block;"
                                @click="refresh"></Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <greatAddmodel v-show="openAddOrUp"
                          :logType="logType"
                          :curStatus="curStatus"
                          @closeAddOrUp="closeAddOrUp"
                          @updataTable="updataTable"
                          @getAddOrUpData="getAddOrUpData"
                          ref="addOrUpModel"></greatAddmodel>
        </transition>
        <!-- <transition name="fade">
            <searchCustom v-show="openCustom"
                          @closeCustom="closeCustom"
                          @changeinputCustom="changeinputCustom"
                          ref="searchCustom"></searchCustom>
        </transition> -->
    </div>
</template>
<script>
import greatAddmodel from "./greatAddmodel";
// import { isSuccess } from "../../lib/util";
// import searchCustom from "../../components/searchTable/searchCustom";
// import { getTableData, commonOperateData, HROcommonOperateData, getParamListGroup } from "../rest/commonRest";
// import { getDataLevelUserLogin, getDataLevelNone } from "../../axios/axios";

export default {
    data () {
        return {
            //修改下标
            indexs:'',
            searchLoading: false,
            loading: false,
            tableheight: document.body.offsetHeight-200,
            openAddOrUp: false,
            openCustom: false,
            searchName: "",
            logType: "",
            cusName: "",
            cusId: "",
            tableselected: [],
            buttonList: [{
                id: "bn_invalid",
                type:'primary',
                name: "失效",
            }, {
                id: "bn_reback",
                type:'primary',
                name: "退回",
            }],
            nodeList: [
                {
                    nodeName: "编辑中",
                    statusCode: "01draft",
                },
                {
                    nodeName: "生效",
                    statusCode: "02valid",
                },
                {
                    nodeName: "失效",
                    statusCode: "03invalid",
                },
            ],
            columns: [{
                type: "selection",
                width: 60,
                fixed: "left",
                align: "center",
            },
            {
                title: "客户名称",
                key: "cusName",
                sortable: "custom",
                render: (h, params) => {
                    return h("div", [
                        h("Tooltip", {
                            props: {
                                content: params.row.cusName,
                            },
                        }, params.row.cusName),
                    ]);
                },
            },
            {
                title: "资料名称",
                key: "picName",
                sortable: "custom",
                render: (h, params) => {
                    return h("div", [
                        h("Tooltip", {
                            props: {
                                content: params.row.picName,
                            },
                        }, params.row.picName),
                    ]);
                },
            },
            {
                title: "操作",
                key: "action",
                width: 120,
                fixed: "right",
                align: "center",
                render: (h, params) => {
                    return h("div", [
                        h("Button", {
                            props: {
                                type: "success",
                                size: "small",
                            },
                            on: {
                                click: () => {
                                    this.indexs = params.index
                                    console.log(params.row, "params.row");
                                    this.cusId = params.row.cusId
                                    this.openAddOrUpModel(params.row.id, "修改");
                                },
                            },
                        }, "修改"),
                        h("Button", {
                            props: {
                                type: "success",
                                size: "small",
                            },
                            style: {
                                "margin-left": "8px",
                            },
                            on: {
                                click: () => {
                                    this.downloadFile(params);
                                },
                            },
                        }, "下载"),
                    ]);
                },
            },
            ],
            data: [],
            total: 0,
            sort: "id",
            order: "desc",
            rows: 10,
            page: 1,
            curStatus: "02valid",
            disable: false,
        };
    },
    computed: {},
    components: {
        greatAddmodel,
        // searchCustom,
    },
    mounted () {
        // this.getData();
    },
    methods: {
        //下载文件
        downloadFile (fileObj) {
            let { fileName, filekey } = JSON.parse(fileObj.row.fileKeys)[0];
            // console.log(filekey, fileName);
            const t = this;
            let data = {
                _mt: "skusrmgmt.getfiletoken",
                isprivate: true,
                logType: "下载",
                filekey: filekey,
                expiresecs: 180,
            };
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    // window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
                    let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + "&fname=" + encodeURI(fileName);
                    console.log(doclink);
                    let link = document.createElement("a");
                    link.href = doclink;
                    link.download = "downloadfiletemp";
                    link.click();
                }
            }).catch(() => {
                t.$Modal.error({
                    title: "错误",
                    content: "网络错误",
                });
            });
        },
        refresh () {
            // this.getData();
        },
        // getData () {
        //     const t = this;
        //     t.loading = true;
        //     let searchObj = {
        //         cusId: t.cusId,
        //         picName: t.searchName,
        //         status: t.curStatus,
        //     };
        //     getTableData(t, "Skpicture.selectByPicturePageList", searchObj, t.getTableDataCallback);
        // },
        // getTableDataCallback (data) {
        //     let t = this;
        //     t.data = data.rows;
        //     t.total = data.records;
        //     t.tableselected = [];
        // },
        getAddOrUpData (res) {
            if (res) {
                this.data.unshift(res);
            } else {
                // this.getData();
            }
        },
        //修改不刷新
        updataTable(res){
				const t = this
				t.data.splice(t.indexs,1,res)
		},
        searchCusData () {
            // this.$refs.searchCustom.getData();
            this.openCustom = true;
        },
        clearCus () {
            this.cusId = "";
            this.cusName = "";
        },
        closeCustom () {
            this.openCustom = false;
        },
        changeinputCustom (id, name) {
            this.cusId = id;
            this.cusName = name;
        },
        getSelect () {
            let t = this;
            switch (t.curStatus) {
                case "01draft":
                    t.page = 1;
                    t.disable = true;
                    t.buttonList = [
                        {
                            id: "add",
                            type:'primary',
                            name: "新增",
                        }, {
                            id: "delete",
                            type:'error',
                            name: "删除",
                        }, {
                            id: "bn_submit",
                            type:'primary',
                            name: "生效",
                        },
                    ];
                    // t.getData();
                    break;
                case "02valid":
                    t.page = 1;
                    t.disable = true;
                    t.buttonList = [
                        {
                            id: "bn_invalid",
                            type:'primary',
                            name: "失效",
                        }, {
                            id: "bn_reback",
                            type:'primary',
                            name: "退回",
                        },
                    ];
                    // t.getData();
                    break;
                case "03invalid":
                    t.page = 1;
                    t.disable = true;
                    t.buttonList = [];
                    // t.getData();
                    break;
                /* case "04close":
                              t.page = 1;
                              t.getAllButtonByNode()
                              t.getData();
                              break; */
            }
        },
        buttonClick (id) {
            let t = this;
            switch (id) {
                case "add":
                    t.openAddOrUpModel("", "新增");
                    break;
                case "delete":
                    t.buttonDelete("删除");
                    break;
                case "bn_submit":
                    t.buttonSubmit();
                    break;
                case "bn_invalid":
                    t.buttonInvalid();
                    break;
                case "bn_reback":
                    t.buttonReback();
                    break;
            }
        },
        buttonDelete () {
            this.curLogType = "删除";
            HROcommonOperateData(this, "Skpicture.deleteByIds");
        },
        buttonInvalid () {
            let otherObj = {
                state: "03invalid",
            };
            this.curLogType = "失效";
            commonOperateData(this, "Skpicture.setStateByIds", otherObj);
        },
        buttonReback () {
            let otherObj = {
                state: "01draft ",
            };
            this.curLogType = "后退";
            commonOperateData(this, "Skpicture.setStateByIds", otherObj);
        },
        buttonSubmit () {
            let otherObj = {
                state: "02valid ",
            };
            this.curLogType = "生效";
            commonOperateData(this, "Skpicture.setStateByIds", otherObj);
        },
        sortable (column) {
            this.sort = column.key;
            this.order = column.order;
            if (this.order !== "normal") {
                // this.getData();
            } else {
                this.order = "desc";
            }
        },
        sizeChange (size) {
            const t = this;
            t.rows = size;
            // t.getData();
        },
        pageChange (page) {
            const t = this;
            t.page = page;
            // t.getData();
        },
        selectedtable (selection) {
            const newArr = [];
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
            }
            this.tableselected = newArr;
        },
        // openAddOrUpModel (id, type) {
        //     const t = this;
        //     // t.logType = type;
        //     t.$refs.addOrUpModel.getData(id);
        //     t.$refs.addOrUpModel.initRoom(t.cusId)
        //     t.openAddOrUp = true;
        // },
        closeAddOrUp () {
            const t = this;
            t.openAddOrUp = false;
            t.$refs.addOrUpModel.upFormData.id = "";
            t.$refs.addOrUpModel.upFormData.cusId = "";
            t.$refs.addOrUpModel.upFormData.cusName = "";
            t.$refs.addOrUpModel.upFormData.picName = "";
            t.$refs.addOrUpModel.upFormData.fileKeys = "";
            t.$refs.addOrUpModel.upFormData.memo = "";
        },
        search () {
            this.page = 1;
            this.searchLoading = true;
            // this.getData();
        },
    },
};
</script>
<style lang="scss" scoped>
.table-form {
    margin: 10px 0;
    overflow: auto;
}

.margin-right-10 {
    margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
