// import Vue from 'vue'


const app=({
    state:{
        pageOpenTagList:[{
            title:'home',
            // path:'',
            name:'home'
        }]
    },
    mutations:{
        setOpenedList (state) {
            state.pageOpenTagList = localStorage.pageOpenTagList ? JSON.parse(localStorage.pageOpenTagList) : state.pageOpenTagList;
        },
        //添加tag标签
        increateTag(state,tagObj){
            // some函数循环page标签有一个值和tagObj相等flag返回true
            let flag = state.pageOpenTagList.some((item,index)=>{
                return item.name==tagObj.name
            })
            //当不等于flag的时候把tagObj push到page中
            if(!flag){
                 state.pageOpenTagList.push(tagObj);
            }
            //循环page标签如果和有添加的标签一样就删除重新添加到数组最后
            for(let i=0;i<state.pageOpenTagList.length;i++){
                if(state.pageOpenTagList[i].name==tagObj.name){
                    state.pageOpenTagList.splice(i,1);
                }
            }
            state.pageOpenTagList.push(tagObj);
        },
        // 清除所有标签
        clearAllTags(state){
            // 从下标[1]开始到最后,留下home
                state.pageOpenTagList.splice(1)
        },
        // 清除其他标签保存当前最后一个标签
        clearOtherTags(state){
            for(let i=0;i<state.pageOpenTagList.length;i++){
                state.pageOpenTagList.splice(1,state.pageOpenTagList.length-2);
            }
        }
    },

})

export default app