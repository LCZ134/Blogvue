<template>
  <div class="header">
    <el-breadcrumb style="line-height: 60px;position: absolute;">
      <el-breadcrumb-item  v-for="item in router" :key="item.name" :to="{ path: '/' }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <span>{{userinfo.nickName}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>我的消息</el-dropdown-item>
        <el-dropdown-item @click.native="setting">设置</el-dropdown-item>
        <el-dropdown-item divided @click.native="logouts">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      router: [
        {
          name: "首页"
        },
        {
          name: "页面一"
        }
      ]
    };
  },
  computed: {
    ...mapState("admin/user", ["userinfo"])
  },
  methods: {
    ...mapMutations("admin/user", ["loginout"]),
    ...mapActions("admin/page", ["closeAll"]),
    logouts: function() {
      this.$confirm("确认退出?", "提示", {})
        .then(() => {
          this.loginout();
          this.closeAll();
          this.$router.push("/login");
        })
        .catch(e => {
          console.log(e);
        });
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      this.levelList = matched;
    },
    setting() {
      this.$router.push("/setting");
    }
  },
  created() {
    //console.log(this.router);
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>

<style>
.header {
  height: 60px;
  text-align: right;
  padding: 0 30px;
  line-height: 60px;
  overflow: hidden;
}
</style>