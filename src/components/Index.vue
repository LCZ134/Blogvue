<template>
  <div class="index">
    <el-container style="height: 500px; border: 1px solid #eee">
      <!-- 导航-->
      <saide></saide>
      <el-container>
        <el-header style="height: 106px;">
          <TapHeader></TapHeader>
          <PrettyTabs style="background: #fefefe;margin-bottom: 0;" />
        </el-header>
        <!--详情-->
        <el-main>
          <!-- <PrettyTabs /> -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in levelList" :key="item.path">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 右侧显示区域 -->
          <keep-alive>
            <Main></Main>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Main from "./main";
import saide from "./saide";
import TapHeader from "./header";

import PrettyTabs from "@/components/pretty-tabs";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    saide,
    Main,
    PrettyTabs,
    TapHeader
  },
  data() {
    return {
      levelList: null
    };
  },
  computed: {
    ...mapState("admin/user", ["userinfo"])
  },
  methods: {
    ...mapMutations("admin/user", ["loginout"]),
    ...mapActions("admin/page", ["closeAll"])
  }
};
</script>

<style>
html,
body,
#app,
.index {
  height: 100%;
}

.el-tabs__header {
  margin: 0;
}

.el-header {
  background-color: #24272e;
  color: #333;
  padding: 0;
  overflow: hidden;
}

.el-aside {
  color: #333;
  background-color: #32353c !important;
}

.el-menu {
  border-right: 0;
}

.app-side-logo {
  height: 60px;
  text-align: center;
  padding: 10px;
  background: #32353c !important;
}

.app-side-logo img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: block;
  line-height: 60px;
  font-size: 30px;
  color: #fff;
  margin: 0 auto;
}

.el-container {
  height: 100% !important;
}

.container {
  margin-top: 50px;
  border: 1px solid black;
}
</style>