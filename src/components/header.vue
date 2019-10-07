<template>
  <div class="header">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <span>{{userinfo.nickName}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>我的消息</el-dropdown-item>
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item divided @click.native="logouts">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> 

  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed:{
   ...mapState("admin/user", ["userinfo"])
  },
  methods:{
    ...mapMutations("admin/user",["logouts"])
  }
}
</script>


<style>

</style>