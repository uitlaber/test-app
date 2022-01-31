<template>
  <div class="header">
    <Logout/>
  </div>
  <router-view/>
</template>

<script>

import { defineComponent } from "vue"
import Logout from '@/components/Logout.vue'

export default defineComponent({
  name: 'App',
  components: {
    Logout
  }
})
</script>

<style lang="scss">
.header{
  text-align: right;
}
  body {
   background: #eee;
  }
</style>