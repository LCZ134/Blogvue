<template>
  <div class="asideBarItem-container">
    <!-- 如果hasOwnProperty监测有children 就循环递归展示-->
    <el-submenu :index="router.path" v-if="router.hasOwnProperty('children')">
      <template slot="title">
        <i :class="router.icon"></i>
        <span slot="title">{{router.name}}</span>
      </template>

      <!--递归子孙导航-->

      <asideBarItem
        v-for="child in router.children"
        v-show="child.IsHidden"
        :key="child.path"
        :router="child"
      ></asideBarItem>
    </el-submenu>
    <!-- 如果没有 就展示一级导航 -->
    <el-menu-item v-else :key="router.path" :index="router.path">{{router.name}}</el-menu-item>
  </div>
</template>

<script>
//hasOwnProperty可以用来检测一个对象是否含有特定的自身属性
export default {
  name: "asideBarItem",
  props: {
    router: {
      type: Object
    }
  },
  created() {
    // console.log(this.router)
  }
};
</script>
 