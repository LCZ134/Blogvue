<template>
  <div class="header">
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
    setting(){
       this.$router.push("/setting");
    }
  },
  created() {
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
</style>