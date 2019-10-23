<template>
  <div class="index">
    <el-container style="height: 500px; border: 1px solid #eee">
      <!-- 头部-->
      <el-header style="text-align: right; font-size: 12px">
        <TapHeader></TapHeader>
      </el-header>
      <!-- 内容部分-->
      <el-container>
        <!-- 导航-->
        <saide></saide>
        <!--详情-->
        <el-main>
          <PrettyTabs />
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in levelList" :key="item.path">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 右侧显示区域 -->
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Main from "./main";
import saide from "./saide";
import TapHeader from './header';

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
    ...mapActions("admin/page", ["closeAll"]),
  },
};
</script>

<style>
html,
body,
#app,
.index {
  height: 100%;
}

.el-header {
  background-color: #24272e;
  color: #333;
  line-height: 60px;
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

/* .app-side-logo label {
  display: block;
  line-height: 60px;
  font-size: 30px;
  color: #fff;
} */

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