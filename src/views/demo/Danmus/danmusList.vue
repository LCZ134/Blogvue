<template>
  <div class="danmus">
    <!-- 头部 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="内容">
        <el-input v-model="form.content" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getDanmu()">查询</el-button>
      </el-form-item>

      <el-form-item style="margin-right: 15px;float: right;">
        <el-button type="success" @click="dialogVisible=true">添加</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <div class="danmus-table">
      <el-table style="width: 100%;" :data="danmsList">
        <el-table-column label="时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createOn | IsNullOr }}</span>
          </template>
        </el-table-column>

        <el-table-column label="评论">
          <template slot-scope="scope">
            <p
              :style="{color:scope.row.color,fontSize:scope.row.fontesize+'px'}"
              v-html="scope.row.content"
            ></p>
          </template>
        </el-table-column>

        <el-table-column label="颜色">
          <template slot-scope="scope">
            <p v-html="scope.row.color"></p>
          </template>
        </el-table-column>

        <el-table-column label="类型">
          <template slot-scope="scope">
            <p v-html="scope.row.type"></p>
          </template>
        </el-table-column>

        <el-table-column label="大小">
          <template slot-scope="scope">
            <p>{{scope.row.fontSize}}</p>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteDanmus(scope.row.id)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.pageIndex"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="dialogVisible">
      <el-form :model="page" :rules="rules" ref="page" label-width="80px">
        <p
          class="danmu-text"
          :style="{color:page.color,fontSize:page.fontesize+'px'}"
        >{{page.content |IsNullOr}}</p>

        <el-form-item label="颜色选择">
          <colorPicker v-model="page.color" />
        </el-form-item>

        <el-form-item label="字体大小">
          <el-input-number v-model="page.fontesize" controls-position="right" :min="12"></el-input-number>
        </el-form-item>

        <el-form-item label="弹幕类型">
          <el-input v-model="page.type"></el-input>
        </el-form-item>

        <el-form-item label="弹幕发言">
          <el-input type="textarea" v-model="page.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>重置</el-button>
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        UserId: "",
        content: "",
        pageIndex: 1, //初始页
        pageSize: 10 // 每页的数据,
      },
      dialogVisible: false,
      page: {
        content: "",
        color: "#ff0000",
        fontesize: 20,
        type: "scroll"
      },
      //数据验证
      rules: {
        content: [
          { required: true, message: "请填写弹幕评论", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("admin/danmu", ["totalCount", "danmsList"])
  },
  methods: {
    ...mapActions("admin/danmu", ["gitdanmlist", "insertDanmu", "deleteDanmu"]),
    handleSizeChange: function(size) {
      this.form.pageSize = size; //每页显示多少条数据
      this.gitdanmlist(this.form);
    },
    handleCurrentChange: function(pageIndex) {
      this.form.pageIndex = pageIndex; //多少页
      this.gitdanmlist(this.form);
    },
    getDanmu() {
      this.gitdanmlist(this.form);
    },
    submitForm() {
      var that = this;
      this.insertDanmu(this.page).then(function() {
        that.dialogVisible = false;
        that.gitdanmlist(that.form);
      });
    },
    deleteDanmus(id) {
      var that = this;
      this.deleteDanmu(id).then(function() {
        that.gitdanmlist(that.form);
      });
    }
  },
  created() {
    this.gitdanmlist(this.form);
  },
  watch: {
    dialogVisible(obj) {
      if (obj) {
        this.page = {
          content: "",
          color: "#ff0000",
          fontesize: 20
        };
      }
    }
  },
  filters: {
    IsNullOr(res) {
      return res != null && res.length > 0 ? res : "暂无数据";
    }
  }
};
</script>

<style >
.danmus {
  position: relative;
}
.danmus-table {
  min-height: 500px;
  overflow: hidden;
}
.danmu-text {
  padding: 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #f0f7ff;
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
}
.m-colorPicker .box {
  z-index: 99;
}
</style>