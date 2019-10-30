<template>
  <el-aside width="160px" style="background-color: rgb(238, 241, 246)">
    <div class="app-side-logo">
      <img v-bind:src="userinfo.avatarUrl" />
    </div>
    <div>
      <el-menu router default-active="/" background-color="#293846" text-color="#fff">
        <!-- 左侧导航栏抽取循环部分 将路由列表传给子组件-->
        <asideBarItem
          v-for="router in routers"
          v-show="router.IsHidden"
          :router="router"
          :key="router.path"
        ></asideBarItem>
      </el-menu>
    </div>
  </el-aside>
</template>

<script >
import { mapState, mapMutations } from "vuex";
import asideBarItem from "./asideBarItem";

export default {
  components: {
    asideBarItem
  },
  computed: {
    ...mapState("admin/user", ["userinfo"]),
    routers() {
      return this.$router.options.routes;
    }
  }
};
</script>