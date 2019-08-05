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
        }
    },

})

export default app