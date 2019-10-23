<template>
  <div class="deit">
    <div class="crumbs">
      <div class="cantainer">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="form.keyword" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="form.tags" placeholder="选择标签" @change="selectTag()">
              <el-option label="--请选择--" value></el-option>
              <el-option
                v-for="blogTag in blogTagList"
                :key="blogTag.id"
                :label="blogTag.title"
                :value="blogTag.id"
              ></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="时间">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="form.dateFrom"
            ></el-date-picker>
            <span>-</span>
            <el-date-picker
              type="date"
              placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="form.dateTo"
            ></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="getBlogPost()">查询</el-button>
          </el-form-item>
        </el-form>

        <div class="comment-table">
          <el-table style="width: 100%;" :data="bloglist">
            <el-table-column label="标题" prop="title" width="180"></el-table-column>

            <el-table-column label="标签" width="180">
              <template slot-scope="scope">
                <el-tag
                  v-show="scope.row.tags.length>0"
                  v-for="item in scope.row.tags"
                  :key="item.id"
                  class="blogtag"
                >{{item.title}}</el-tag>

                <p v-show="scope.row.tags.length<=0">未添加标签</p>
              </template>
            </el-table-column>

            <el-table-column label="简介" width="400">
              <template slot-scope="scope">
                <p>{{scope.row.describe | isNullContext}}</p>
              </template>
            </el-table-column>

            <el-table-column label="点赞数" prop="like"></el-table-column>

            <el-table-column label="评论数">
              <template slot-scope="scope">
                <p @click="getComment(scope.row.id)">{{scope.row.commentCount }}</p>
              </template>
            </el-table-column>

            <el-table-column label="日期" prop="createOn" width="180"></el-table-column>
            <el-table-column label="公开">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isHidden"
                  @change="showChange(scope.row.isHidden,scope.row.id)"
                ></el-switch>
              </template>
            </el-table-column>

            <el-table-column label="是否置顶">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isTop"
                  @change="topChange(scope.row.isTop,scope.row.id)"
                ></el-switch>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="hiddenClick(scope.row.id)" type="text" size="small">查看</el-button>
                <el-button @click="handleClick(scope.row.id)" type="text" size="small">编辑</el-button>
                <el-button @click="removeBlog(scope.row.id)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 内容 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.pageIndex"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>

    <!-- 查看文章 -->
    <BlogComent></BlogComent>

    <!-- 查看弹出框 -->
    <el-dialog title="评论" :visible.sync="dialogTableVisible">
      <el-collapse accordion>
        <el-collapse-item
          v-for="item in blogCommentList"
          :key="item.id"
          :title="item.user.nickName "
        >
          <div v-html="item.content"></div>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BlogComent from "./blogComent";

export default {
  data() {
    return {
      dialogVisible: false,
      dialogTableVisible: false,
      form: {
        keyword: "",
        tags: [],
        dateFrom: "",
        dateTo: "",
        pageIndex: 1, //初始页
        pageSize: 10 //    每页的数据
      }
    };
  },
  created() {
    this.getBlogwhereData(this.form);
    this.getBlogTagData().then(() => {
      this.blogTags = this.blogTagList;
    });
  },
  methods: {
    ...mapActions("admin/blogPost", [
      "getBlogData",
      "deleteBlogPost",
      "getBlogwhereData",
      "OpenCular",
      "updatePostHidden",
      "updatePostShow"
    ]),
    ...mapActions("admin/blogTag", ["getBlogTagData"]),
    ...mapActions("admin/blogComment", ["getBlogCommentData"]),
    handleSizeChange: function(size) {
      this.form.pageSize = size; //每页显示多少条数据
      this.getBlogwhereData(this.form);
    },
    handleCurrentChange: function(pageIndex) {
      this.form.pageIndex = pageIndex; //多少页
      this.getBlogwhereData(this.form);
    },
    handleClick(id) {
      this.$router.push("/blogposteditor/" + id);
    },
    hiddenClick(id) {
      this.OpenCular({ id: id, status: true });
    },
    getBlogPost() {
      this.getBlogwhereData(this.form);
    },
    selectTag() {
      console.log(this.form.tags);
    },
    getComment(blogpostId) {
      this.getBlogCommentData({ BlogPostId: blogpostId }).then(i => {
        if (this.blogCommentList.length > 0) {
          this.dialogTableVisible = true;
        } else {
          this.$message({ message: "没有评论" });
        }
      });
    },
    removeBlog(id) {
      this.deleteBlogPost(id);
      this.getBlogwhereData(this.form);
    },
    showChange(status, id) {
      this.updatePostShow({ id, isTop: status ? 1 : 0 });
    },
    topChange(status, id) {
      this.updatePostHidden({ id, isHidden: status ? 1 : 0 });
    }
  },
  computed: {
    ...mapState("admin/blogPost", ["bloglist", "totalCount", "selectComment"]),
    ...mapState("admin/blogTag", ["blogTagList"]),
    ...mapState("admin/blogComment", ["blogCommentList"])
  },
  filters: {
    fromatStatus(val) {
      return val == 0 ? "否" : "是";
    },
    isNullContext(obj) {
      return obj == null && obj.lenght <= 0
        ? "暂无数据"
        : obj.length > 50
        ? `${obj.substring(0, 50)}...`
        : obj;
    }
  },
  components: {
    BlogComent
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
.comment-table {
  min-height: 500px;
  overflow: hidden;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.infinite {
  align-items: center;
  justify-content: center;
  height: 50px;
  background: #e8f3fe;
  color: #7dbcfc;
  display: flex;
  padding-left: 4px;
}
.blogtag {
  min-width: 60px;
  text-align: center;
  margin: 2px;
  cursor: pointer;
}
</style>