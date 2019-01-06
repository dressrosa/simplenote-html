<template>
  <div>
    <div v-if="this.$route.name=='Login'"></div>
    <div v-else>
      <common_header/>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Head from '@/components/Header'
export default {
  name: 'App',
  components: {
    common_header: Head
  }
}
</script>
