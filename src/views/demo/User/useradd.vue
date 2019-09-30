<template>
  <div class="useradd">
    <h1>添加</h1>
  </div>
</template>
<script >
import Myprogress from '@/components/progress.vue'

import {mapState,mapMutations} from 'vuex'

export default {
  computed:{
    ...mapState(['userinfo'])
  },
  data(){
    return{

    }
  },
  components:{Myprogress}
}
</script>