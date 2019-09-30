
<template>
  <div class="progress">
    <div class="progress_bar">
      <div class="progress_bar_outer" :style="{height:strokeWith+'px'}">
        <div class="progress_bar_inner" :style="{barStyle}"></div>
      </div>
    </div>
    <div class="progress_text" :style="{fontSize:progressTextSize+'px'}">90%</div>
  </div>
</template>

<script>
export default {
  props: {
    strokeWith: {
      type: Number,
      default: 6
    },
    percentage: {
      type: Number,
      required: true,
      default: 0,
      validator: val => val >= 0 && val <= 100
    },
    status: {
      type: String
    }
  },

  computed: {
    progressTextSize() {
      return 12 + this.strokeWith * 0.4;
    },
    stroke() {
      let color;
      switch (this.status) {
        case "success":
          color = "";
          break;
        case "exeption":
          color = "";
          break;
        default:
          color = "";
      }
      return color;
    },
    barStyle(){
      return{
        width:this.percentage+'%',
        backgroundColor:this.stroke
      }
    }
  }
};
</script>

<style>
.progress_bar {
  padding-right: 50px;
  margin-right: -50px;
  box-sizing: border-box;
  /* width: calc(100%); */
  width: 100%;
  display: inline-block;
}
.progress_bar_outer {
  border-radius: 100px;
  background-color: #ebeef5;
}

.progress_bar_inner {
  border-radius: 100px;
  background-color: red;
}

.progress_text {
  display: inline-block;
  margin-right: 10px;
  color: #606266;
}
</style>