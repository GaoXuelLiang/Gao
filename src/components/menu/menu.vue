<template>
  <!-- 用toggleClick事件shrink判断是否收起左树 -->
  <div class="menu" :style="{width:shrink?'64px':'200px'}">
    <div @click="toggleClick">
      <Icon v-if="shrink" type="logo-reddit" style="padding-left:15px" size="30" color="white" />
      <Icon
        v-if="!shrink"
        type="ios-planet-outline"
        style="padding-left:70px"
        size="30"
        color="white"
      />
    </div>
    <el-menu
      @select="changeMenu"
      default-active="2"
      class
      :collapse="shrink"
      background-color="#495060"
      text-color="#fff"
      active-text-color="#2DB7F5"
    >
      <!-- 左树下拉 -->
      <template v-for="(item,index) in menu">
        <!-- 判断是否有2级菜单 -->
        <el-submenu v-if="item.children" :key="index" :index="item.id">
          <template slot="title">
            <Icon
              :type="item.className"
              size="16"
              color="#fff"
              style="margin-right: 5px;width: 15px;text-align: center"
            ></Icon>
            <span>{{item.nodeName}}</span>
          </template>
          <!-- 2级 -->
          <template v-for="(item2,index2) in item.children">
            <el-submenu v-if="item2.children" :key="index2" :index="item2.id"></el-submenu>
            <el-menu-item v-else :index="item2.id" :key="index2">
              <Icon
                :type="item2.className"
                size="16"
                color="#fff"
                style="margin-right: 5px;width: 15px;text-align: center"
              ></Icon>
              <span>{{item2.nodeName}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <!-- 没有2级就只显示1级菜单 -->
        <el-menu-item v-else :index="item.id" :key="index">
          <template slot="title" v-if="!shrink">
            <Icon
              :type="item.className"
              size="16"
              color="#fff"
              style="margin-right: 5px;width: 15px;text-align: center"
            ></Icon>
            <span>{{item.nodeName}}</span>
          </template>
          <Icon
            v-else
            :type="item.className"
            size="16"
            color="#fff"
            style="margin-right: 5px;width: 15px;text-align: center"
          ></Icon>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shrink: false,
      menu: [
        {
          id: "1",
          className: "logo-javascript",
          nodeName: "Absolutely",
          children: [
            {
              id: "1-1",
              className: "ios-basketball-outline",
              nodeName: "Great",
              children: ""
            },
            {
              id: "1-2",
              className: "ios-beer-outline",
              nodeName: "Perfect",
              children: ""
            },
            {
              id: "1-3",
              className: "ios-bug-outline",
              nodeName: "Serious",
              children: ""
            }
          ]
        },
        {
          id: "2",
          className: "ios-paper-plane-outline",
          nodeName: "Appreciate",
          children: [
            {
              id: "2-1",
              className: "ios-camera-outline",
              nodeName: "Monday",
              children: ""
            },
            {
              id: "2-2",
              className: "ios-ice-cream-outline",
              nodeName: "Tuesday",
              children: ""
            },
            {
              id: "2-3",
              className: "ios-shirt-outline",
              nodeName: "Wednesday",
              children: ""
            },
            {
              id: "2-4",
              className: "ios-umbrella-outline",
              nodeName: "Thursday",
              children: ""
            },
            {
              id: "2-5",
              className: "ios-no-smoking-outline",
              nodeName: "Friday",
              children: ""
            }
          ]
        },
        {
          id: "3",
          className: "ios-pizza-outline",
          nodeName: "Congratulations",
          children: ""
        },
        {
          id: "4",
          className: "ios-color-wand-outline",
          nodeName: "Wednesday",
          children: ""
        }
      ],
      data: []
    };
  },
  created() {
    this.same(this.menu);
    console.log(this.data)
  },
  methods: {
    // 收起展开左树菜单
    toggleClick() {
      this.shrink = !this.shrink;
      this.$emit("toggleClick", this.shrink);
    },
    //组件事件触发返回选中的index path
    changeMenu(id) {
		let name = "";
		if (this.data.length > 0) {
			for (let i = 0; i < this.data.length; i++) {
				if (this.data[i].id == id) {
					name = this.data[i].nodeName;
					break;
				} 
      }
			const tag = {
				title: name,
				// path:'/'+name,
				// path:'',
				name: name
			};
			this.$store.commit("increateTag", tag);
		}
    },
    same(arr) {
      arr.forEach((value, index) => {
        if (value.children.length > 0) {
          this.same(value.children);
        } else {
          this.data.push(value);
        }
      });
    }
  }
};
</script>
<style>
</style>
