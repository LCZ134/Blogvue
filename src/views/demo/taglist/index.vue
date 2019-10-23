<template>
  <div class="blogTag">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input placeholder="请输入内容" v-model="paging.title"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getBlogTag">查询</el-button>
      </el-form-item>

      <el-form-item style="margin-right: 15px;float: right;">
        <el-button type="success" @click="addBlogTag">添加</el-button>
      </el-form-item>
    </el-form>

    <div class="blogTag-table">
      <el-table style="width: 100%;" :data="blogTagList">
        <el-table-column label="标签名称" prop="title"></el-table-column>
        <el-table-column label="文章数" prop="citationCount"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="setdialy(scope.row, true)" size="mini">编辑</el-button>
            <el-button @click="delteBlogTags(scope.row.id)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paging.pageIndex"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="paging.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      class="comment-page"
    ></el-pagination>

    <!-- 查看弹出框 -->
    <el-dialog :title="dialogName" :visible.sync="dialogVisible" center>
      <el-form>
        <el-form-item label="编号id" v-show="false">
          <el-input autocomplete="off" v-model="ruleForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标签名称">
          <el-input autocomplete="off" v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="文章数量" v-show="false">
          <el-input autocomplete="off" :disabled="true" v-model="ruleForm.citationCount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" v-show="dialogName!='查看'" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        citationCount: 0,
        id: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ]
      },
      paging: {
        title: "", //模糊查询
        pageIndex: 1, //初始页
        pageSize: 10 //    每页的数据
      },
      dialogVisible: false,
      dialogName: ""
    };
  },
  methods: {
    ...mapActions("admin/blogTag", [
      "getBlogTagData",
      "getBlogTagwhereData",
      "insertBlogTag",
      "delteBlogTag",
      "updateBlogTag"
    ]),
    update() {
      var that = this;
      this.dialogVisible = false;
      if (this.ruleForm.id.length > 0) {
        this.updateBlogTag({
          title: this.ruleForm.title,
          id: this.ruleForm.id
        }).then(s => {
          that.getBlogTagwhereData(that.paging);
        });
      } else {
        this.insertBlogTag({ title: this.ruleForm.title }).then(function() {
          that.getBlogTagwhereData(that.paging);
        });
      }
      this.getBlogTagwhereData(this.paging);
    },
    addBlogTag() {
      //查看
      this.dialogVisible = true;
      this.dialogName = "添加";
      this.ruleForm = {
        title: "",
        citationCount: 0,
        id: ""
      };
    },
    setdialy(data, status) {
      this.dialogVisible = true;
      this.dialogName = status ? "编辑" : "查看";

      Object.keys(this.ruleForm).forEach(s => {
        this.ruleForm[s] = data[s];
      });
    },
    handleSizeChange: function(size) {
      this.paging.pageSize = size; //每页下拉显示数据
      this.getBlogTagwhereData(this.paging);
    },
    handleCurrentChange: function(currentPage) {
      this.paging.pageIndex = currentPage; //点击第几页
      this.getBlogTagwhereData(this.paging);
    },
    delteBlogTags(id) {
      this.delteBlogTag({ blogtagtId: id, data: this.paging });
    },
    getBlogTag() {
      this.getBlogTagwhereData(this.paging);
    }
  },
  computed: {
    ...mapState("admin/blogTag", ["blogTagList", "totalCount"])
  },
  created() {
    this.getBlogTagwhereData(this.paging);
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.blogTag {
  position: relative;
}
.blogTag-table {
  min-height: 500px;
  overflow: hidden;
}
</style>