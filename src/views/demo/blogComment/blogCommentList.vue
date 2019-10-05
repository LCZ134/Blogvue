<template>
  <div class="comment">

			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="用户">
					<el-input  placeholder="请输入内容"></el-input>
				</el-form-item>

				<el-form-item label="时间">
					<el-date-picker type="date" placeholder="开始日期" v-model="form.dateFrom"></el-date-picker>
					<span>-</span>
					<el-date-picker type="date" placeholder="结束日期" v-model="form.dateTo"></el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="getBlogComment()">查询</el-button>
				</el-form-item>
			</el-form>

    <div class="comment-table">
      <el-table style="width: 100%;" :data="blogCommentList">
        <el-table-column label="日期" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createOn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章编号" prop="blogPostId" width="180"></el-table-column>
				<el-table-column
					label="姓名"
					width="180">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="top">
							<div class="comment-pop">
								<p><img :src="scope.row.user.avatarUrl"></p>
								<p>性别: {{ scope.row.user.gender | genderStatus}}</p>
							</div>
							<div slot="reference" class="name-wrapper">
								<el-tag class="nickname" size="medium">{{ scope.row.user.nickName }}</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>

        <el-table-column label="评论" width="400">
          <template slot-scope="scope">
            <p v-html="scope.row.content"></p>
          </template>
        </el-table-column>
        <el-table-column label="是否显示">
          <template slot-scope="scope">
            <p>{{scope.row.isHidden | fromatStatus}}</p>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="HideBlogComment(scope.row.id)" size="mini">显示</el-button>
            <el-button @click="ShowBlogComment(scope.row.id)" size="mini">隐藏</el-button>
            <el-button @click="deleteBlogComment(scope.row.id)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.pageIndex"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="form.pageSize"
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
      form: {
        UserId: "",
        BlogPostId: "",
        dateFrom: "",
        dateTo: "",
        pageIndex: 1, //初始页
        pageSize: 5 //    每页的数据
      }
    };
  },
  methods: {
    ...mapActions("admin/blogComment", ["getBlogCommentData","HideBlogComment","ShowBlogComment","deleteBlogComment"]),
		//修改
		
    //删除
    deleteBlogPost(id) {},
    //搜索
    handleSizeChange(size) {
      this.form.pageSize = size;
      this.getBlogCommentData(this.form);
    },
    handleCurrentChange(index) {
      this.form.pageIndex = index;
      this.getBlogCommentData(this.form);
		},
		getBlogComment(){

		}
  },
  computed: {
    ...mapState("admin/blogComment", ["blogCommentList", "totalCount"])
  },
  created() {
		this.getBlogCommentData(this.form);
  },
  filters: {
    fromatStatus(val) {
      return val == 0 ? "否" : "是";
		},
		genderStatus(val){
			return val == 0 ? "男" : "女";
		}
  }
};
</script>

<style>
.comment {
  position: relative;
}
.comment-table {
  height: 500px;
  overflow: hidden;
}
.comment-page {
  position: ab;
  bottom: 0;
}
.nickname{
	cursor: pointer;
}
.comment-pop{
	display: flex;
}
</style>
