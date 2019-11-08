<template>
  <div class="userList">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="时间">
        <el-date-picker
          type="date"
          placeholder="开始日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="paging.dateFrom"
        ></el-date-picker>
        <span>-</span>
        <el-date-picker
          type="date"
          placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          v-model="paging.dateTo"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="selects">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="blogTag-table">
      <el-table style="width: 100%;" :data="eventList">
        <!-- <el-table-column label="昵称">
          <template slot-scope="scope">
            <el-popover placement="top-start" width="200" trigger="hover">
              <el-button slot="reference">{{scope.row.user.nickName}}</el-button>
            </el-popover>
          </template>
        </el-table-column>-->
        <el-table-column label="用户" prop="user.nickName"></el-table-column>
        <el-table-column label="邮箱" prop="user.email"></el-table-column>
        <el-table-column label="请求" prop="requestUrl"></el-table-column>
        <el-table-column label="IP" prop="ipAddress"></el-table-column>
        <el-table-column label="时间" prop="createOn"></el-table-column>
        <el-table-column label="浏览器：" prop="referrerUrl"></el-table-column>
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
        dateFrom: "",
        dateTo: "",
        pageIndex: 1, //初始页
        pageSize: 10, //    每页的数据
        isALL: true
      }
    };
  },
  created() {
    this.getEventList(this.paging);
  },
  methods: {
    ...mapActions("admin/event", ["getEventList"]),
    handleSizeChange: function(size) {
      this.paging.pageSize = size; //每页显示多少条数据
      this.getEventList(this.paging);
    },
    handleCurrentChange: function(pageIndex) {
      this.paging.pageIndex = pageIndex; //多少页
      this.getEventList(this.paging);
    },
    selects() {
      this.getEventList(this.paging);
    }
  },
  computed: {
    ...mapState("admin/event", ["eventList", "totalCount"])
  }
};
</script>


<style>
</style>