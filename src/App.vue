<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import routes from "./router/routes";
import { mapMutations } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapMutations({
      pageInit: "admin/page/init"
    })
  },
  created() {
    this.pageInit([...routes]);
  }
};
</script>

<style lang="css">
@import "./style/index.css";
</style>


