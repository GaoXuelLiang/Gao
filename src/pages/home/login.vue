<template>
    <div class="login-con"
         @keydown.enter="login">
        <Card :bordered="false">
            <p slot="title">
                <Icon type="log-in"></Icon>
                欢迎登录
            </p>
            <div class="form-con">
                <Form ref="loginForm"
                      :model="form"
                      :rules="rules">
                    <FormItem prop="userName">
                        <Input v-model="form.userName"
                               placeholder="请输入用户名">
                        <span slot="prepend">
                            <Icon :size="16"
                                  type="person"></Icon>
                        </span>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password"
                               v-model="form.password"
                               placeholder="请输入密码">
                        <span slot="prepend">
                            <Icon :size="14"
                                  type="locked"></Icon>
                        </span>
                        </Input>
                    </FormItem>
                    <FormItem prop="noteCode">
                        <Row>
                            <Col span="13">
                            <Input v-model="form.noteCode"
                                   ref="noteCode"
                                   placeholder="请输入验证码">
                            <span slot="prepend">
                                <Icon :size="14"
                                      type="ios-checkmark"></Icon>
                            </span>
                            </Input>
                            </Col>
                            <Col span="9"
                                 offset="2">
                            <div class="noteCode"
                                 @click="getNoteCode">
                                <img :src="noteCodeUrl"
                                     class="codeImg" />
                            </div>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem class="no-margin">
                        <Button @click="login"
                                type="primary"
                                long>登录</Button>
                    </FormItem>
                    <FormItem class="no-margin">
                        <Row>
                            <Col span="12">
                            <router-link to="register">注册帐号</router-link>
                            </Col>
                            <Col span="12"
                                 class="align-right">
                            <router-link to="change">忘记密码</router-link>
                            </Col>
                        </Row>
                        <Row v-show="false">
                            <Col span="12">
                            <Button type="primary"
                                    @click="initCode">初始化</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </div>
        </Card>

        <!-- <userinfo v-show="showUserInfo" @close="close"></userinfo> -->
    </div>
</template>
<script>
// import { getNoteCode, getDataLevelNone, getDataLevelUserLogin } from '../../axios/axios'
// import { setCookie, isSuccess, getCookie } from '../../lib/util'
// import userinfo from '../useinfo/useinfo'
export default {
    data () {
        return {
            noteCodeUrl: '',
            noteCodeKey: '',
            showUserInfo: true,
            form: {
                userName: '',
                password: '',
                noteCode: '',
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                //        noteCode: [
                //          { required: true, message: '验证码不能为空', trigger: 'blur' },
                //        ],
            },
        }
    },
    mounted () {
        // this.getNoteCode()
        // this.form.userName = getCookie('useName')
    },
    components: {
        // userinfo
    },
    methods: {
        close () {
            this.showUserInfo = false
        },
        getNoteCode () {
            const t = this
            getNoteCode().then((res) => {
                t.noteCodeUrl = res.data.content[0].imgUrl
                t.noteCodeKey = res.data.content[0].key
            }).catch(() => {

            })
        },
        // initCode () {
        //     const data = {
        //         _mt: 'verifycode.genVerifyCode',
        //         clientId: pubsource.clientId,
        //         clientPass: pubsource.clientPass,
        //         clientIp: "127.0.0.1",
        //     }
        //     getDataLevelNone(data).then((res) => {
        //         if (res.data.content[0].value) {
        //             this.$Modal.success({
        //                 title: '提示信息',
        //                 content: '初始化成功！',
        //             })
        //         }
        //     }).catch(() => {
        //         this.$Modal.success({
        //             title: '提示信息',
        //             content: '初始化失败！',
        //         })
        //     })
        // },
        login () {
            const t = this
            // this.$refs.loginForm.validate((valid) => {
            //     if (valid) {
            //         getDataLevelNone({
            //             _mt: 'skusrmgmt.login',
            //             applicationId: 20,
            //             loginCode: t.form.userName,
            //             password: md5(t.form.password),
            //             captchaCode: t.form.noteCode,
            //             captid: t.noteCodeKey,
            //         })
            //             .then((res) => {
            //                 if (isSuccess(res, t)) {
            //                     console.log(res.data.content[0], "res.data.content[0]")
            //                     setCookie('wtk', res.data.content[0].webToken)
            //                     setCookie('useId', res.data.content[0].uid)
            //                     setCookie('useName', t.form.userName)
            //                     t.$store.commit('setName', t.form.userName)
            //                     t.$store.commit('setUserId', res.data.content[0].uid)
            //                     //t.$router.push('/home')
            //                     t.getUserInfo()
            //                     return
            //                 }
            //                 if (res.data.stat.stateList[0]['code'] == 11044) {
            //                     this.form.noteCode = ''
            //                 }
            //                 t.getNoteCode()
            //             }).catch(() => {
            //                 t.getNoteCode()
            //                 this.$Modal.error({
            //                     title: '',
            //                     content: '网络',
            //                 })
            //             })
            //     }
            // })
        },
        getUserInfo () {
            const t = this
            // getDataLevelUserLogin({
            //     _mt: 'skusrmgmt.getloginuser',
            //     purpose: 0,
            // }).then((res) => {
            //     try {
            //         let finalRoleType = res.data.content[0].finalRoleType;
            //         localStorage.setItem('finalRoleType', finalRoleType)
            //         t.$store.commit('setCompanyId', res.data.content[0].finalCustomer)
            //         let userAddress
            //         if (res.data.content[0].userAddress) {
            //             userAddress = decodeURIComponent(res.data.content[0].userAddress)
            //         } else {
            //             userAddress = false
            //         }
            //         if (userAddress) {
            //             if (finalRoleType == '0root') {
            //                 const tag = {
            //                     title: '首页',
            //                     path: '/rootPage',
            //                     name: 'rootPage',
            //                 }
            //                 t.$store.commit("increateTag", tag)
            //                 t.$router.push(tag)
            //             } else if (finalRoleType == '2supadmin') {
            //                 const tag = {
            //                     title: '首页',
            //                     path: '/home',
            //                     name: 'home',
            //                 }
            //                 t.$store.commit("increateTag", tag)
            //                 t.$router.push(tag)
            //             } else if (finalRoleType == '5houseuser') {
            //                 const tag = {
            //                     title: '首页',
            //                     path: '/xlx',
            //                     name: 'xlx',
            //                 }
            //                 t.$store.commit("increateTag", tag)
            //                 t.$router.push(tag)
            //             } else if (finalRoleType == '4cususer') {
            //                 let arr = userAddress.split('?'), obj = {}
            //                 arr[1].split('&').forEach((item, index) => {
            //                     let arr1 = item.split('=')
            //                     obj[arr1[0]] = arr1[1]
            //                 })
            //                 const tag = {
            //                     path: '/' + arr[0],
            //                     name: arr[0],
            //                     query: obj,
            //                 }
            //                 t.$router.push(tag)
            //             } else if (finalRoleType == '3cusadmin') {
            //                 let arr3cus = userAddress.split('?')
            //                 let obj = {}
            //                 let aa = arr3cus[1].split('&')
            //                 aa.forEach((item, index) => {
            //                     let arr1 = item.split('=')
            //                     let name = arr1[0]
            //                     obj[name] = arr1[1]
            //                 })
            //                 let tag3 = {
            //                     path: '/' + arr3cus[0],
            //                     name: arr3cus[0],
            //                     query: obj,
            //                 }
            //                 t.$store.commit("increateTag", tag3)
            //                 t.$router.push(tag3)
            //             }
            //         } else {
            //             t.$router.push('/home')
            //         }
            //     } catch (error) {

            //     }

            // }).catch(() => {
            //     this.$Modal.error({
            //         title: '错误',
            //         content: '网络错误',
            //     })
            // })
        },
    },
}
</script>

<style lang="scss" scoped>
.ivu-card {
    padding: 0 30px;
}
.login-con {
    position: absolute;
    right: 160px;
    /* left:50%; */
    top: 50%;
    /* transform: translate(-50%,80px); */
    transform: translateY(-60%);
    width: 380px;
    .form-con {
        padding: 10px 0 0;
    }
    .login-tip {
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
    }
}
.noteCode {
    width: 100%;
    height: 36px;
}
.codeImg {
    width: 100%;
    height: 36px;
}
.noteCode :hover {
    cursor: pointer;
}
</style>
