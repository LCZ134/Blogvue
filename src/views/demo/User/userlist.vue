<template>
  <div class="userList">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" >查询</el-button>
      </el-form-item>
    </el-form>

    <div class="blogTag-table">

      <el-table style="width: 100%;" :data="blogUserList">

        <el-table-column label="昵称"  prop="nickName"></el-table-column>
        <el-table-column label="邮箱"  prop="email" >
          <template slot-scope="scope">
            <p>{{scope.row.gender | fromatStatus}}</p>
          </template>
        </el-table-column>
        

        <el-table-column label="性别">
          <template slot-scope="scope">
            <p>{{scope.row.gender | genderStatus}}</p>
          </template>
        </el-table-column>

        <el-table-column label="注册时间" >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createOn }}</span>
          </template>
        </el-table-column>
          
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
              <el-button  size="mini" >查看</el-button>
            <el-button @click="updateBlack(scope.row.id)" size="mini" type="danger">编辑</el-button>
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
      paging: {
        Name: "", //模糊查询
        pageIndex: 1, //初始页
        pagesize: 5 ,//    每页的数据
        dateFrom: "",
        dateTo: "",
      }
    };
  },
  created() {
    this.getBlogTagData(this.paging)
  },
  methods: {
    ...mapActions("admin/user",["getBlogTagData"]),
    handleSizeChange: function() {},
    handleCurrentChange:function(){},
    updateBlack(obj) {},
  },
  computed: {
    ...mapState("admin/user", ["blogUserList", "totalCount"])
  },
    filters: {
    fromatStatus(obj) {
      return obj == null ? '暂未添加信息' : obj;
		},
		genderStatus(obj){
			return obj == 0 ? "男" : "女";
		}
  }
};
</script>


<style>
</style>