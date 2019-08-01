// import Vue from 'vue'


const app=({
    state:{
        pageOpenTagList:[{
            title:'home',
            path:'',
            name:'name'
        }]
    },
    mutations:{
        setOpenedList (state) {
            state.pageOpenTagList = localStorage.pageOpenTagList ? JSON.parse(localStorage.pageOpenTagList) : state.pageOpenTagList;
          },
        increateTag(state,tagObj){
            for(let i=0;i<state.pageOpenTagList.length;i++){
                state.pageOpenTagList.push(tagObj)
                localStorage.pageOpenTagList = JSON.stringify(state.pageOpenTagList)
            }
        }
    },

})

export default app;