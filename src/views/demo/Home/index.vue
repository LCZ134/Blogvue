<template>
  <div class="home">
    <el-row :gutter="12">
      <!-- <el-col :span="6" v-for="item in 4" :key="item">
        <el-card shadow="always">
          <div class="alway">
            <div class="alway-title">
              <p>今日阅读文章</p>
              <p>45</p>
            </div>
            <div class="alway-icon">
              <i class="el-icon-edit"></i>
            </div>
          </div>
        </el-card>
      </el-col>-->

      <el-col :span="6">
        <el-card shadow="always">
          <div class="alway">
            <div class="alway-title">
              <p>历史</p>
              <p>{{reportToday.viewWeek}}</p>
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
              <p>文章</p>
              <p>{{reportToday.publishWeek}}</p>
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
              <p>本周点赞</p>
              <p>{{reportToday.thumbUpWeek}}</p>
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
              <p>{{reportToday.replyWeek}}</p>
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
              <span>卡片名称</span>
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
              <span>用户</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div id="doughnut"></div>
          </el-card>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>用户</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">{{userinfo.nickName}}</div>
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
            <div class="text item">{{userinfo.nickName}}</div>
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
    ...mapState("admin/report", ["reportToday"]),
    ...mapState("admin/blogTag", ["blogTagList"])
  },
  created() {
     this.getReportToday();
     this.getBlogTagData().then(i=>{
       console.log(...this.blogTagList)
     })
  },
  mounted() {
    this.$chart.Customized("chart1");
    this.$chart.Doughnut("doughnut", this.blogTagList);
  },
  methods: {
    ...mapActions("admin/report", ["getReportToday"]),
    ...mapActions("admin/blogTag", ["getBlogTagData"])
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
#doughnut {
  width: 400px;
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
}
.alway .alway-icon {
  text-align: right;
  flex: 1;
  font-size: 30px;
}
</style>