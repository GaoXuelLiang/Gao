<template>
    <div class="main">
        <!-- 头部 -->
        <div class="header">
            <div class="logo">
                <img src="../../static/homeimg/logo.jpg" alt="" width="80" @click="backhome()">
            </div>
            <div class="authority">
                TWO UMBRELLA
            </div>
            <!-- 头部右侧我的信息和公司 -->
            <div class="person-authority">
                    <!-- 当前时间 -->
                    <span style="color:rgb(255, 255, 0);padding-top:2px;padding-right: 15px;cursor:pointer">
                                {{NowDate}}
                    </span>
                    <!-- 公司 -->
                    <div class="company">
                        <Dropdown transfer trigger="hover" @on-click="changeselectedname">
                            <a href="javascript:void(0)" style="color:white">
                                {{selectedname}}
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem v-for='(item,index) in list' :key='index' :name='item.name'>{{item.name}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <!-- 我的信息 -->
                    <div class="personage">
                        <Dropdown transfer trigger="hover" @on-click="changeperson">
                            <a href="javascript:void(0)" style="color:white">
                                {{changepersonage}}
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="userinfo">个人中心</DropdownItem>
								<DropdownItem name="loginout">退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <!-- 头像 -->
                    <Avatar username="Je" :src='imageUrl' class="avatar" style="margin-left:10px;margin-right: 10px;width:40px;height:40px"></Avatar>
            </div>
        </div>
        <!-- 左树和右树 -->
        <div class="section" v-show="showsection">
            <hrmenu ref="menu" class="left" @toggleClick="toggleClick">
            
            </hrmenu>
            <div class="right" :style="{left:shrink?'64px':'200px'}">
                <pagetab class="pagetab" :pageTagsList="pageTagsList" ref="pagetab">

                </pagetab>
                <div>
                    <router-view>

                    </router-view>
                </div>
            </div>
        </div>
        <!-- 我的信息 -->
        <userinfo v-show="showUserinfo" ref="userinfo" @close='close'></userinfo>
    </div>
</template>
<script>
    import Userinfo from '../components/userinfo/userinfo'
    import Avatar from 'vue-avatar'
    import hrmenu from "../components/menu/menu"
    import pagetab from "../components/pagetab/pagetab"
    export default {
        data () {
            return {
               shrink:false,
               selectedname:'全部',
               list:[{name:'全部'},{name:'索克'},{name:'HRO'},{name:'SSC'},{name:'金柚'},{name:'西门子'}],
               //上传图片
               imageUrl: '../../static/homeimg/nice.jpg',
               //当前时间
               NowDate:'',
               //个人中心
               changepersonage:'我的信息',
               showsection:true,
               showUserinfo:false
            }
        },
        components:{
            hrmenu,
            pagetab,
            Avatar,
            Userinfo
        },
        mounted(){
            this.getNewDate()
        },
        computed:{
            pageTagsList(){
                var tag={}
                return this.$store.state.app.pageOpenedList
            }
        },
        methods:{
            //返回主页
            backhome(){
                this.close()
            },
            //个人中心
            changeperson(name){
                this.showUserinfo=true;
                this.showsection=false;
                this.$refs.userinfo.loading=true;
                this.$refs.userinfo.ready()
            },
            close(){
                this.showUserinfo=false;
                this.showsection=true;
            },
            //获取当前时间
            getNewDate(){
				setInterval(() => {
					let Time=new Date();
					let year=Time.getFullYear();
					let month=Time.getMonth()+1;
					let days=Time.getDate();
					let hours=Time.getHours();
					let minutes=Time.getMinutes();
					let seconds=Time.getSeconds();
					let week=Time.getDay();
					hours=check(hours);
					minutes=check(minutes);
					seconds=check(seconds);
					let show_week=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六'); 
					this.NowDate=year+"年"+month+"月"+days+"日"+"\xa0\xa0"+show_week[week]+"\xa0\xa0"+hours+":"+minutes+":"+seconds
					function check(i){
						var num
						i<10?num="0"+i:num=i
						return num 
					} 
				}, 1000);
			},
            //接收子组件传过来的shrink
            toggleClick(t){
                this.shrink=t
            },
            //下拉公司
            changeselectedname(name){           
                this.selectedname=name 
            }
        }
    }
</script>
<style lang="scss" scoped>
.main{
    height: 100%;
}
.header{
    width: 100%;
    height: 50px;
    background-color: #339fe2;
    position: relative;
    .logo{
        width: 150px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
    }
    .logo:hover {
        cursor: pointer;
        transition: all 0.5s;
        background-color: rgba(187, 182, 182, 0.1);
    }
    .authority{
        padding-left: 150px;
        height: 50px;
        line-height: 50px;
        font-weight: 700;
        font-family: "Yuanti SC";
    }
    .person-authority{
        position: absolute;
        right: 15px;
        top: 15px;
        bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        .company{
            padding-right: 15px;
        }
        .personage{
            padding-right: 15px;
        }
        .avatar:hover{
            cursor: pointer;
        }
    }
    
}
.section{
        display: flex;
        .left{
            width: 200px;
            background-color: #495060;
            height: 1000px;
        }
        .right{
            position: absolute;
            top: 50px;
            right: 0;
            bottom: 0;
            overflow-y: auto;
            overflow-x: hidden;
            background-color: #f0f0f0;
            // z-index: 1;
            transition: left 0.3s;
            // left: 200px;
            .pagetab{
                height: 42px;
                display: flex;
                padding-top: 5px;
                border-bottom: 1px solid #193545
            }
        }
    }
</style>

