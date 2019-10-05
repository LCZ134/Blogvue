<template>
  <div class="blogTag">

			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="名称">
					<el-input  placeholder="请输入内容"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" >查询</el-button>
				</el-form-item>
			</el-form>

    <div class="blogTag-table">
      <el-table style="width: 100%;" :data="blogTagList">
        <el-table-column label="标签编号" prop="blogPostId" width="180"></el-table-column>
			  <el-table-column label="标签名称" prop="blogPostId" width="180"></el-table-column>
        <el-table-column label="文章" prop="blogPostId" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="update(scope.row)" size="mini">编辑</el-button>
            <el-button  @click="delteBlogTag(scope.row.id)" size="mini" type="danger">删除</el-button>
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
        tiele: "", //模糊查询
        currentPage: 1, //初始页
        pagesize: 5 //    每页的数据
      },
      dialogVisible: false
    };
  },
  methods: {
    ...mapActions("admin/blogTag", [
      "getBlogTagData",
      "getBlogTagwhereData",
      "insertBlogTag",
      "delteBlogTag"
    ]),
    update(row) {
      this.dialogVisible = true;
      //显示编辑数据
      this.ruleForm.title = row.title;
      this.ruleForm.id = row.id;
    },
    handleSizeChange: function(size) {
      this.paging.pagesize = size; //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.paging.currentPage = currentPage; //点击第几页
    }
  },
  computed: {
    ...mapState("admin/blogTag", ["blogTagList", "totalCount"])
  },
  created() {
    this.getBlogTagwhereData(this.paging);
    console.log( "数据",this.paging)
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
  height: 500px;
  overflow: hidden;
}
.blogTag-page {
  position: ab;
  bottom: 0;
}


</style>