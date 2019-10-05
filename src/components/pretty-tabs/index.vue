<template>
  <section class="pretty-tabs">
    <el-tabs
      class="d2-multiple-page-control"
      :value="current"
      type="card"
      :closable="true"
      @tab-click="handleClick"
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="page in opened"
        :key="page.fullPath"
        :label="page.meta.title || '未命名'"
        :name="page.fullPath"
      />
    </el-tabs>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  mounted() {
    // console.log(this.$store);
  },
  computed: {
    ...mapState("admin/page", ["opened", "current"])
  },
  methods: {
    ...mapActions("admin/page", ["close"]),
    handleClick(tab, event) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find(page => page.fullPath === tab.name);
      const { name, params, query } = page;
      if (page) {
        this.$router.push(page.fullPath);
      }
    },
    handleTabsEdit(tagName, action) {
      if (action === "remove") {
        this.close({
          tagName
        });
      }
    }
  },
  created() {
    this.$router.push(this.opened[0].fullPath);
  }
};
</script>