<template>
  <div class="comment">
    <el-collapse>
      <el-collapse-item v-for="item in commentChild" :key="item.id" :title="item.user.nickName ">
        <div v-html="item.content"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "comment",
  props: ["comtId"],
  data() {
    return {
      commentChild: []
    };
  },
  methods: {
    ...mapActions("admin/blogComment", ["getBlogChildData"])
  },
  computed: {
    ...mapState("admin/blogComment", ["blogCommentChild"])
  },
  created() {
    let that = this;
    if (this.comtId != null && this.comtId.length > 0) {
      this.getBlogChildData(this.comtId).then(function() {
        that.commentChild = that.blogCommentChild;
        console.log(that.commentChild);
      });
    }
  }
};
</script>
 