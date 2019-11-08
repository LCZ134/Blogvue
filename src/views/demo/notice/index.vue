<template>
  <div class="blogTag">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input placeholder="请输入内容" v-model="paging.keyword"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getSetting">查询</el-button>
      </el-form-item>

      <el-form-item style="margin-right: 15px;float: right;">
        <el-button type="success" @click="showdail(false)">添加</el-button>
      </el-form-item>
    </el-form>

    <div class="blogTag-table">
      <el-table style="width: 100%;" :data="noticeList">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="用户" prop="userName"></el-table-column>
        <el-table-column label="内容" prop="context"></el-table-column>
        <el-table-column label="创建时间" prop="createOn"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="showdail(true,scope.row)" size="mini">编辑</el-button>
            <el-button @click="removeeSetting(scope.row.id)" size="mini" type="danger">删除</el-button>
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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="编号id" v-show="false">
          <el-input autocomplete="off" v-model="ruleForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input autocomplete="off" v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="value" prop="context">
          <el-input type="textarea" v-model="ruleForm.context" :rows="6"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" v-show="dialogName!='查看'" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      paging: {
        keyword: "",
        pageIndex: 1, //初始页
        pageSize: 10 //    每页的数据
      },
      ruleForm: {
        id: "",
        title: "",
        context: ""
      },
      rules: {
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        context: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      dialogVisible: false,
      dialogName: ""
    };
  },
  computed: {
    ...mapState("admin/notice", ["noticeList", "totalCount"])
  },
  methods: {
    ...mapActions("admin/notice", [
      "getNoticeList",
      "insertNotice",
      "deleteNotice",
      "updataNotice"
    ]),
    submitForm() {
      var that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.ruleForm.id.length > 0) {
            this.updataNotice(this.ruleForm).then(function() {
              that.dialogVisible = false;
              that.getNoticeList(that.paging);
            });
          } else {
            this.insertNotice(this.ruleForm).then(function() {
              that.dialogVisible = false;
              that.getNoticeList(that.paging);
            });
          }
          this.getNoticeList(this.paging);
        }
      });
    },
    showdail(status, data) {
      this.$nextTick(() => {
        if (this.$refs.ruleForm !== undefined) {
          this.$refs.ruleForm.resetFields();
        }
        this.dialogVisible = true;
        this.dialogName = status ? "编辑" : "添加";
        data = data || {};
        Object.keys(this.ruleForm).forEach(s => {
          this.ruleForm[s] = data[s] == null ? "" : data[s];
        });
      });
    },
    handleSizeChange: function(size) {
      this.paging.pageSize = size; //每页下拉显示数据
      this.getNoticeList(this.paging);
    },
    handleCurrentChange: function(currentPage) {
      this.paging.pageIndex = currentPage; //点击第几页
      this.getNoticeList(this.paging);
    },
    getSetting() {
      this.getNoticeList(this.paging);
    },
    removeeSetting(id) {
      var that = this;
      this.deleteNotice(id).then(function() {
        that.getNoticeList(that.paging);
      });
      that.getNoticeList(that.paging);
    }
  },
  created() {
    this.getNoticeList(this.paging);
  }
};
</script>

<style>
</style>