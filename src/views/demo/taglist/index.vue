<template>
  <div class="userlist">
    <el-row :gutter="24">
      <!-- <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>添加标签</span>
            </div>
            <div class="text item">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="ID" style="display:none;">
                  <el-input v-model="ruleForm.id"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </el-col> -->
      <el-col >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>标签管理</span>
          </div>
          <div class="text item">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-button type="primary">批量删除</el-button>
                <el-button type="success">成功按钮</el-button>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-input placeholder="请输入内容" v-model="tiele">
                  <el-button slot="append">搜索</el-button>
                </el-input>
              </el-col>
            </el-row>

            <el-table
              ref="multipleTable"
              :data="tableDatalist"
              tooltip-effect="dark"
              style="width: 100%;margin-top: 20px"
              border
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="id" label="id" ></el-table-column>
              <el-table-column prop="title" label="名称"></el-table-column>
              <el-table-column prop="citationCount" label="数量" ></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="update(scope.row)">编辑</el-button>
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="primary"
                    size="small"
                  >移除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDatalist.length"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      tableData: [],
      tiele: "", //模糊查询
      currentPage: 1, //初始页
      pagesize: 5 //    每页的数据
    };
  },
  methods: {
    ...mapActions(["getBolgTagData"]),
    deleteRow(index, rows) {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.id != null || this.ruleForm.id.length > 0) {
            //编辑
          } else {
            this.$api.post("/tag?title=" + this.ruleForm.tiele, null, r => {
              console.log(r);
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
        this.ruleForm.id = null;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    update(row) {
      this.ruleForm.title = row.title;
      this.ruleForm.citationCount = row.citationCount;
      this.ruleForm.id = row.id;
    },
    handleSizeChange: function(size) {
      this.pagesize = size; //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage; //点击第几页
    }
  },
  computed: {
    ...mapState(["blogTagList"]),
    tableDatalist: function() {
      return this.tableData.filter(s => {
        return s.title.match(this.tiele);
      });
    }
  },
  created() {
    this.$api.get("/tag", null, r => {
      this.tableData = r;
    });
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
</style>