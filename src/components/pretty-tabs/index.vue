<template>
  <el-row>
    <div class="magtop">
      <el-col :span="22">
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
      </el-col>
      <el-col :span="2" class="clearButton">
        <el-dropdown split-button type="primary" @click="closeAll">
          关闭
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="closerOthers">
                <i class="el-icon-circle-close"></i>关闭其他
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="closeAll">
                <i class="el-icon-error"></i>关闭全部
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </div>
  </el-row>
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
    ...mapActions("admin/page", ["close", "closeAll", "closeOther"]),
    handleClick(tab, event) {
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
    },
    closerOthers() {
      var fullPath = this.$route.path;
      this.closeOther(fullPath);
    }
  },
  created() {
    this.$router.push(this.opened[0].fullPath);
  }
};
</script>

<style >
.clearButton {
  height: 41px;
  border: 1px solid #e4e7ed;
  border-bottom: none;
}
.magtop {
  margin-top: 5px;
}
.el-dropdown {
  float: right;
  width: 100%;
}
.clearButton button {
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  border: none;
}
.clearButton button:nth-of-type(1) {
  width: 70%;
}
.clearButton button:nth-of-type(2) {
  float: right;
}
.clearButton button:hover {
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  border: none;
}
</style>