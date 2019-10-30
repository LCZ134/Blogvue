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
      <el-table style="width: 100%;" :data="settingList">
        <el-table-column label="key" prop="key"></el-table-column>
        <el-table-column label="value" prop="value"></el-table-column>
        <el-table-column label="extends" prop="extends"></el-table-column>
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
        <el-form-item label="key" prop="key">
          <el-input autocomplete="off" v-model="ruleForm.key"></el-input>
        </el-form-item>

        <el-form-item label="value" prop="value">
          <el-input type="textarea" v-model="ruleForm.value"></el-input>
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
        key: "",
        value: ""
      },
      rules: {
        value: [{ required: true, message: "不能为空", trigger: "blur" }],
        key: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      dialogVisible: false,
      dialogName: ""
    };
  },
  computed: {
    ...mapState("admin/setting", ["settingList", "totalCount"])
  },
  methods: {
    ...mapActions("admin/setting", [
      "getSettingList",
      "deleteSetting",
      "updataSetting",
      "insertSetting"
    ]),
    submitForm() {
      var that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.ruleForm.id.length > 0) {
            this.updataSetting(this.ruleForm).then(function() {
              that.dialogVisible = false;
              that.getSettingList(that.paging);
            });
          } else {
            this.insertSetting(this.ruleForm).then(function() {
              that.dialogVisible = false;
              that.getSettingList(that.paging);
            });
          }
          this.getSettingList(this.paging);
        }
      });
    },
    showdail(status, data) {
      this.dialogVisible = true;
      this.dialogName = status ? "编辑" : "添加";
      data = data || {};
      Object.keys(this.ruleForm).forEach(s => {
        this.ruleForm[s] = data[s] == null ? "" : data[s];
      });
    },
    handleSizeChange: function(size) {
      this.paging.pageSize = size; //每页下拉显示数据
      this.getSettingList(this.paging);
    },
    handleCurrentChange: function(currentPage) {
      this.paging.pageIndex = currentPage; //点击第几页
      this.getSettingList(this.paging);
    },
    getSetting() {
      this.getSettingList(this.paging);
    },
    removeeSetting(id) {
      var that = this;
      this.deleteSetting(id).then(function() {
        that.getSettingList(that.paging);
      });
      that.getSettingList(that.paging);
    }
  },
  created() {
    this.getSettingList(this.paging);
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