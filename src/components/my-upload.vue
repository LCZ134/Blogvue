// 单张图片上传（组件）
<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="$store.state.imgUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="BeforeUploadImg" :src="BeforeUploadImg" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script >
import { mapState } from "vuex";

export default {};
</script>
