<template>
  <div class="usera">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章编辑</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>

        <el-form-item label="标签" prop="tags">
          <el-checkbox-group v-model="form.tags">
            <el-checkbox
              v-for="blogTag in blogTags"
              :key="blogTag.id"
              :label="blogTag.id"
              name="type"
            >{{blogTag.title}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="描述" prop="describe">
          <el-input
            type="textarea"
            v-model="form.describe"
            :autosize="{ minRows: 4}"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏">
          <el-switch v-model="form.isHidden"></el-switch>
        </el-form-item>
        <el-form-item label="是否置顶">
          <el-switch v-model="form.isTop"></el-switch>
        </el-form-item>

        <el-form-item label="预览图">
          <div v-show="isfile">
            <el-upload
              ref="upload"
              action="#"
              :beforeUpload="beforeUploadPicture"
              :on-change="imageChange"
              list-type="picture-card"
              name="files"
              :limit="1"
              :file-list="fileList"
              multiple
              :auto-upload="false"
              :on-preview="handlePictureCardPreview"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
          <div v-show="!isfile">
            <el-input v-model="form.bannerUrl" placeholder="请输入图片链接"></el-input>
          </div>
          <div>
            <el-switch
              v-model="isfile"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="图片上传方式"
            ></el-switch>
          </div>
        </el-form-item>

        <el-form-item label="内容">
          <div class="mavonEditor">
            <mavon-editor
              ref="md"
              v-model="form.mdContent"
              :toolbars="markdownOption"
              @imgAdd="$imgAdd"
              @change="textSave"
            />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script >
import { mapState, mapActions, mapMutations } from "vuex";
import { mavonEditor } from "mavon-editor";

export default {
  name: "blogposteditor",
  data() {
    return {
      blogPostId: "",
      form: {
        title: "",
        tags: [],
        describe: "",
        mdContent: "",
        content: "",
        bannerUrl: "",
        id: "",
        isTop: true,
        isHidden: true
      },
      rules: {
        title: [{ required: true, message: "输入错误", trigger: "blur" }],
        describe: [
          { required: true, message: "描述不能为空", trigger: "blur" },
          {
            min: 3,
            max: 200,
            message: "长度在 3 到 200 个字符",
            trigger: "blur"
          }
        ],
        tags: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个标签",
            trigger: "change"
          }
        ],
        bannerUrl: [
          { required: true, message: "描述不能为空", trigger: "blur" }
        ],
        id: []
      },
      blogTags: [],
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
        fullscreen: true, // 全屏编辑
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
      },
      selectedCategorySpe: this.selectedCategory,

      dialogImageUrl: "", //预览图片路径
      oldImageUrl: "", //旧的图片路径

      dialogVisible: false, //是否显示预览图片
      fileList: [],
      isfile: true
    };
  },
  computed: {
    ...mapState("admin/blogTag", ["blogTagList"]),
    ...mapState("admin/blogPost", ["blogPost"])
  },
  components: {
    mavonEditor
  },
  methods: {
    ...mapActions("admin/blogTag", ["getBlogTagData"]),
    ...mapActions("admin/blogPost", [
      "getBlogPost",
      "insertBlogPost",
      "updateBlogPost"
    ]),
    ...mapActions("admin/page", ["close"]),
    loadPageData() {
      this.blogPostId = this.$route.params.id;

      if (this.blogPostId != null && this.blogPostId != ":id") {
        this.getBlogPost(this.blogPostId).then(() => {
          Object.keys(this.form).forEach(key => {
            var obj = this.blogPost[this.blogPostId][key];
            if (obj == null || obj.length <= 0) return false;
            switch (key) {
              case "tags":
                this.form[key] = obj.map(i => i.id);
                break;
              case "bannerUrl":
                var re = /(http|https):\/\/([\w.]+\/?)\S*/;
                this.fileList = [
                  { name: "filePath.jpg", url: re.test(obj) ? obj : `.${obj}` }
                ];
                this.dialogImageUrl = obj;
                this.oldImageUrl = obj;
                this.form[key] = obj;
                break;
              case "isHidden":
                this.form[key] = obj === 0 ? false : true;
                break;
              case "isTop":
                this.form[key] = obj === 0 ? false : true;
                break;
              default:
                this.form[key] = obj;
                break;
            }
          });
        });
      }
      this.getBlogTagData().then(() => {
        this.blogTags = this.blogTagList;
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isfile && this.fileList[0].raw) {
            this.submitFile(this.fileList[0].raw).then(url => {
              this.form.bannerUrl = `${url}`;
              this.submitData();
            });
          } else {
            this.submitData();
          }
        } else {
          return false;
        }
      });
    },
    textSave(value, render) {
      this.form.content = render;
    },
    beforeUploadPicture(file) {
      const isImage =
        file.type == "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg" ||
        file.type == "image/bmp" ||
        file.type == "image/gif" ||
        file.type == "image/webp";
      const isLt2M = file.size < 1024 * 1024 * 2;
      if (!isImage) {
        this.$message.error("上传只能是png,jpg,jpeg,bmp,gif,webp格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    handlePictureCardPreview(file) {
      //显示预览图
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imageChange(file, fileList, name) {
      this.fileList = fileList;
      this.dialogImageUrl = file.url;
    },
    submitFile(file) {
      const formData = new FormData();
      formData.append("file", file);
      return new Promise((resolve, reject) => {
        this.$api.post("/file", formData, res => {
          if (res[0].statusCode == 0) {
            resolve(res[0].extends.path);
          } else {
            this.$message.error(res.result);
            reject(res.result);
          }
        });
      });
    },
    submitData() {
      if (this.form.id != null && this.form.id.length > 0) {
        this.updateBlogPost(this.form);
      } else {
        this.insertBlogPost(this.form);
        // this.resetForm("form");
      }
      // this.close({ tagName: this.$route.path }); //关闭
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      this.submitFile($file).then(url => {
        this.$refs.md.$img2Url(pos, url);
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.loadPageData();
  },
  mounted() {
    this.loadPageData();
  }
};
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>