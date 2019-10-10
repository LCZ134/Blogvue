<template>
  <div>
    <el-dialog title="查看" :visible.sync="selectComment.status" width="60%" center>
      <div class="mavonEditor">
        <mavon-editor v-model="selectComment.blogContent" :toolbars="markdownOption" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectComment.status = false">取 消</el-button>
        <el-button type="primary" @click="updateBlogcomment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script >
import { mapState, mapActions } from "vuex";

export default {
  created() {
    console.log(this.selectComment);
  },
  computed: {
    ...mapState("admin/blogPost", ["selectComment", "bloglist"])
  },
  methods: {
    ...mapActions("admin/blogPost", ["closeCular", "updateBlogPost"]),
    updateBlogcomment() {
      var date = this.bloglist.find(i => i.id === this.selectComment.id);

      console.log(date);

      // this.updateBlogPost({
      //   id: this.selectComment.id,
      //   mdContent: this.selectComment.blogContent
      // });
      // this.selectComment.status = false;
    }
  },
  data() {
    return {
      markdownOption: {
        //配置文本编辑器
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  }
};
</script>

