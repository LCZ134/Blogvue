<template>
  <div class="blogTag">

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input placeholder="请输入内容" v-model="paging.title"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getRoles">查询</el-button>
      </el-form-item>

      <el-form-item style="margin-right: 15px;float: right;">
        <el-button type="success" @click="showdail(false)">添加</el-button>
      </el-form-item>
    </el-form>

    <div class="blogTag-table">
      <el-table style="width: 100%;" :data="roleList">
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="创建用户" prop="user.nickName"></el-table-column>
        <el-table-column label="相关角色" prop="userCount"></el-table-column>
        <el-table-column label="角色描述" prop="roleRemark"></el-table-column>
        <el-table-column label="创建时间" prop="createOn"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="showdail(true,scope.row)" size="mini">编辑</el-button>
            <el-button @click="delectRoles(scope.row.id)" size="mini" type="danger">删除</el-button>
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
        <el-form-item label="角色名称" prop="roleName">
          <el-input autocomplete="off" v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色等级" prop="roleLevel">
          <el-select v-model="ruleForm.roleLevel" placeholder="请输入角色等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="角色描述" prop="roleRemark">
          <el-input type="textarea" v-model="ruleForm.roleRemark"></el-input>
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
        title:"",
        pageIndex: 1, //初始页
        pageSize: 10 //    每页的数据
      },
      ruleForm: {
        id: "",
        roleName: "",
        roleLevel: "",
        roleRemark: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        roleLevel: [
          { required: true, message: "请输入角色等级", trigger: "blur" }
        ],
        roleRemark: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },
      dialogVisible: false,
      dialogName: ""
    };
  },
  methods: {
    ...mapActions("admin/role", [
      "getBlogCommentData",
      "updataRole",
      "delectRole",
      "insertRole"
    ]),
    submitForm() {
      var that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.ruleForm.id.length > 0) {
            this.updataRole(this.ruleForm);
            that.dialogVisible = false;
          } else {
            this.insertRole(this.ruleForm).then(function() {
              that.dialogVisible = false;
              that.getBlogCommentData(that.paging);
            });
          }
          this.getBlogCommentData(this.paging);
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
      this.getBlogCommentData(this.paging);
    },
    handleCurrentChange: function(currentPage) {
      this.paging.pageIndex = currentPage; //点击第几页
      this.getBlogCommentData(this.paging);
    },
    getRoles() {
      this.getBlogCommentData(this.paging);
    },
    delectRoles(id) {
      var that = this;
      this.delectRole(id).then(function(){
         that.getBlogCommentData(that.paging);
      });
    }
  },
  computed: {
    ...mapState("admin/role", ["roleList", "totalCount"])
  },
  created() {
    this.getBlogCommentData(this.paging);
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