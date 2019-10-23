<template>
  <div class="userList">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="blogTag-table">
      <el-table style="width: 100%;" :data="blogUserList">
        <el-table-column label="昵称">
          <template slot-scope="scope">
            <el-popover placement="top-start" width="200" trigger="hover">
              <p>没想好</p>
              <el-button slot="reference">{{scope.row.nickName}}</el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="身份" prop="role.roleName"></el-table-column>
        <el-table-column label="邮箱">
          <template slot-scope="scope">
            <p>{{scope.row.email | fromatStatus}}</p>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="showdail(true,scope.row)" size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
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

    <!-- 查看 -->
    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" center>
      <el-form label-width="80px">
        <el-form-item label="昵称:">
          <el-input autocomplete="off" v-model="ruleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="身份:">
         <el-select v-model="ruleForm.roleName" placeholder="请选择活动区域">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="邮箱:">
          <el-input autocomplete="off" v-model="ruleForm.email"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
        Name: "", //模糊查询
        pageIndex: 1, //初始页
        pagesize: 10, //    每页的数据
        dateFrom: "",
        dateTo: ""
      },
      dialogFormVisible: false,
      dialogName: "编辑",
      ruleForm: {
        id: "",
        roleName: "",
        nickName: "",
        email: ""
      }
    };
  },
  created() {
    this.getBlogTagData(this.paging);
    this.getBlogCommentData();
    console.log("管理",this.roleList);
  },
  methods: {
    ...mapActions("admin/user", ["getBlogTagData"]),
        ...mapActions("admin/role", [ "getBlogCommentData"]),
    handleSizeChange: function() {},
    handleCurrentChange: function() {},
    updateBlack(obj) {
      this.dialogFormVisible = true;
    },
    showdail(status, data) {
      this.dialogFormVisible = true;
      this.dialogName = status ? "编辑" : "添加";
      data = data || {};
      Object.keys(this.ruleForm).forEach(s => {
        if (s == "roleName") {
          this.ruleForm[s] = data["role"].roleName;
        } else {
          this.ruleForm[s] = data[s] == null ? "" : data[s];
        }
      });
    },
    submitForm() {
      if (this.ruleForm.id.length > 0) {
      } else {
      }
      that.dialogVisible = false;
    }
  },
  computed: {
    ...mapState("admin/user", ["blogUserList", "totalCount"]),
    ...mapState("admin/role", ["roleList"])
  },
  filters: {
    fromatStatus(obj) {
      return obj == null ? "暂未添加信息" : obj;
    },
    genderStatus(obj) {
      return obj == 0 ? "男" : "女";
    }
  }
};
</script>


<style>
</style>