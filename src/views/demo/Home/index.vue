<template>
  <div class="home">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
          <div class="alway">
            <div class="alway-title">
              <p>上周浏览</p>
              <p>{{reportToday.viewCount}}</p>
            </div>
            <div class="alway-icon">
              <i class="el-icon-view"></i>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="always">
          <div class="alway">
            <div class="alway-title">
              <p>上周发布文章</p>
              <p>{{reportToday.publishCount}}</p>
            </div>
            <div class="alway-icon">
              <i class="el-icon-document-copy"></i>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="always">
          <div class="alway">
            <div class="alway-title">
              <p>上周点赞</p>
              <p>{{reportToday.thumbUpCount}}</p>
            </div>
            <div class="alway-icon">
              <i class="el-icon-discount"></i>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="always">
          <div class="alway">
            <div class="alway-title">
              <p>本周评论数</p>
              <p>{{reportToday.replyCount}}</p>
            </div>
            <div class="alway-icon">
              <i class="el-icon-s-comment"></i>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>用户数据</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div id="chart1"></div>
          </el-card>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>文章</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div id="chart2"></div>
          </el-card>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>登录日志</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>用户</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div id="chart4"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template> 
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("admin/user", ["userinfo"]),
    ...mapState("admin/report", ["reportToday", "reportMouth"]),
    ...mapState("admin/blogTag", ["blogTagList"]),
    ...mapState("admin/role", ["roleList"])
  },
  created() {
    this.getReportToday();
    var that = this;

    this.getBlogCommentData().then(function() {
       that.$chart.tableChart("chart1",that.roleList);
    });

    this.getBlogTagData().then(function() {
      that.$chart.postChart("chart2", that.blogTagList);
    });

    this.getReportMouth().then(function() {
      that.$chart.monthChart("chart4", that.reportMouth);
    });
  },
  methods: {
    ...mapActions("admin/report", ["getReportToday", "getReportMouth"]),
    ...mapActions("admin/blogTag", ["getBlogTagData"]),
    ...mapActions("admin/role", ["getBlogCommentData"])
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
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
/* 图表 */
#chart1,
#chart2 {
  width: 400px;
  height: 400px;
  margin: 0 auto;
}
#chart4 {
  width: 100%;
  min-width: 600px;
  height: 400px;
  margin: 0 auto;
}
/* 头 */
.alway {
  display: flex;
}
.alway .alway-title {
  flex: 1;
}
.alway .alway-title p {
  margin: 2px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 2px #716969;
}
.alway .alway-icon {
  text-align: right;
  flex: 1;
  font-size: 30px;
}
</style>